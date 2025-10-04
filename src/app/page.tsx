"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
  const supabase = createClient();
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [entering, setEntering] = useState(false);
  const [invCredetials, setInvCredetials] = useState(false);
  const [unspectatedError, setUnspectatedError] = useState(false);
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        router.replace("/condominios");
      } else {
        setCheckingSession(false);
      }
    };
    checkSession();
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnspectatedError(false);
    setInvCredetials(false);
    setEntering(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error?.message == "Invalid login credentials") {
        setEntering(false);
        setInvCredetials(true);
        return;
      }
    } catch (error) {
      //erro inesperado
      setUnspectatedError(true);
      setEntering(false);
      return;
    }

    router.replace("/condominios");
  };

  if (checkingSession) {
    return null;
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Olá 👋</h2>
          <p className="text-gray-500 mb-6">
            Insira as informações que você usou ao se registrar.
          </p>
          <form onSubmit={login}>
            {unspectatedError ? (
              <p className="text-red-700 relative">
                Erro inesperado. Tente novamente.
              </p>
            ) : (
              <p></p>
            )}
            {invCredetials ? (
              <p className="text-red-700 relative">Login ou senha incorreto</p>
            ) : (
              <p></p>
            )}

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-md hover:opacity-90 transition-all disabled:opacity-50"
            >
              {entering ? "Entrando" : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
