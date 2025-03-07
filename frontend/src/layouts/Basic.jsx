import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Basic() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <ErrorBoundary>
        <main className="flex-grow">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}
