import Navbar from '@/components/navbar/Navbar'
import ProtectedRoute from '../../utils/route/ProtectedRoute'
import '../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prueba de react vectorial',
  description: 'Una pagina para pruebas de vectorial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" data-lt-installed="false">
      <body className="flex h-screen bg-gray-50 flex-1 flex flex-col" suppressHydrationWarning={true} >
        <Navbar />
        <ProtectedRoute>
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
