"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password: password,
      });

    if (authError || !authData?.user) {
      setErrorMsg(
        authError?.message || "Erro ao fazer login. Verifique suas credenciais."
      );
      return;
    }

    try {
      const supabaseUserId = authData.user.id;
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: supabaseUserId,
          email: authData.user.email,
          name: authData.user.user_metadata?.full_name || "Usuário",
        }),
      });

      const result = await res.json();
      if (!result.success) {
        setErrorMsg("Erro ao sincronizar usuário.");
        return;
      }

      router.push("/");
    } catch (error) {
      setErrorMsg("Erro ao sincronizar usuário no banco." + error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Entrar</h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              E-mail
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Senha
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold"
          >
            Entrar
          </Button>

          {errorMsg && (
            <div className="text-red-600 text-sm text-center">{errorMsg}</div>
          )}

          <div className="text-center mt-2">
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
