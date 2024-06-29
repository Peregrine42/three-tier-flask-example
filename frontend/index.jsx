import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { App } from "./App";

// Clear the existing HTML content
document.getElementById("content").innerHTML = "";

// Render a React component instead
const root = createRoot(document.getElementById("content"));
root.render(<App />);
