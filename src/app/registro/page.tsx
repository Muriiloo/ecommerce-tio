"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    console.log({ data, error });

    if (error) {
      if (
        error.message?.toLowerCase().includes("user already registered") ||
        error.message?.toLowerCase().includes("email already registered") ||
        error.message?.toLowerCase().includes("already exists")
      ) {
        setErrorMsg("E-mail já cadastrado. Faça login ou recupere sua senha.");
        return;
      } else {
        setErrorMsg(error.message || "Erro ao cadastrar");
        return;
      }
    }

    try {
      const user = data.user;
      if (user && user.id) {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            email: user.email,
            name,
          }),
        });

        const result = await res.json();
        if (!result.success) {
          setErrorMsg("Erro ao criar usuário no banco de dados");
          return;
        }
      }

      setSuccessMsg("Usuário cadastrado com sucesso!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setErrorMsg("Erro ao sincronizar cadastro." + error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Criar Conta
        </h1>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Nome completo
            </Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </div>
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
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold"
          >
            Cadastrar
          </Button>
          {errorMsg && (
            <div className="text-red-600 text-sm text-center">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="text-green-600 text-sm text-center">
              {successMsg}
            </div>
          )}
          <div className="text-center mt-2">
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:underline"
            >
              Já tem conta? Entrar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
