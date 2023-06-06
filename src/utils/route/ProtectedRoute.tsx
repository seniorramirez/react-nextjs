'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children } : any) {
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado, de lo contrario redirigir a la página de inicio de sesión
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) { 
      router.push('/login');
    }
  }, []);

  return (
    <>{children}</>
  );
};
