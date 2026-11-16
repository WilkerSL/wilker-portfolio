import "@/styles/global.css";
import "@/shared/animation/gsap.setup";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { appRouter } from "@/app/app.routes";

const container = document.getElementById("root");

if (container !== null) {
  createRoot(container).render(
    <StrictMode>
      <RouterProvider router={appRouter} />
    </StrictMode>,
  );
}
