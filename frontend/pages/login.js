import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { GET_CATEGORIES } from "../components/Navbar";
import { initializeApollo } from "../lib/apolloClient";
import fetcher from "../lib/fetchJson";
import withSession from "../lib/session";

const Login = (props) => {
  const router = useRouter();

  return (
    <Layout>
      <div className="flex justify-center">
        <form className="w-full lg:w-1/3 border-gray-200 border-1 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl text-center">Bienvenido</h2>
          <div className="social-login-button my-3">
            <a
              href="http://localhost:1337/connect/facebook"
              className="block w-full text-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Ingresar con Facebook
            </a>
          </div>
          <div className="social-login-button my-3">
            <a
              href="http://localhost:1337/connect/google"
              className="block w-full text-center bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
            >
              Ingresar con Google
            </a>
          </div>
          {props.errors ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <ul>
              {
                props.errors.messages.map((error, index) => {
                  console.log(error);
                  return error.message ? <li key={index}>{error.message}</li> : <li key={index}>{error.id}</li>
                })
              }
              </ul>
              {/* <span className="block sm:inline">{props.errors}</span> */}
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSession(async function (ctx) {
  let errors = null;

  // Check if there's a user logged in and redirect
  const user = ctx.req.session.get("user");

  if (user?.isLoggedIn) {
    ctx.res.setHeader("location", "/");
    ctx.res.statusCode = 302;
    ctx.res.end();
    return {
      props: {},
    };
  }

  // For now let's do a quick check to know which provider we're working with
  const provider = ctx.query.id_token ? 'google' : 'facebook';
  const token = ctx.query.access_token;

  // Check if we have an access_token/id_token
  if (token) {
    try {
      const user = await fetcher(
        `${process.env.NEXT_PUBLIC_HOST_BASEURL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, provider }),
        }
      );

      if (user.jwt) {
        // set the user to the session as logged in
        ctx.req.session.set("user", { isLoggedIn: true, ...user });

        // save the session
        await ctx.req.session.save();

        ctx.res.setHeader("location", "/");
        ctx.res.statusCode = 302;
        ctx.res.end();
        return {
          props: {},
        };
      }
    } catch (error) {
      errors = error.data.message[0];
    }
  }

  // Finally just load other stuff
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_CATEGORIES,
  });

  return {
    props: {
      errors,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
});

export default Login;
