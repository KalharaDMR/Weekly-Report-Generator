import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../../services/auth.service";

import useAuth from "../../hooks/useAuth";

import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const auth = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      auth.login(response.accessToken);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>Weekly Report Generator</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}