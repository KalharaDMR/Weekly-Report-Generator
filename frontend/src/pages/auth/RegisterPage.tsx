import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { register } from "../../services/auth.service";

import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register({
        name,
        email,
        password,
      });

      toast.success(
        "Registration successful"
      );

      navigate("/login");
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>Create Account</h1>

      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          {loading
            ? "Loading..."
            : "Register"}
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}