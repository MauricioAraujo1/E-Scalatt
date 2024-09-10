import { useState } from "react";
import { Outlet } from "react-router-dom"
import Logo from "../../assets/logo.svg"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Switch } from "@/components/ui/switch"

export function AppLayout() {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    // Função para alternar a visibilidade do menu
    const toggleProfileMenu = () => {
      setProfileMenuOpen(!profileMenuOpen);
    }
 return (
    <div>
        <header className=" h-16 flex items-center p-4 bg-gray-200 text-white">
        <div className="top-0 left-0 w-full h-4 bg-white"></div>
        </header>
        <header className="flex items-center p-4 bg-white text-white">
            <img src={Logo} alt="Logo" className="h-12 mr-3" /> {/* Ajuste o tamanho e o espaçamento conforme necessário */}
            <div className="text-lg font-medium">
            </div>
            
            <div className="flex items-center space-x-4 ml-auto">
          {/* Botão Escala */}
          <button className="px-10 py-2 mr-12 bg-customBlue text-white rounded hover:bg-customBlueHover">
            Escala
          </button>

          {/* Botão Perfil */}
          <button
            className="px-4 py-2 bg-customBlue text-white rounded hover:bg-customBlueHover relative"
            onClick={toggleProfileMenu}
          >
            Perfil
            <i className="fas fa-chevron-down ml-2"></i> {/* Ícone de seta para baixo */}
            {/* Menu de perfil */}
            {profileMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-36 bg-customBlue text-white shadow-lg rounded">
                <ul>
                  <li className="p-2 hover:bg-customBlueHover cursor-pointer">Editar</li>
                  <li className="p-2 hover:bg-customBlueHover cursor-pointer">Minha Assinatura</li>
                  <li className="p-2 hover:bg-customBlueHover cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </button>
        </div>
        </header>
            <Outlet />
    </div>
 )
}