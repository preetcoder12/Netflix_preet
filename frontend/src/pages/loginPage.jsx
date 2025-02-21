import { Link } from "react-router-dom";
import { useState } from "react";
import { userAuthstore } from "../store/authUser";

const LoginPage = () => {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");

  const { login } = userAuthstore();

  const handleSignin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="p-4 max-w-6xl flex justify-between mx-auto items-center">
        <Link to="/">
          <img src="/netflix-logo.png" alt="LOGO" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 rounded-lg shadow-md space-y-6 bg-black/60">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Login
          </h1>
          <form className="space-y-4" onSubmit={handleSignin}>
            <div>
              <label htmlFor="email" className="text-gray-300 text-sm font-medium block">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="your@example.com"
                id="email"
                required
                value={email}
                onChange={(e) => Setemail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-300 text-sm font-medium block">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="••••••••"
                id="password"
                required
                value={password}
                onChange={(e) => Setpassword(e.target.value)}
              />
            </div>

            <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-mdhover:bg-red-700'>
              Login
            </button>
          </form>
          <div className="text-center text-gray-300" >
            Don't have any account account?{" "}
            <Link to="/signup" className="text-red-600">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage
