"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabaseClient";
import { User } from "@supabase/auth-js";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session) {
        router.push("/login");
      } else {
        setUser(data.session.user);
      }
    };

    checkUser();
  }, [router]);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return <div>Bem-vindo ao Dashboard, {user.email}!</div>;
};

export default Dashboard;
