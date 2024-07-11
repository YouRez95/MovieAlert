import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import SearchBarAuth from "../components/SearchBarAuth";
import NewMostMovies from "../components/NewMostMovies";
export default function HomeAuth() {
  return (
    <Layout>
      <Navbar />

      <SearchBarAuth />

      <div className="mt-20">
        <NewMostMovies />
      </div>
    </Layout>
  );
}
