import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data);

      // Save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username",data.username);

      // Redirect based on role
      if (data.role === "admin") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/dashboard";
      }

    } else {
      alert(data.error || data.message);
    }

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      
      <div className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-2xl mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded"
            >
            Login
        </button>
        <p className="text-center mt-4">
            New staff?
            <Link
              to="/register"
              className="text-blue-500 ml-1"
            >
              Register here
            </Link>
          </p>
      </div>

    </div>
  );
}
export default Login;