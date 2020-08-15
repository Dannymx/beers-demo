import withSession from "../../lib/session";

const handler = async (req, res) => {
  req.session.destroy();
  res.json({ isLoggedIn: false });
};

export default withSession(handler);
