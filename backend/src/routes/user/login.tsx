import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { CookieStore, Session, sessionMiddleware } from "hono-sessions";
import { generateState, OAuth2Client } from "oslo/oauth2";

type Variables = {
  session: Session;
};

const loginRoute = new Hono<{ Variables: Variables }>();

const store = new CookieStore();

const googleClientId = Bun.env.GOOGLE_CLIENT_ID || "";
const googleOAuth2Client = new OAuth2Client(
  googleClientId,
  "https://accounts.google.com/o/oauth2/v2/auth",
  "https://oauth2.googleapis.com/token",
  {
    redirectURI: "http://localhost:3000/login/google/call`back",
  }
);

// @ts-nocheck
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

loginRoute
  .get("/login/google", async (c) => {
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

    return c.redirect((await url).toString());
  })
  .get("/login/google/callback", async (c) => {
    const { code, state } = c.req.query();

    console.log("entrato");
    const sessionState = getCookie(c, "state");

    if (state !== sessionState) {
      return c.redirect("/login/google");
    }

    if (!code) {
      return c.redirect("/login/google/error");
    }
    console.log("entrato2");

    console.log(`code: ${code}`);

    const { access_token } = await googleOAuth2Client.validateAuthorizationCode(
      code,
      {
        credentials: Bun.env.GOOGLE_CLIENT_SECRET,
        authenticateWith: "request_body",
      }
    );

    console.log("entrato3");

    const user = await getGoogleUser(access_token);

    console.log("entrato4");

    const session = c.get("session");
    session.set("user", user);
    return c.redirect("/");
  })
  .get("/logout", async (c) => {
    c.get("session").deleteSession();
    return c.redirect("/");
  })
  .get("/", (c) => {
    const session = c.get("session");
    const user = session.get("user");

    return c.html(
      <html>
        <body>
          {user ? (
            <>
              <div>User: {JSON.stringify(user)}</div>
              <a href={"/logout"}>Logout</a>
            </>
          ) : (
            <div>
              <a href={"/login/google"}>Google Login</a>
            </div>
          )}
        </body>
      </html>
    );
  });

export default loginRoute;
