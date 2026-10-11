import React, { useEffect } from "react";
// import axios from "axios";
import axios from "./axios";

const App = () => {
  // async function apiCall() {
  //   const response = await fetch(
  //     "https://official-joke-api.appspot.com/random_joke"
  //   );
  //   const data = await response.json();

  //   console.log(data);
  // }

  async function apiCall() {
    const response = await axios.get("/random_joke");

    console.log(response.data);
  }

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div>
      <h1>Joke API</h1>
      <button onClick={apiCall}>Api Call</button>
    </div>
  );
};

export default App;