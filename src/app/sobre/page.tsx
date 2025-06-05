"use client";
import { Target, Eye, Heart, Users, Lightbulb, Shield, Globe, Award } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Variedade",
      description: "Amplo catálogo de roupas para todos os estilos, idades e ocasiões especiais."
    },
    {
      icon: Shield,
      title: "Qualidade",
      description: "Selecionamos roupas de boa qualidade com tecidos duráveis e acabamento cuidadoso."
    },
    {
      icon: Users,
      title: "Atendimento",
      description: "Equipe atenciosa e experiente para ajudar você a encontrar a peça perfeita."
    },
    {
      icon: Lightbulb,
      title: "Preço Justo",
      description: "Roupas de qualidade com preços acessíveis que cabem no seu orçamento."
    },
    {
      icon: Globe,
      title: "Compromisso",
      description: "Comprometidos em oferecer sempre o melhor para nossos clientes e comunidade."
    }
  ];

  const stats = [
    { number: "500+", label: "Modelos Disponíveis" },
    { number: "1000+", label: "Clientes Satisfeitos" },
    { number: "5", label: "Anos no Mercado" },
    { number: "20+", label: "Marcas Parceiras" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl mb-8 shadow-2xl">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-6">
            Nossa História
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl text-gray-600 leading-relaxed mb-8">
              Somos uma loja de roupas dedicada a oferecer peças de qualidade para toda a família, com variedade, bom atendimento e preços que cabem no seu bolso.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Nossa trajetória começou com o objetivo de democratizar a moda, oferecendo roupas bonitas e de qualidade para que todos possam se vestir bem.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div className="group bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Nossa Missão</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Oferecer roupas de qualidade que combinam estilo, conforto e preço acessível, ajudando nossos clientes a se sentirem confiantes e expressarem sua personalidade através da moda.
            </p>
          </div>

          <div className="group bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Nossa Visão</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Ser a loja de roupas preferida da região, reconhecida pela variedade de produtos, qualidade das peças e excelência no atendimento ao cliente.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Os princípios que nos guiam na curadoria de cada peça e no atendimento de cada cliente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-rose-600/10 rounded-3xl p-12 text-center backdrop-blur-sm border border-white/20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Equipe</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Somos um time apaixonado por moda e estilo. Cada membro da nossa equipe é um consultor de moda dedicado a 
            encontrar as peças perfeitas para você, sempre com um sorriso e o melhor atendimento.
          </p>
          <div className="mt-8">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Heart className="w-5 h-5 mr-2" />
              Visite Nossa Loja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;