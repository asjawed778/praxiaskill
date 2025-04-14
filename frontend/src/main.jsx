import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

// Importing local files
import "./index.css";
import { store } from "./store/store.js";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
          <Toaster />
        </ErrorBoundary>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
