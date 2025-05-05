import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import MenuAdmin from './components/MenuAdmin';
import EditProductForm from './components/EditProductForm';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children, roles }) => {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user?.rol)) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/admin/menu"
                element={
                  <PrivateRoute roles={['ADMIN']}>
                    <MenuAdmin />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/menu/edit/:id"
                element={
                  <PrivateRoute roles={['ADMIN']}>
                    <EditProductForm />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/admin/menu" />} />
            </Routes>
          </main>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App; 