// src/Components/ErrorBoundary.jsx
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Ignore Radix UI "destroy is not a function" error
    if (error?.message?.includes("destroy is not a function")) {
      return null; // don't trigger fallback
    }
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (error?.message?.includes("destroy is not a function")) {
      // just ignore silently (or log once if you want)
      console.warn("Ignored Radix UI error:", error.message);
    } else {
      console.error("ErrorBoundary caught:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center text-red-600">
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p>Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
