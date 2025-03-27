import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { Toaster } from "@/components/ui/sonner.tsx";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "./components/layout/Loader.tsx";
import ErrorPage from "./components/layout/ErrorPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <ErrorBoundary fallback={<ErrorPage />}>
            <App />
          </ErrorBoundary>
          <Toaster />
        </BrowserRouter>
      </Suspense>
    </Provider>
  </StrictMode>
);
