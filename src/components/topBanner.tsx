"use client";

const TopBanner = () => {
  const frase = "Pedido mínimo R$300,00 ou 10 peças.";

  return (
    <div className="w-full bg-black overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee items-center">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center py-2 text-xs font-medium text-white uppercase"
          >
            <span>{frase}</span>
            {i < 11 && <span className="mx-2">|</span>}
            <span>{frase}</span>
            {i < 11 && <span className="mx-2">|</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBanner;
