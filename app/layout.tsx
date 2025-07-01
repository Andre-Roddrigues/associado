import type { Metadata } from "next";
import { Montserrat,Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"
import ReactQueryClientProvider from "@/ReactQuery/QueryClientProvider";
import { getUser } from "./(auth)/login/auth-actions";
import { Header } from "@/components/Landing/Header/header";
import Footer from "@/components/Landing/Footer/footer";
import { isAuthenticated } from '@/lib/auth-utils';
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Associados",
  description: "Venha partilhar o seu conhecimento e veja sua renda crescer com a nossa plataforma de cursos, ebooks e mentorias. Cadastre-se agora e comece a monetizar seu conhecimento!",
};


export  default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getUser();

  return (
    <html lang="en" className=" " >
     <head>
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-3YZK3D46ZS"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-3YZK3D46ZS');
              `,
            }}
          />
        </head>
      <body className={`h-full bg-gradient-to-br from-blue-900 to-blue-500 text-white ${nunito.className} ${montserrat.variable}`}>
          <ReactQueryClientProvider>
            {/* <Navbar user={user}/> */}
            <HeaderWrapper />
            <div className="h-full flex flex-col bg-secondary  ">
              <div className="flex-1">
                {children}
              </div>
             {/* <ContactFormButton /> */}
              <Footer/> 
            </div>
            </ReactQueryClientProvider> 
        <Toaster containerClassName="mt-[7vh] " position="top-center" />
      </body>
    </html>
  );
}
async function HeaderWrapper() {
  const userIsAuthenticated = await isAuthenticated();
  return <Header isAuthenticated={userIsAuthenticated} />;
}