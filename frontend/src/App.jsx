import { useState } from "react";
import TaskBoard from "./components/TaskBoard"; // Nueva pantalla
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [view, setView] = useState("welcome");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <div className="app-wrapper">
      {view === "welcome" && (
        <div className="welcome card">
          <img src="/logo.svg" alt="Logo de TaskKeep" className="logo" />
          <h1>TaskKeep</h1>
          <p>Tu aventura diaria comienza aquí.</p>
          <div className="button-group">
            <button onClick={() => setView("login")}>Iniciar Sesión</button>
            <button onClick={() => setView("register")}>Registrarse</button>
          </div>
        </div>
      )}

      {view === "login" && (
        <div className="card">
          <LoginForm
            onBack={() => setView("welcome")}
            onLogin={(receivedToken) => {
              setToken(receivedToken);
              localStorage.setItem("token", receivedToken);
              setView("dashboard");
            }}
          />
        </div>
      )}

      {view === "register" && (
        <div className="card">
          <RegisterForm onBack={() => setView("welcome")} />
        </div>
      )}

      {view === "dashboard" && (
        <div className="card">
          <TaskBoard token={token} onLogout={() => {
            localStorage.removeItem("token");
            setToken("");
            setView("welcome");
          }} />
        </div>
      )}
    </div>
  );
}

export default App;
