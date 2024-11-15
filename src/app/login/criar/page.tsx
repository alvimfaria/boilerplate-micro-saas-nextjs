"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabaseClient";

interface SignupFormInputs {
  email: string;
  password: string;
}

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: SignupFormInputs) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(`Erro: ${error.message}`);
    } else {
      alert("Conta criada com sucesso!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Crie sua Conta</h1>

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
            className="w-full border rounded-lg p-2 mb-4"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}

          {/* Campo de Senha */}
          <input
            type="password"
            placeholder="Crie uma senha"
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
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}

          {/* Botão de Cadastro */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Criar conta
          </button>
        </form>

        <div className="my-4 flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">ou</span>
          <hr className="w-full border-gray-300" />
        </div>
        Já possui uma conta?{" "}
        <a href="/login" className="text-blue hover:underline">
          Faça Login
        </a>
      </div>
    </div>
  );
};

export default Signup;
