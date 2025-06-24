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
    <div className="mt-0 p-0 rounded-lg">
      {user.photoURL && (
        <img 
          src={user.photoURL} 
          alt="Foto do usuário"
          className="w-12 h-12 rounded-full my-2"
          title={user.displayName}
        />
      )}
    </div>
  );
}