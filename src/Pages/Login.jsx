import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const generateFakeJWT = (payload) => {
    // This is NOT secure, just for simulation
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(JSON.stringify(payload));
    const signature = btoa("fake-signature");
    return `${header}.${body}.${signature}`;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError("All fields are required.");
      localStorage.removeItem("jwt");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No user details found for this email.");
      localStorage.removeItem("jwt");
      return;
    }

    if (user.email === email && user.password !== password) {
      alert("Incorrect password. Please try again.");
      localStorage.removeItem("jwt");
      return;
    }

    if (user.email === email && user.password === password) {
      setFormError("");
      // Simulate JWT
      const fakeJWT = generateFakeJWT({ email, time: Date.now() });
      localStorage.setItem("jwt", fakeJWT);
      navigate("/dashboard"); 
    } else {
      setFormError("Invalid email or password.");
      localStorage.removeItem("jwt");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-light px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="mb-8 text-3xl font-bold text-blue text-center">Welcome back!</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3 py-2 border border-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="text-sm font-medium text-primary-text">
                Password
              </label>
              <a href="#" className="text-sm text-tertiary-text hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              placeholder="***********"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-3 py-2 border border-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
            />
          </div>
          {formError && (
            <div className="text-error text-sm mt-1">{formError}</div>
          )}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
            >
              Sign in
            </button>
            <p className="mt-3 text-sm text-center text-secondary-text">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue underline hover:no-underline">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
