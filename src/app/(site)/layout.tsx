import Navbar from '@/components/navbar/Navbar'
import ProtectedRoute from '../../utils/route/ProtectedRoute'
import '../globals.css'
import { Inter } from 'next/font/google'
import '@/assets/css/app.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prueba de react',
  description: 'Una pagina para pruebas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" data-lt-installed="true">
      <body className="flex h-screen bg-blue-700 flex-1 flex flex-col" suppressHydrationWarning={true} >
        <ProtectedRoute>
          <Navbar />

          <div className="wrapper p-6">
            <div className="wrapper-box">
              <div className="content p-6">
                
                  {children}
                
              </div>
            </div>
          </div>
        </ProtectedRoute>
      </body>
    </html>
  )
}
