import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f2f2f2] text-gray-700 pt-10 pb-6">
      <div className="container mx-auto px-6 md:px-12">
        {/* Logo + Redes Sociais */}
        <div className="flex flex-col items-center md:items-start md:flex-row justify-between mb-10">
          <Image
            src="/logo_sem_fundo.png"
            alt="Logo"
            width={140}
            height={60}
            className="mb-6 md:mb-0 bg-black"
          />

          <div className="flex gap-5 text-xl">
            <FaInstagram className="cursor-pointer hover:text-black" />
            <FaFacebookF className="cursor-pointer hover:text-black" />
            <FaPinterestP className="cursor-pointer hover:text-black" />
            <FaYoutube className="cursor-pointer hover:text-black" />
            <FaTiktok className="cursor-pointer hover:text-black" />
          </div>
        </div>

        {/* Links principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm mb-10">
          <div>
            <h3 className="font-semibold mb-3">ENTREGAS</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="relative group">
                  Rastreamento de Pedidos
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">MEUS DADOS</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="relative group">
                  Minha Conta
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">CONSULTE NOSSAS POLÍTICAS</h3>
            <ul className="space-y-2">
              {[
                "Política de Trocas",
                "Política de Entregas",
                "Política de Cashback",
                "Política de Pagamentos",
                "Política de Privacidade",
              ].map((item, i) => (
                <li key={i}>
                  <a href="#" className="relative group">
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">FALE COM A GENTE</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://wa.me/5511910062463"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 relative group"
                >
                  <FaWhatsapp /> (XX) XXXXX-XXXX (Suporte)
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511916220505"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 relative group"
                >
                  <FaWhatsapp /> (XX) XXXXX-XXXX (Vendas)
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511984298015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 relative group"
                >
                  <FaWhatsapp /> (XX) XXXXX-XXXX (Bazar)
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>E-commerce: Seg a Sex 7:30h às 16:30h</li>
            </ul>
          </div>
        </div>

        {/* Pagamento + Segurança */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-300 pt-6 text-xs">
          <div className="flex gap-3 mb-4 md:mb-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/American_Express_logo_%282018%29.svg"
              alt="Amex"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Pix_logo.svg"
              alt="Pix"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
