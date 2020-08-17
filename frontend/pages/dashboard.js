import React from "react";
import Layout from "../components/Layout";
import { GET_CATEGORIES } from "../components/Navbar";
import { initializeApollo } from "../lib/apolloClient";
import useUser from "../lib/useUser";

const Dashboard = () => {
  const { user } = useUser({
    redirectTo: "/login",
  });

  return (
    <Layout>
      {user?.isLoggedIn && (
        <div>
          <div>Here you should see your user dashboard if you're logged in</div>
          <pre className="overflow-hidden">{JSON.stringify(user, null, 4)}</pre>
        </div>
      )}
    </Layout>
  );
};

export async function getStaticProps(ctx) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_CATEGORIES,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 100,
  };
}

export default Dashboard;
