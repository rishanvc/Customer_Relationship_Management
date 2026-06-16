import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful. Wait for admin approval.");
    } else {
      alert("Registration failed");
      console.log(data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Staff Registration
          </h1>
          <p className="text-gray-500 mt-2">
            Create your account and wait for approval
          </p>
        </div>

        <div className="relative mb-4">
          <FaUser className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
          />
        </div>

        <div className="relative mb-4">
          <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
        </div>

        <div className="relative mb-6">
          <FaLock className="absolute left-4 top-4 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition duration-300"
        >
          Register
        </button>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?
          <Link
            to="/"
            className="ml-1 text-indigo-600 font-semibold hover:text-indigo-800"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;