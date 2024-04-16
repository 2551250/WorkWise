import './App.css';
import { login } from "./backend.js";

function LoginButton() {
  return (
    <button type="button" onClick={login}>Login</button>
  )
}

function App() {
  return (
    <div>
      <LoginButton />
    </div>
  );
}

export default App;
