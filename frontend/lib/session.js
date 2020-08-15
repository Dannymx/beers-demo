import { withIronSession } from "next-iron-session";

const withSession = (handler) => {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "demo-strapi",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
};

export default withSession;
