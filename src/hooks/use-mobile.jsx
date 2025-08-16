import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Debounce function to limit how often a function is called
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    // Create a debounced version of the onChange function
    const onChange = debounce(() => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }, 150) // 150ms debounce time

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", onChange)
    
    // Set initial value without debounce
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    return () => mql.removeEventListener("change", onChange);
  }, [])

  // Memoize the result to prevent unnecessary re-renders
  return React.useMemo(() => !!isMobile, [isMobile])
}
