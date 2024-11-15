import React from "react";

export const Page = ({ page, setCurrentPage }) => {
  // Render page details like title, content, and tags
  if (!page) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/wiki/${page.slug}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Page failed to delete!");
      }
      // Remove page from teh ui
      setCurrentPage(null); // Clear the current page view

      // Fetch updated pages list (in case you want to keep it in sync)
      const responsePages = await fetch(`${apiURL}/wiki/`);
      const pagesData = await responsePages.json();
      setPages(pagesData);
    } catch (error) {
      console.error("Errorr deleting page:", error);
    }
  };

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

      <button onClick={handleDelete}>Delete Page</button>
    </div>
  );
};

export default Page;
