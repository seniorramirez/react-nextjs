'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children } : any) {
  const router = useRouter();

  const [isAuthenticated,setAuthenticated] = useState<string|null>(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado, de lo contrario redirigir a la página de inicio de sesión

    setAuthenticated(localStorage.getItem('token'))
    if (!isAuthenticated) { 
      router.push('/login');
    }
  }, []);

  return (
    <>
     { isAuthenticated ? children : <>Loading</>}
    </>
  );
};
