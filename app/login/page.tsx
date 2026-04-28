"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const isLogin = mode === "login";

  const handleSubmit = async () => {
    if (isLogin) {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("holygo_user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id.toString());

        alert("Login Success");
        router.push("/home");
      } else {
        alert(data.message);
      }
    } else {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Register Success");
        setMode("login");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f2f5] font-sans">
      <div className="w-[375px] h-[812px] bg-white border-8 border-slate-800 rounded-[40px] p-8 flex flex-col shadow-xl">

        {/* HEADER */}
        <div className="text-center mb-8 pt-4 flex flex-col items-center">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-[#51309E] rounded-br-[22px] rounded-tl-[22px] rounded-tr-[22px] flex flex-col items-center justify-center overflow-hidden">
              <div className="w-10 h-3 bg-[#A6CE39] rounded-sm mb-1"></div>
              <div className="w-10 h-10 bg-[#A6CE39] rounded-sm"></div>
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold">
                <span className="text-[#51309E]">holy</span>
                <span className="text-[#A6CE39]">Go</span>
              </h1>
              <p className="text-xs text-gray-500">Umrahajj Guideapp</p>
            </div>
          </div>
        </div>

        {/* TAB */}
        <div className="bg-[#F0FDF4] p-1.5 rounded-2xl flex mb-8 border">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-3 font-bold rounded-xl transition-all duration-200
              ${isLogin
                ? "bg-white text-[#51309E] shadow active:scale-95"
                : "text-gray-400 hover:bg-white/50"
              }`}
          >
            Login
          </button>

          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-3 font-bold rounded-xl transition-all duration-200
              ${!isLogin
                ? "bg-white text-[#51309E] shadow active:scale-95"
                : "text-gray-400 hover:bg-white/50"
              }`}
          >
            Register
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-5 transition-all duration-300">

          {!isLogin && (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full h-14 bg-white border-2 border-gray-300 rounded-2xl px-5 text-gray-800 placeholder-gray-500 font-medium focus:outline-none focus:border-[#51309E] focus:scale-[1.02] transition-all"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full h-14 bg-white border-2 border-gray-300 rounded-2xl px-5 text-gray-800 placeholder-gray-500 font-medium focus:outline-none focus:border-[#51309E] focus:scale-[1.02] transition-all"
          />

          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full h-14 bg-white border-2 border-gray-300 rounded-2xl px-5 pr-12 text-gray-800 placeholder-gray-500 font-medium focus:outline-none focus:border-[#51309E] focus:scale-[1.02] transition-all"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600 active:scale-90 transition-all"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>

          {isLogin && (
            <div className="text-right text-sm text-green-500 hover:underline cursor-pointer transition-all">
              <p
                onClick={() => router.push("/forgot-password")}
                className="text-green-500 text-sm cursor-pointer"
              >
                Forgot password?
              </p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full h-14 bg-[#51309E] text-white rounded-2xl font-bold 
                       hover:brightness-110 
                       active:scale-95 active:shadow-inner 
                       transition-all duration-150"
          >
            {isLogin ? "Sign In" : "Register Now"}
          </button>
        </div>

        {/* SWITCH */}
        <p className="text-center text-sm text-gray-400 mt-auto">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setMode(isLogin ? "register" : "login")}
            className="text-green-500 font-bold ml-1 cursor-pointer 
                       hover:underline hover:text-green-600 
                       active:scale-95 
                       transition-all duration-150 inline-block"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}