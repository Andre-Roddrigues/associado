
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center animate-fadeIn">
        <div className="mx-auto w-80 animate-[float_3s_infinite] shadow-xl rounded-lg overflow-hidden">
          <Image
            src="https://yemca-services.net/404.png"
            alt="404 Illustration"
            width={320}
            height={320}
            className="w-full h-auto"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-blue-700 mt-6">
          Pareces Pedido Irmão!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mt-2">
          O formador que procuras, ainda não existe.
        </p>
        <Link href="/instrutor" passHref>
          <div className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-blue-700 cursor-pointer">
            Veja Bem
          </div>
        </Link>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
