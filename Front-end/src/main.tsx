import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { CartItemsProvider } from "./context/CartItemsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <CartItemsProvider>
        <RouterProvider router={router} />
      </CartItemsProvider>
    </UserProvider>
  </StrictMode>,
);
