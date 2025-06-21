// src/components/LoginButton.tsx
"use client";
import { auth } from "@/firebase/config";
import { loginWithGoogle } from "@/lib/auth";
import { FiUser } from "react-icons/fi";

export default function LoginButton() {
  const handleAuth = async () => {
    if (auth.currentUser) {
      await auth.signOut();
      window.location.reload(); // Recarrega para limpar cache
    } else {
      await loginWithGoogle();
    }
  };

  return (
    <button
      onClick={handleAuth}
      className="bg-white text-gray px-4 py-2 rounded flex justify-center hover:bg-gray-200 cursor-pointer"
    >
      <FiUser className="mr-2" /> {auth.currentUser ? "Trocar de conta" : "Entrar com Google"}
    </button>
  );
}