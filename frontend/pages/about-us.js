import React from "react";
import Layout from "../components/Layout";
import { initializeApollo } from "../lib/apolloClient";
import { GET_CATEGORIES } from "../components/Navbar";

const About = () => {
  return (
    <Layout>
      <div>
        Regular About us page, no queries executed here execept for NavBar.
      </div>
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

export default About;
