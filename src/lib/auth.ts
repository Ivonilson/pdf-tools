// src/lib/auth.ts
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // ← Importação correta
import { auth } from "@/firebase/config"; // ← Importe a instância do SEU arquivo de configuração

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: 'select_account', // ← Corrigido (sem underscore)
    login_hint: ''
  });

  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
};

// Função de logout completo
export const fullLogout = async () => {
  await auth.signOut();
  
  // Limpeza do cache (opcional, mas recomendado)
  if (typeof window !== 'undefined') {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
    localStorage.clear();
    sessionStorage.clear();
  }
};