"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabaseClient";
import { HomeIcon, ChartBarIcon, CogIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

const SideMenu = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      {/* Cabeçalho */}
      <div className="p-4 text-xl font-bold bg-gray-900">
        Admin Dashboard
      </div>

      {/* Navegação */}
      <nav className="flex-grow mt-4">
        <ul className="space-y-2">
          <li>
            <a
              href="/dashboard"
              className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Página Inicial
            </a>
          </li>
          <li>
            <a
              href="/dashboard/relatorios"
              className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Relatórios
            </a>
          </li>
          <li>
            <a
              href="/dashboard/configuracoes"
              className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              <CogIcon className="w-5 h-5 mr-2" />
              Configurações
            </a>
          </li>
        </ul>
      </nav>

      {/* Botão de Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors"
      >
        <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-2" />
        Logout
      </button>
    </aside>
  );
};

export default SideMenu;
