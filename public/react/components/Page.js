import React from "react";

export const Page = ({ page, setCurrentPage }) => {
  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(null)}>Back to Pages List</button>
      <h1>{page.title}</h1>
      <p>{page.content}</p>
      <div>
        <strong>Author: </strong>
        {page.author?.name} ({page.author?.email})
      </div>
      <div>
        <strong>Tags: </strong>
        {page.tags?.map((tag) => tag.name).join(", ")}
      </div>
    </div>
  );
};

export default Page;
