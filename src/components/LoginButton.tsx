// src/components/LoginButton.tsx
"use client";
import { auth } from "@/firebase/config";
import { loginWithGoogle } from "@/lib/auth";

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
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {auth.currentUser ? "Trocar de conta" : "Entrar com Google"}
    </button>
  );
}