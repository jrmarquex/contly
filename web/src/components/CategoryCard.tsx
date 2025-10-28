import Link from "next/link";
import Image from "next/image";

const categoryImages: { [key: string]: string } = {
  "Meta Ads": "/images/meta_ads.png",
  "TikTok Ads": "/images/tiktok_ads.png", 
  "Google Ads": "/images/google_ads.png",
  "Proxys": "/images/proxy.png",
  "Variados": "/images/logo.png" // Usando logo.png para Variados
};

export function CategoryCard({ name, slug }: { name: string; slug: string }) {
  const imageUrl = categoryImages[name] || "/images/logo.png"; // Fallback para logo.png
  
  return (
    <Link href={`/categorias/${slug}`} className="group block mx-4">
      <div className="relative">
        {/* The IMAGE IS the button - 200x300 */}
        <div className="relative w-[200px] h-[300px] mx-auto">
          {/* Golden glow effect around the image */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Top glow */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-full h-10 bg-gradient-to-b from-[#FFD700]/40 via-[#FFD700]/20 to-transparent blur-sm"></div>
            {/* Side glows */}
            <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-5 h-full bg-gradient-to-r from-[#FFD700]/30 to-transparent blur-sm"></div>
            <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-5 h-full bg-gradient-to-l from-[#FFD700]/30 to-transparent blur-sm"></div>
            {/* Bottom glow */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-full h-10 bg-gradient-to-t from-[#FFD700]/40 via-[#FFD700]/20 to-transparent blur-sm"></div>
          </div>
          
          <Image 
            src={imageUrl} 
            alt={`${name} icon`}
            width={200}
            height={300}
            className="object-contain rounded-lg relative z-10 group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            loading="lazy"
            unoptimized={false}
          />
          
          {/* Text overlay at the bottom of the image */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col justify-end items-center text-center pb-4">
            <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg">
              {name}
            </h3>
            <p className="text-white text-base drop-shadow-lg">
              Ver produtos
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}