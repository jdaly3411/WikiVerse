import React, { useState } from "react";
import { Page } from "./Page";
import apiURL from "../api";

export const PagesList = ({ pages, setCurrentPage }) => {
  const [loading, setLoading] = useState(false);

  const handlePageClick = async (slug) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`);
      if (!response.ok) {
        throw new Error("Page not found");
      }
      const data = await response.json();
      setCurrentPage(data);
    } catch (error) {
      console.error("Error fetching page:", error);
      alert("Error fetching page: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>All pages</h1>
      {loading && <p>Loading...</p>}
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <button onClick={() => handlePageClick(page.slug)}>
              {page.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PagesList;
