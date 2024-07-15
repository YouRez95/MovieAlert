import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import SearchBarAuth from "../components/SearchBarAuth";
import NewMostMovies from "../components/NewMostMovies";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
export default function HomeAuth() {
  return (
    <>
      <Layout>
        <Helmet>
          <title>MovieAlert - Know the Content Warnings before you watch</title>
          <meta
            name="description"
            content="Discover content warnings for movies to make informed viewing choices."
          />
          <link rel="canonical" href={import.meta.env.VITE_APP_BASE_URL} />
        </Helmet>

        <Navbar />
        <SearchBarAuth />
        <div className="mt-20 min-h-[100vh]">
          <NewMostMovies />
        </div>
      </Layout>
      <Footer />
    </>
  );
}
