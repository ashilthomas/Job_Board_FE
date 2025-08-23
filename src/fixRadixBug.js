// src/fixRadixBug.js
if (typeof window !== "undefined") {
  const globalAny = window;
  if (globalAny.safelyCallDestroy) {
    const original = globalAny.safelyCallDestroy;
    globalAny.safelyCallDestroy = (fn) => {
      try {
        if (typeof fn === "function") {
          return original(fn);
        }
      } catch (err) {
        if (err?.message?.includes("destroy is not a function")) {
          console.warn("Suppressed Radix destroy bug");
          return;
        }
        throw err;
      }
    };
  }
}
