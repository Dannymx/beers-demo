import React from "react";
import Link from "next/link";
import useUser from "../lib/useUser";
import fetcher from "../lib/fetchJson";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      name
      id
      slug
    }
  }
`;

const Navbar = () => {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const { user, mutateUser } = useUser();
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    await mutateUser(fetcher("/api/logout"));
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {!loading ? (
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="block">
                <div className="flex items-baseline">
                  <Link href="/[[...index]]" as={`/`} key={0}>
                    <a className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                      Home
                    </a>
                  </Link>
                  {data.categories.map((cat, index) => (
                    <Link
                      href="/[[...index]]"
                      as={`/${cat.slug}`}
                      key={index + 1}
                    >
                      <a className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                        {cat.name}
                      </a>
                    </Link>
                  ))}
                  <Link href="/about-us">
                    <a className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                      About Us
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              {!user?.isLoggedIn ? (
                <Link href="/login">
                  <a className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                    Login
                  </a>
                </Link>
              ) : (
                <div>
                  <Link href="/dashboard">
                    <a className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                      Dashboard
                    </a>
                  </Link>
                  <a
                    href="/api/logout"
                    onClick={(e) => handleLogout(e)}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <h1 className="block text-gray-300 h-16 self-auto">Loading...</h1>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
