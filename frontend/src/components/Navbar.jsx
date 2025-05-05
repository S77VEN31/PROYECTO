import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Batidos & Crepes
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.rol === 'ADMIN' && (
                  <Link
                    to="/admin/menu"
                    className="text-gray-700 hover:text-primary"
                  >
                    Gestión de Menú
                  </Link>
                )}
                <span className="text-gray-700">
                  {user.nombre} ({user.rol})
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white bg-primary rounded-md hover:bg-primary-dark"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm text-white bg-primary rounded-md hover:bg-primary-dark"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 