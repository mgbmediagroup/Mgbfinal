
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Debug log to verify title on load
  console.log("TITLE ON LOAD:", document.title);

  createRoot(document.getElementById("root")!).render(<App />);
  