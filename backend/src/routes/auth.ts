import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { CookieStore, Session, sessionMiddleware } from "hono-sessions";
import { generateState, OAuth2Client } from "oslo/oauth2";
import { User } from "../sharedTypes";
import { User as UserEntity } from "src/database/entities/User.entity";
import dataSource from "src/database/database";

type Variables = {
  session: Session;
};

const store = new CookieStore();
const userRepository = dataSource.getRepository(UserEntity);

const googleClientId = Bun.env.GOOGLE_CLIENT_ID || "";
const googleOAuth2Client = new OAuth2Client(
  googleClientId,
  "https://accounts.google.com/o/oauth2/v2/auth",
  "https://oauth2.googleapis.com/token",
  {
    redirectURI: "http://localhost:3000/api/auth/google/callback", // Punto al tuo backend
  }
);

const getGoogleUser = async (accessToken: string) => {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.json();
};

export const authMiddleware = sessionMiddleware({
  store,
  encryptionKey: Bun.env.SESSION_ENCRYPTION_KEY,
  expireAfterSeconds: 1800,
  cookieOptions: {
    path: "/",
    httpOnly: true,
  },
});

const loginRoute = new Hono<{ Variables: Variables }>()
  .use("*", authMiddleware)
  .get("/google", async (c) => {
    const state = generateState();

    const url = googleOAuth2Client.createAuthorizationURL({
      state,
      scopes: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    });

    setCookie(c, "state", state, {
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 900,
    });

    return c.json({ url: (await url).toString() });
  })
  .get("/google/callback", async (c) => {
    const { code, state } = c.req.query();
    const sessionState = getCookie(c, "state");

    if (state !== sessionState) {
      return c.json({ error: "Invalid state" }, 400);
    }

    if (!code) {
      return c.json({ error: "Missing code" }, 400);
    }

    try {
      const { access_token } =
        await googleOAuth2Client.validateAuthorizationCode(code, {
          credentials: Bun.env.GOOGLE_CLIENT_SECRET,
          authenticateWith: "request_body",
        });

      const googleUser = await getGoogleUser(access_token);
      let user;

      const existingUser = await userRepository.findOne({
        where: { google_id: googleUser.id },
      });

      if (existingUser) {
        user = existingUser; // Assign existing user
      } else {
        user = await userRepository.save({
          google_id: googleUser.id,
          name: googleUser.name,
          email: googleUser.email,
          picture: googleUser.picture,
        }); // Save new user
      }

      const session = c.get("session");
      session.set("user", user);

      // Redirect to frontend after successful login
      const redirectUrl = `http://localhost:5173/`
      return c.redirect(redirectUrl);
    } catch (error) {
      return c.json({ error: "Authentication failed" }, 500);
    }
  })
  .get("/logout", async (c) => {
    c.get("session").deleteSession();
    return c.json({ message: "Logged out" });
  })
  .get("/session", async (c) => {
    const session = c.get("session");

    // Cast `user` to the `User` type
    const user = session.get("user") as User | undefined;

    if (!user) {
      return c.json({ error: "Not logged in" }, 401);
    }

    return c.json({ user }, 200);
  })
  .get("/user/:googleId", async (c) => {
    const googleId = c.req.param("googleId");
    let user;

    try {
      user = await userRepository.findOne({
        where: { google_id: googleId },
      });
      return c.json({ user: user });
    } catch (error) {
      console.error("Error fetching user by Google ID:", error);
      return c.json({ message: "Internal server error", error: error }, 500);
    }
  });

export default loginRoute;
