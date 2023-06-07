'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children } : any) {
  const router = useRouter();

  const [isAuthenticated,setAuthenticated] = useState<string|null>(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado, de lo contrario redirigir a la página de inicio de sesión

    let token = localStorage.getItem('token');
    if (!token) { 
      router.push('/login');
    }
    setAuthenticated(token);
  }, []);

  return (
    <>
     { isAuthenticated ? children : <>Loading</>}
    </>
  );
};
