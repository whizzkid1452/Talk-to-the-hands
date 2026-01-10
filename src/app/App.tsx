import React from "react";
import { Home } from "./Home";
import { useCustomCursor } from "./hooks/useCustomCursor";

export default function App() {
  useCustomCursor();

  return <Home />;
}