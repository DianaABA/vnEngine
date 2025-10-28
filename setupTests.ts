// Example: Polyfill window.matchMedia for React Testing Library
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  };
};
