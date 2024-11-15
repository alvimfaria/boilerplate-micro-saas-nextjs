"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabaseClient";
import { useRouter } from "next/navigation";

interface ResetPasswordFormInputs {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormInputs>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session) {
        setMessage("Token inválido ou expirado. Solicite uma nova recuperação de senha.");
        setTimeout(() => router.push("/login/esqueci"), 3000);
      }
    };

    validateToken();
  }, [router]);

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(`Erro ao redefinir a senha: ${error.message}`);
    } else {
      setMessage("Senha redefinida com sucesso! Redirecionando para login...");
      setTimeout(() => router.push("/login"), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Redefinir Senha</h1>

        {message && (
          <p className={`text-center text-sm mb-4 ${message.includes("Erro") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Campo de Nova Senha */}
          <input
            type="password"
            placeholder="Nova senha"
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 caracteres",
              },
            })}
            className="w-full border rounded-lg p-2 mb-4"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Campo de Confirmar Senha */}
          <input
            type="password"
            placeholder="Confirmar nova senha"
            {...register("confirmPassword", {
              required: "Confirmação de senha é obrigatória",
              validate: (value) =>
                value === watch("password") || "As senhas não coincidem",
            })}
            className="w-full border rounded-lg p-2 mb-4"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}

          {/* Botão de Enviar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Redefinindo..." : "Redefinir Senha"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
