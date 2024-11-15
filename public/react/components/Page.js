import React from "react";

export const Page = ({ page, setCurrentPage }) => {
  <div>
    <h2>{page.title}</h2>
    <p>
      <strong>Author:</strong> {page.author.name}
    </p>
    <p>
      <strong>Email</strong> {page.author.email}
    </p>
    <p>
      <strong>Content:</strong>
    </p>
    <p>{page.content}</p>
    <p>
      <strong>Tags:</strong> {page.tags.join(", ")}
    </p>
    <button onClick={() => setCurrentPage(null)}>Back to Pages List</button>
  </div>;
};
