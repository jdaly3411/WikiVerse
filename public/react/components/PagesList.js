import React from "react";
import { Page } from "./Page";

export const PagesList = ({ pages, setCurrentPage }) => {
  return (
    <div>
      <h1>All pages</h1>
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <button
              onClick={async () => {
                const response = await fetch(`/api/wiki/${page.slug}`);
                const data = await response.json();
                setCurrentPage(data);
              }}
            >
              {page.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PagesList;
