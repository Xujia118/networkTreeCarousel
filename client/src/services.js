// To update in production
const BASE_URL = "http://localhost:3000";

// Abstraction to avoid repeats and errors, and for future scalability
function chainPromise(promise) {
    return promise
      .catch((err) => Promise.reject({ error: "network-error" }))
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
      });
  }
  
  // Fetch functions
  export function fetchStates() {
    const fetched = fetch(`${BASE_URL}/states`);
    return chainPromise(fetched);
  }