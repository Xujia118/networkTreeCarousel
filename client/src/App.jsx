import { useEffect, useState } from "react";

import { fetchStates } from "./services";

function App() {
  const [states, SetStates] = useState([]);

  function onLoadStates() {
    fetchStates()
      .then((data) => {
        SetStates(data.states);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    onLoadStates();
  }, []);

  return (
    <ul>
      {states.map((state, index) => (
        <li key={index}>{state}</li>
      ))}
    </ul>
  );
}

export default App;
