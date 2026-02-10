import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES = [
  "Шумоизоляция",
  "Сигнализация", 
  "Магнитолы",
  "Усилители",
  "Сабвуферы",
  "Акустика"
];

const BRAND_LOGOS = [
  { name: "Avatar", file: "/avatar.svg" },
  { name: "Alpine", file: "/alpine.svg" },
  { name: "Alphard", file: "/alphard.svg" },
  { name: "DB", file: "/db.svg" },
  { name: "Hannibal", file: "/hannibal.svg" },
  { name: "JBL", file: "/jbl.svg" },
  { name: "Machete", file: "/machete.svg" },
  { name: "Ural", file: "/ural.svg" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#ffcc00] overflow-hidden relative">
      {/* Wave фон - без прозрачности */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: "url(/wave.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Машина на фоне */}
      <div className="absolute bottom-0 right-0 z-[1] hidden lg:block">
        <img 
          src="/car.png" 
          alt="Car" 
          className="w-[48rem] xl:w-[60rem] h-auto object-contain opacity-80"
        />
      </div>

      {/* Hero секция */}
      <section className="relative z-10 min-h-[92vh] flex flex-col">
        <div className="container mx-auto px-6 lg:px-12 py-8 flex-1 flex flex-col">
          {/* Верхняя строка: Лого слева, Кнопка по центру, Контакты справа */}
          <div className="flex justify-between items-center mb-12">
            {/* Лого */}
            <img src="/logo.svg" alt="CarSound" className="h-20 lg:h-28 w-auto" />
            
            {/* Кнопка по центру */}
            <a href="tel:89091797555">
              <Button 
                size="lg" 
                className="bg-black text-white hover:bg-black/80 font-bold text-base lg:text-xl px-8 lg:px-16 py-5 lg:py-7 rounded-full transition-all hover:scale-105 shadow-xl"
              >
                Позвонить
              </Button>
            </a>

            {/* Контакты */}
            <div className="flex flex-col gap-2 text-right">
              <a 
                href="tel:89091797555" 
                className="flex items-center justify-end gap-2 text-black font-bold text-base lg:text-lg hover:opacity-60 transition-opacity"
              >
                <Phone className="h-4 w-4 lg:h-5 lg:w-5" />
                <span>8 (909) 179-75-55</span>
              </a>
              <div className="flex items-center justify-end gap-2 text-black/80 font-medium text-sm lg:text-base">
                <MapPin className="h-4 w-4 lg:h-5 lg:w-5" />
                <span>г. Куртамыш, Ул. Октябрьская 34а</span>
              </div>
            </div>
          </div>

          {/* Центральная часть - только услуги */}
          <div className="flex-1 flex items-center justify-start">
            <div className="hidden lg:flex flex-col gap-4">
              {SERVICES.map((service, index) => (
                <div 
                  key={index} 
                  className="text-black font-black text-2xl uppercase tracking-tight hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Услуги для мобильной версии */}
          <div className="lg:hidden grid grid-cols-2 gap-3 mt-8">
            {SERVICES.map((service, index) => (
              <div 
                key={index} 
                className="bg-black/5 backdrop-blur-sm rounded-xl py-3 px-4 text-center"
              >
                <span 
                  className="text-black font-black text-sm uppercase"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Черная секция с брендами */}
      <section className="bg-black py-5 lg:py-6 relative z-20">
        <div className="overflow-hidden">
          <div className="flex animate-marquee">
            {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="mx-10 lg:mx-16 flex items-center justify-center flex-shrink-0">
                <img 
                  src={brand.file} 
                  alt={brand.name} 
                  className="h-10 lg:h-12 w-auto opacity-40 hover:opacity-100 transition-opacity brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: flex;
        }
      `}</style>
    </div>
  );
};

export default Index;