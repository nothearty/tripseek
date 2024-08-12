import { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { User } from "./database/entities/User.entity";
import { Session } from "hono-sessions";

const userRepo = User.getRepository();
type Env = {
  Variables: {
    session: Session;
  };
};

// In a real scenario, this would be replaced with actual session management logic
const mockSessionStore = new Map<string, { userId: number }>();

// Simulates storing a session with userId
const simulateLogin = (sessionId: string, userId: number) => {
  mockSessionStore.set(sessionId, { userId });
};

const sessionManager = (c: Context) => ({
  async getSessionItem(key: string) {
    return getCookie(c, key);
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    } as const;
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["session_id", "user"].forEach((key) => {
      deleteCookie(c, key);
    });
  },
});

const getUserProfile = async (sessionId: string) => {
  const session = mockSessionStore.get(sessionId);
  if (session) {
    const user = await User.findOne({ where: { id: session.userId } });
    if (user) {
      return user;
    }
  }
  throw new Error("User not found");
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const manager = sessionManager(c);
    const sessionId = await manager.getSessionItem("session_id");

    if (!sessionId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const user = await getUserProfile(sessionId);
    const session = c.get("session");
    session.set("user", user);
    // Proceed to the next middleware or route handler
    await next();
    return; // Ensure there is a return value after next()
  } catch (e) {
    console.error(e);
    return c.json({ error: "Unauthorized" }, 401);
  }
});
