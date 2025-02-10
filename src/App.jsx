import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <>
      <div className="card">
        <Board x={40} y={40} />
      </div>
    </>
  );
}

export default App;
