import "./App.css";
import Navbar from "./components/navbar/Navbar";
import React, { useState } from "react";

function App() {
  const [selectedGrouping, setSelectedGrouping] = useState(
    localStorage.getItem("grouping") === null
      ? "Status"
      : localStorage.getItem("grouping")
  );
  const [selectedOrdering, setSelectedOrdering] = useState(
    localStorage.getItem("ordering") === null
      ? "Title"
      : localStorage.getItem("ordering")
  );

  return (
    <>
      <div className="app">
        <div className="wrapper">
          <Navbar
            setSelectedGrouping={setSelectedGrouping}
            setSelectedOrdering={setSelectedOrdering}
            selectedGrouping={selectedGrouping}
            selectedOrdering={selectedOrdering}
          />
          <p>{selectedGrouping}</p>
          <p>{selectedOrdering}</p>
        </div>
      </div>
    </>
  );
}

export default App;
