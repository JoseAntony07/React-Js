import { useState } from "react";

function App() {
  const [username, setUsername] = useState("Alex");
  const [likes, setLikes] = useState(0);

  return (
    <>
      {[1, 2, 3].map((item) => (
        <p key={item}>{username}</p>
      ))}

      <button onClick={() => setUsername("Sam")}>
        Change username
      </button>

      <button onClick={() => setLikes(likes + 1)}>
      👍 {likes} likes
      </button>

    </>
  );
}


export default App

