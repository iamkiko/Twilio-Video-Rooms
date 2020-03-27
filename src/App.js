import React from "react";
import "./App.css";
import VideoChat from "./components/VideoChat";

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Leadhome Kitchen</h1>
      </header>
      <main>
        <VideoChat />
      </main>
      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="React">
            ⚛
          </span>{" "}
          by <a href="https://www.leadhome.co.za">Christos</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
