import { Link } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { userAuthstore } from "../store/authUser";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const SignupPage = () => {
  const [SearchParams] = useSearchParams();
  const emailvalue = SearchParams.get("email")
  const [email, Setemail] = useState(emailvalue || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, Setusername] = useState("");

  const { signup } = userAuthstore();

  const handleSignup = (e) => {
    e.preventDefault();
    signup({ email, password, username })
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
            Sign Up
          </h1>
          <form className="space-y-4" onSubmit={handleSignup}>
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
              <label htmlFor="username" className="text-gray-300 text-sm font-medium block">
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="Elon Musk"
                id="username"
                required
                value={username}
                onChange={(e) => Setusername(e.target.value)}
              />
            </div>

            <label htmlFor="password" className="text-gray-300 text-sm font-medium block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2  border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring pr-10"
                placeholder="••••••••"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-mdhover:bg-red-700'>
              Signup
            </button>
          </form>
          <div className="text-center text-gray-300" >
            Already have an account?{" "}
            <Link to="/login" className="text-red-600">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
