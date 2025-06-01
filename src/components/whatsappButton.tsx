import Link from "next/link";

const WhatsappButton = () => {
  return (
    <Link
      href="https://wa.me/5518991718500"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 group flex items-center bg-green-600 text-white rounded-full shadow-lg transition-all duration-200"
    >
      {/* Ícone */}
      <div className="p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 32 32"
          className="w-7 h-7"
        >
          <path d="M16 2.938c-7.398 0-13.406 5.656-13.406 12.625 0 2.226.625 4.348 1.812 6.25L2 30l8.5-2.781c1.781.906 3.781 1.344 5.5 1.344 7.398 0 13.406-5.656 13.406-12.625S23.398 2.938 16 2.938zM16 25.75c-1.625 0-3.25-.438-4.719-1.25l-.469-.281-5.031 1.625 1.625-4.75-.313-.5C6.344 19.375 5.75 17.563 5.75 15.563c0-5.469 4.688-9.938 10.25-9.938s10.25 4.469 10.25 9.938-4.688 9.938-10.25 9.938z" />
        </svg>
      </div>

      {/* Texto: completamente invisível até o hover */}
      <span className="w-0 opacity-0 px-0 group-hover:w-auto group-hover:opacity-100 group-hover:px-3 overflow-hidden whitespace-nowrap transition-all duration-200 text-base font-medium">
        Fale conosco!
      </span>
    </Link>
  );
};

export default WhatsappButton;
