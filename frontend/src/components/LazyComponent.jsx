import { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

const LoadingBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-blue-500">
      <div className="h-full bg-blue-600 animate-loading"></div>
    </div>
  );
};
const LazyComponent = ({ children }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingBar />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default LazyComponent;
