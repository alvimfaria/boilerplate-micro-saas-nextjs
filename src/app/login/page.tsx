"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabaseClient";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`Erro: ${error.message}`);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Faça seu Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Campo de E-mail */}
          <input
            type="email"
            placeholder="Seu e-mail"
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "E-mail inválido",
              },
            })}
            className="w-full border rounded-lg p-2 mb-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {typeof errors.email.message === "string" ? errors.email.message : "Erro inesperado"}
            </p>
          )}

          {/* Campo de Senha */}
          <input
            type="password"
            placeholder="Sua senha"
            {...register("password", {
              required: "Senha é obrigatória"
            })}
            className="w-full border rounded-lg p-2 mb-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {typeof errors.password.message === "string" ? errors.password.message : "Erro inesperado"}
            </p>
          )}

          {/* Botão de Login */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>

        <div className="my-4 flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">ou</span>
          <hr className="w-full border-gray-300" />
        </div>
        Esqueceu sua senha?{" "}
        <a href="/login/esqueci" className="text-blue hover:underline">
          Recuperar Senha
        </a>
      </div>
      <div className="my-4 flex items-center justify-between">
        <hr className="w-full border-gray-300" />
      </div>
      Não tem uma conta?{" "}
      <a href="/login/criar" className="text-blue hover:underline">
        Criar conta
      </a>
    </div>
  );
};

export default Login;
