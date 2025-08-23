// src/fixRadixBug.js
if (typeof window !== "undefined") {
  const globalAny = window;
  // Radix bundles safelyCallDestroy inside window when using Vite
  const key = Object.keys(globalAny).find((k) =>
    k.toLowerCase().includes("safelycalldestroy")
  );

  if (key && typeof globalAny[key] === "function") {
    const original = globalAny[key];
    globalAny[key] = (fn) => {
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
