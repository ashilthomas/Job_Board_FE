if (typeof window !== "undefined") {
	const globalAny = window;
	const original = globalAny.safelyCallDestroy;

	globalAny.safelyCallDestroy = (value) => {
		try {
			if (value == null) return;

			if (typeof value === "function") {
				// If it is a cleanup function, call it
				return value();
			}

			// If it's an object with a callable cleanup, prefer destroy/abort/unsubscribe/dispose
			const maybeDestroy = value && value.destroy;
			if (typeof maybeDestroy === "function") {
				return maybeDestroy.call(value);
			}

			const maybeAbort = value && value.abort;
			if (typeof maybeAbort === "function") {
				return maybeAbort.call(value);
			}

			const maybeUnsubscribe = value && value.unsubscribe;
			if (typeof maybeUnsubscribe === "function") {
				return maybeUnsubscribe.call(value);
			}

			const maybeDispose = value && value.dispose;
			if (typeof maybeDispose === "function") {
				return maybeDispose.call(value);
			}

			// If original exists and value is a function, let it handle; otherwise, just ignore
			if (typeof original === "function" && typeof value === "function") {
				return original(value);
			}

			// No-op for non-callable/non-cleanup shapes
			return;
		} catch (err) {
			if (err && typeof err.message === "string" && err.message.includes("destroy is not a function")) {
				console.warn("Ignored non-callable destroy during router cleanup");
				return;
			}
			throw err;
		}
	};
}