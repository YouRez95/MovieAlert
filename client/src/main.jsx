import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/queryClient";
import { HelmetProvider, Helmet } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <Helmet>
      <title>MovieAlert: Check movies for content warnings</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/logo32.png" />
      <link rel="icon" type="image/png" sizes="64x64" href="/logo64.png" />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/apple-touch-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/apple-touch-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-touch-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-touch-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon-180x180.png"
      />
    </Helmet>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools position="bottom-right" initialIsOpen={true} />
      </QueryClientProvider>
    </React.StrictMode>
  </HelmetProvider>
);
