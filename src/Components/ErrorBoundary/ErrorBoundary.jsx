// src/Components/ErrorBoundary.jsx
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // ✅ Ignore Radix UI bug ("destroy is not a function")
    if (error?.message?.includes("destroy is not a function")) {
      return { hasError: false }; // don’t show fallback
    }
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (!error?.message?.includes("destroy is not a function")) {
      console.error("ErrorBoundary caught:", error, info);
    }
    // else: silently ignore the Radix bug
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
