// src/components/DevAuthControls.tsx
"use client";
import { auth } from "@/firebase/config";
import { loginWithGoogle } from "@/lib/auth";

export default function DevAuthControls() {
  const handleLogout = async () => {
    await auth.signOut();
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded shadow-lg border">
      <div className="space-y-2">
        <button
          onClick={loginWithGoogle}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm block w-full"
        >
          Testar Login Novamente
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm block w-full"
        >
          Sair
        </button>
      </div>
    </div>
  );
}