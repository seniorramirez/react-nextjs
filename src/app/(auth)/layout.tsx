import '../globals.css';
import '@/assets/css/app.css';
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
    <html lang="en">
      <body className="flex h-screen bg-blue-700 flex-1 flex flex-col" suppressHydrationWarning={true} >
        {children}
        <div className="area" >
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div >
      </body>
    </html>
  )
}
