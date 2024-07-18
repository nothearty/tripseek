import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { CookieStore, sessionMiddleware } from "hono-sessions";
import { generateState, OAuth2Client } from "oslo/oauth2";

type Variables = {
  message: string;
};

const loginRoute = new Hono<{ Variables: Variables }>();

const store = new CookieStore();

const googleClientId = Bun.env.GOOGLE_CLIENT_ID || "";
const googleOAuth2Client = new OAuth2Client(
  googleClientId,
  "https://accounts.google.com/o/oauth2/v2/auth",
  "https://oauth2.googleapis.com/token",
  {
    redirectURI: "http://localhost:3000/login/google/callback",
  }
);

loginRoute.use(
  "*",
  sessionMiddleware({
    store,
    encryptionKey: Bun.env.SESSION_ENCRYPTION_KEY,
    expireAfterSeconds: 900,
    cookieOptions: {
      path: "/",
      httpOnly: true,
    },
  })
);

loginRoute.get("/", (c) => {
  const message = c.get("message");
  return c.text(`The message is "${message}"`);
});
