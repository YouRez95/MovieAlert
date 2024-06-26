import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import SearchBarAuth from "../components/SearchBarAuth";
import MostSearched from "../components/MostSearched";
export default function HomeAuth() {
  return (
    <Layout>
      <Navbar />

      <SearchBarAuth />

      <div className="mt-20">
        <MostSearched text="Most Searched" />
        <MostSearched text="New Added" />
      </div>
    </Layout>
  );
}
