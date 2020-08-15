import withSession from "../../lib/session";

const handler = async (req, res) => {
  const user = req.session.get("user");

  if (user) {
    res.json({
      ...user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
};

export default withSession(handler);
