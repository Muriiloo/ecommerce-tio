"use client";
import { Instagram, MessageCircle, Mail, ArrowUpRight, MapPin, Clock } from "lucide-react";

const ContatosPage = () => {
  const contactMethods = [
    {
      icon: Instagram,
      title: "Instagram",
      description: "Siga-nos para novidades e conteúdo exclusivo",
      link: "https://www.instagram.com/usi.outshop_online/",
      linkText: "@usi.outshop_online",
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:from-pink-600 hover:to-purple-700"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Junte-se ao nosso grupo para suporte direto",
      link: "https://chat.whatsapp.com/LpkDY0yazGiAddlY7FFx4F",
      linkText: "Entrar no grupo",
      color: "from-green-500 to-emerald-600",
      hoverColor: "hover:from-green-600 hover:to-emerald-700"
    },
    {
      icon: Mail,
      title: "E-mail",
      description: "Para consultas formais, parcerias e mais informações",
      link: "mailto:contato@suaempresa.com",
      linkText: "contato@contato.com",
      color: "from-blue-500 to-indigo-600",
      hoverColor: "hover:from-blue-600 hover:to-indigo-700"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Vamos Conversar
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Estamos aqui para ouvir você. Escolha o canal que preferir e entre em contato conosco.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20"
              >

                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{method.description}</p>

                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${method.color} ${method.hoverColor} text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:shadow-xl`}
                >
                  <span>{method.linkText}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
            );
          })}
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Horário de Atendimento</h4>
                <p className="text-gray-600 leading-relaxed">
                  Segunda à Sexta: 9h às 18h<br />
                  Sábado: 9h às 14h (horarios ficticios)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Localização</h4>
                <p className="text-gray-600 leading-relaxed">
                  Atendimento online<br />
                  Consulte disponibilidade
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            Tem alguma dúvida? <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Não hesite em nos contatar!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContatosPage;