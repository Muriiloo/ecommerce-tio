import { Button } from "./ui/button";

const Footer = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-4">
          Pronto para fazer seu pedido?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Entre em contato conosco pelo WhatsApp e tire todas suas dúvidas
        </p>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all duration-500 text-white px-8 py-4 rounded-lg text-lg font-semibold">
          Falar no WhatsApp
        </Button>
      </div>
    </section>
  );
};

export default Footer;
