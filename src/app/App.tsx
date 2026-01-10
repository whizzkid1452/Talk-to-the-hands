import React, { useState, createContext, useContext } from "react";
import { Home } from "./Home";
import { About } from "./About";
import { useCustomCursor } from "./hooks/useCustomCursor";

type Page = "home" | "post" | "game" | "music" | "code" | "diary" | "about";

interface PageContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const PageContext = createContext<PageContextType>({
  currentPage: "home",
  setCurrentPage: () => {},
});

export const usePage = () => useContext(PageContext);

export default function App() {
  useCustomCursor();
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <About />;
      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {renderPage()}
    </PageContext.Provider>
  );
}