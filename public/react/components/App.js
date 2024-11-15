import React, { useEffect, useState } from "react";
import { PagesList } from "./PagesList";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import { title } from "process";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [isAddingPage, setIsAddingPage] = useState(false);

  useEffect(() => {
    // Fetch all the pages when the app loads
    async function fetchPages() {
      try {
        const response = await fetch(`${apiURL}/wiki`);
        const pagesData = await response.json();
        setPages(pagesData);
      } catch (err) {
        console.log("Oh no an error! ", err);
      }
    }

    fetchPages();
  }, []);

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
              const response = await fetch("/api/wiki", {
                method: "POST",
                headers: { "Content-Type": "application.json" },
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
      <PagesList pages={pages} setCurrentPage={setCurrentPage} />
    </div>
  );
};
export default App;
