import './App.css';
import { login } from "./backend.js";
import LoginForm from './Components/LoginForm/LoginForm.jsx';

function LoginButton() {
  return (
    <button type="button" onClick={login}>Login</button>
  )
}

function App() {
  return (
      <LoginForm />
  );
}

export default App;
