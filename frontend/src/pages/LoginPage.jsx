import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        { withCredentials: true },
      );
      localStorage.setItem("barToken", response.data.token);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-800 bg-slate-950/80 p-10 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
      <h1 className="text-3xl font-semibold text-white">Login</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block text-sm text-slate-300">
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-rose-400"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-400">
        Don’t have an account?{" "}
        <Link className="text-rose-300 hover:text-rose-200" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
