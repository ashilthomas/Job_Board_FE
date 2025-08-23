import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function RouterErrorBoundary() {
	const error = useRouteError();

	// Suppress the known Radix + Router integration error
	if (error && typeof error.message === "string" && error.message.includes("destroy is not a function")) {
		return null;
	}

	if (isRouteErrorResponse(error)) {
		return (
			<div className="p-6 text-center text-red-600">
				<h2 className="text-xl font-bold">{error.status} {error.statusText}</h2>
				<p>{error.data?.message || "An unexpected routing error occurred."}</p>
			</div>
		);
	}

	return (
		<div className="p-6 text-center text-red-600">
			<h2 className="text-xl font-bold">Unexpected Application Error</h2>
			<p>{error?.message || "Something went wrong."}</p>
		</div>
	);
}