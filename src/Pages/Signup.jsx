import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const validatePassword = (password) => {
    const isValidLength = password.length > 5;
    const hasNumber = /\d/.test(password);
    const hasAlphabet = /[a-zA-Z]/.test(password);

    if (!isValidLength) {
      return "Password must be longer than 5 characters.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasAlphabet) {
      return "Password must contain at least one letter.";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const errorMessage = validateEmail(newEmail);
    setEmailError(errorMessage);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const errorMessage = validatePassword(newPassword);
    setPasswordError(errorMessage);
  };

  const generateFakeJWT = (payload) => {
    // This is NOT secure, just for simulation
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(JSON.stringify(payload));
    const signature = btoa("fake-signature");
    return `${header}.${body}.${signature}`;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const userData = {
      name,
      email,
      password,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    // Simulate JWT
    const fakeJWT = generateFakeJWT({ email, time: Date.now() });
    localStorage.setItem("jwt", fakeJWT);
    navigate("/login");
  };

  return (
  <div className="h-screen flex justify-center items-center bg-blue-light px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue mb-6 text-right">
        Keep your job applications organized
      </h2>
      <form onSubmit={handleSignup} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary-text mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="youremail@gmail.com"
            value={email}
            onChange={handleEmailChange}
            required
            autoComplete="email"
            className="w-full px-3 py-2 border border-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
          />
          {emailError && (
            <p className="text-error text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-primary-text mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full px-3 py-2 border border-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
          />
          {passwordError && (
            <p className="text-error text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>
          <p className="mt-3 text-sm text-secondary-text text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue underline hover:no-underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
);
};

export default Signup;
