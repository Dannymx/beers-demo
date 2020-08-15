import React, { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import { initializeApollo } from "../lib/apolloClient";
import { GET_CATEGORIES } from "../components/Navbar";
import MainLayout from "../components/Layout";
import ImageCard from "../components/ImageCard";
import useUser, { withAuthToken } from "../lib/useUser";
import { gql, useLazyQuery } from "@apollo/client";

const Home = () => {
  const router = useRouter();

  const { user } = useUser({
    redirectTo: "/login",
  });

  const [getBeers, result] = useLazyQuery(GET_BEERS, {
    variables: getVariables(router.query.index),
    ...withAuthToken(user),
  });

  useEffect(() => {
    if (user) {
      getBeers();
    }
  }, [user]);

  const [activeBeer, setActiveBeer] = useState(null);

  return (
    <MainLayout>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
        {renderList(result, activeBeer, setActiveBeer)}
      </div>
    </MainLayout>
  );
};

// Render a list of beers or loading/error otherwise
const renderList = (result, activeBeer, setActiveBeer) => {
  if (result.loading) return <h1>Loading...</h1>;

  if (result.data) {
    return result.data.beers.map((beer, index) => (
      <ImageCard
        key={beer.id}
        beer_index={beer.id}
        beer={beer}
        activeBeer={activeBeer}
        setActiveBeer={setActiveBeer}
      ></ImageCard>
    ));
  }

  if (result.error) {
    return result.error.graphQLErrors.map(({ message }, i) => (
      <span key={i}>{message}</span>
    ));
  }
};

const GET_BEERS = gql`
  query getBeers($where: JSON) {
    beers(where: $where) {
      id
      name
      created_at
      image {
        url
      }
      category {
        name
        slug
      }
    }
  }
`;

export const getStaticProps = async (ctx) => {
  const apolloClient = initializeApollo();

  // Only Pre-fetch my navbar categories to make them SSG
  await apolloClient.query({ query: GET_CATEGORIES });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: ["/", "/ale", "/lager"],
    fallback: true,
  };
};

const getVariables = (index) => {
  return index !== undefined && index.length
    ? {
        where: {
          category: {
            slug: index[0],
          },
        },
      }
    : {};
};

export default Home;
