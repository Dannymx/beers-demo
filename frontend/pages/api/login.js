import fetcher from "../../lib/fetchJson";
import withSession from "../../lib/session";

const handler = async (req, res) => {
  const { token, provider } = await req.body;
  const url = `${process.env.NEXT_PUBLIC_API_BASEURL}/auth/${provider}/callback?access_token=${token}`;

  try {
    // get the user from the strapi api
    const user = await fetcher(url);

    // set the user to the session as logged in
    req.session.set("user", { isLoggedIn: true, ...user });

    // save the session
    await req.session.save();

    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
};

export default withSession(handler);
