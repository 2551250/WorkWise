import './App.css';
import {login} from  "./backend.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <button id="Login" size="lg" onClick={login}></button>
    </div>
  );
}

export default App;
