// src/radixPatch.js
const safeDestroy = (fn) => {
  try {
    if (typeof fn === "function") {
      fn();
    }
  } catch (e) {
    if (e?.message?.includes("destroy is not a function")) {
      // swallow Radix bug
      console.warn("Radix UI safeDestroy ignored:", e.message);
      return;
    }
    throw e; // rethrow real errors
  }
};

// Patch the global Object prototype Radix uses internally
// Radix calls cleanup functions stored in arrays
const originalSplice = Array.prototype.splice;
Array.prototype.splice = function (...args) {
  const removed = originalSplice.apply(this, args);
  removed.forEach((fn) => safeDestroy(fn));
  return removed;
};
