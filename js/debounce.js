let timeout = null;

function debounce(func, delay) {
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      func(...args);
    }, delay);
  };
}
