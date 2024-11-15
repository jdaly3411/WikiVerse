import React, { useEffect, useState } from "react";
import { PagesList } from "./PagesList"; // List of pages
import { Page } from "./Page"; // Individual page details view

// import and prepend the api URL to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [isAddingPage, setIsAddingPage] = useState(false);

  useEffect(() => {
    // Fetch all the pages when the app loads
    async function fetchPages() {
      try {
        const response = await fetch(`http://localhost:3000/api/wiki`);
        const pagesData = await response.json();
        setPages(pagesData);
      } catch (err) {
        console.log("Oh no an error! ", err);
      }
    }

    fetchPages();
  }, []);

  const handleDelete = async (slug) => {
    try {
      const response = await fetch(`http://localhost:3000/api/wiki/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Page failed to delete!");
      }

      const data = await response.json();
      console.log("Page deleted", data);

      // Remove page from the state after deletion
      setPages((prevPages) => prevPages.filter((page) => page.slug !== slug));
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  if (isAddingPage) {
    return (
      <div>
        <button onClick={() => setIsAddingPage(false)}>
          Back to Pages List
        </button>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);

            const newPage = {
              title: formData.get("title"),
              content: formData.get("content"),
              name: formData.get("name"),
              email: formData.get("email"),
              tags: formData.get("tags"),
            };
            try {
              const response = await fetch(`${apiURL}/wiki`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPage),
              });
              if (!response.ok) throw new Error("Failed to add page");
              const createdPage = await response.json();
              setPages((prev) => [...prev, createdPage]);
              setIsAddingPage(false);
            } catch (error) {
              console.error("Error adding page:", error);
            }
          }}
        >
          <h2>Create a new page</h2>
          <input name="title" placeholder="Title" required />
          <textarea name="content" placeholder="Content" required />
          <input name="name" placeholder="Author Name" required />
          <input
            name="email"
            type="email"
            placeholder="Author Email"
            required
          />
          <input name="tags" placeholder="Tags (separated by spaces)" />
          <button type="submit">Create Page</button>
        </form>
      </div>
    );
  }

  if (currentPage) {
    return <Page page={currentPage} setCurrentPage={setCurrentPage} />;
  }

  return (
    <div>
      <button onClick={() => setIsAddingPage(true)}>Add New Page</button>
      <PagesList
        pages={pages}
        setCurrentPage={setCurrentPage}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
