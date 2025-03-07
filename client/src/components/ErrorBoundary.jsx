import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center bg-gray-100 w-full h-screen">
          <div className="bg-red-100 text-red-700 border border-red-400 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Something went wrong</h2>
            <p className="mt-2 text-sm">Please try refreshing the page.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
