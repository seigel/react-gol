import "./App.css";
import Board from "./components/Board";
function App() {

  return (
    <>
      <div className="card">
        <Board x={38} y={20}/>
      </div>
    </>
  );
}

export default App;
