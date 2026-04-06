import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">
          {isRouteErrorResponse(error) ? error.status : "Error"}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {isRouteErrorResponse(error)
            ? error.statusText
            : "Something went wrong"}
        </h2>
        <p className="text-gray-600 mb-6">
          {error?.message || "We couldn't find the page you're looking for."}
        </p>
        <a
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
