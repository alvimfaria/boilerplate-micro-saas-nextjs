"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { supabase } from "../../../../utils/supabaseClient";

interface ForgotPasswordFormInputs {
  email: string;
}

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormInputs>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: "http://localhost:3000/login/recuperar",
    });

    if (error) {
      setMessage(`Erro: ${error.message}`);
    } else {
      setMessage(
        "Se o e-mail estiver cadastrado, um link para redefinir a senha foi enviado."
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Recuperar Senha</h1>

        {message && (
          <p className={`text-center text-sm mb-4 ${message.includes("Erro") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Campo de E-mail */}
          <input
            type="email"
            placeholder="Digite seu e-mail"
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "E-mail inválido",
              },
            })}
            className="w-full border rounded-lg p-2 mb-4"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Botão de Enviar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Enviando..." : "Enviar Link de Recuperação"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
