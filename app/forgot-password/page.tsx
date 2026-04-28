"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    if (!email || !newPass || !confirmPass) {
      setError("Harap isi semua kolom!");
      return;
    }

    if (newPass !== confirmPass) {
      setError("Konfirmasi password tidak cocok!");
      return;
    }

    try {
      const res = await fetch("/api/forgot-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword: newPass,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password berhasil direset");
        router.push("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6]">
      <div className="w-[375px] h-[812px] bg-white border-8 border-slate-800 rounded-[40px] p-6 flex flex-col">
        <div className="flex items-center gap-4 mt-4 mb-10">
          <button onClick={() => router.back()}>←</button>
          <h1 className="text-2xl font-bold">Forgot Password</h1>
        </div>

        <div className="flex-1 space-y-6">
          <input
            type="email"
            placeholder="Masukkan email akun"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-100 outline-none"
          />

          <input
            type="password"
            placeholder="Password baru"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-100 outline-none"
          />

          <input
            type="password"
            placeholder="Konfirmasi password baru"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-100 outline-none"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          onClick={handleReset}
          className="w-full py-5 bg-[#51309E] text-white rounded-3xl font-bold"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}