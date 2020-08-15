import React, { useEffect } from "react";
import useSWR from "swr";
import Router from "next/router";
import fetcher from "./fetchJson";

const useUser = ({ redirectTo = false, redirectIfFound = false } = {}) => {
  const { data: user, mutate: mutateUser } = useSWR("/api/user", fetcher);

  useEffect(() => {
    // if not redirection is set and not user found, just do nothing.
    if (!redirectTo || !user) return;

    // Redirect only if:
    // redirect is set and no user found
    // or we have an user and redirect if found
    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectTo, redirectIfFound]);

  return { user, mutateUser };
};

export const withAuthToken = (user) => {
  return {
    context: {
      headers: {
        Authorization: user?.jwt ? `Bearer ${user.jwt}` : "",
      },
    },
  };
};

export default useUser;
