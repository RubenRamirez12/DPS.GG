import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

export default function App () {
  const [count, setCount] = useState(0);

  return (
    <div className="app__div">
      <h1>Client Operational!</h1>
      <Navbar/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

    </div>
  );
}
