// src/components/UserProfile.tsx
"use client";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <h3 className="font-bold">Dados do usuário:</h3>
      {user.photoURL && (
        <img 
          src={user.photoURL} 
          alt="Foto do usuário"
          className="w-16 h-16 rounded-full my-2"
        />
      )}
      <p><strong>Nome:</strong> {user.displayName || "Não informado"}</p>
      <p><strong>Email:</strong> {user.email || "Não informado"}</p>
      <p><strong>ID:</strong> {user.uid}</p>
    </div>
  );
}