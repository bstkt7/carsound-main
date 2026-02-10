import { Phone, MapPin, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SERVICES = [
  "Шумоизоляция",
  "Сигнализация",
  "Магнитолы",
  "Усилители",
  "Сабвуферы",
  "Акустика",
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
      {/* Wave фон */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/wave.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Машина */}
      <div className="absolute bottom-0 right-0 z-[1] hidden lg:block">
        <img
          src="/car.png"
          alt="Car"
          className="w-[48rem] xl:w-[60rem] opacity-80"
        />
      </div>

      {/* HERO */}
      <section className="relative z-10 min-h-[92vh] flex flex-col">
        <div className="container mx-auto px-5 lg:px-12 py-6 flex-1 flex flex-col">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <img src="/logo.svg" alt="CarSound" className="h-16 lg:h-28" />

            <div className="hidden lg:flex items-center gap-4">
              <Link to="/price">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-black bg-transparent text-black font-bold px-8 py-7 rounded-full hover:bg-black hover:text-[#ffcc00] transition"
                >
                  Ценники
                </Button>
              </Link>
              <a href="tel:89091797555">
                <Button
                  size="lg"
                  className="bg-black text-white font-bold px-16 py-7 rounded-full hover:scale-105 transition"
                >
                  Позвонить
                </Button>
              </a>
            </div>

            <div className="hidden lg:flex flex-col text-right gap-2">
              <a
                href="tel:89091797555"
                className="flex justify-end gap-2 font-bold"
              >
                <Phone className="h-5 w-5" />
                8 (909) 179-75-55
              </a>
              <div className="flex justify-end gap-2 text-black/80">
                <MapPin className="h-5 w-5" />
                г. Куртамыш, Октябрьская 34а
              </div>
            </div>
          </div>



          {/* SERVICES DESKTOP */}
          <div className="hidden lg:flex flex-1 items-center">
            <div className="flex flex-col gap-4">
              {SERVICES.map((s) => (
                <div
                  key={s}
                  className="text-2xl font-black uppercase hover:opacity-70 cursor-default"
                >
                  {s}
                </div>
              ))}
              <Link to="/price" className="group">
                <div className="text-2xl font-black uppercase text-black flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Ценники <Calculator className="h-6 w-6" />
                </div>
              </Link>
            </div>
          </div>

          {/* SERVICES MOBILE */}
          <div className="lg:hidden grid grid-cols-2 gap-3 mt-8">
            {SERVICES.map((s) => (
              <div
                key={s}
                className="bg-black/10 rounded-2xl py-4 text-center font-black uppercase text-sm"
              >
                {s}
              </div>
            ))}
          </div>

          {/* MOBILE CAR */}
          <div className="lg:hidden mt-10">
            <img
              src="/car.png"
              alt="Car"
              className="w-full opacity-90"
            />
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="bg-black py-5 lg:py-6 relative z-40 mb-28 lg:mb-0">
        <div className="overflow-hidden">
          <div className="flex animate-marquee">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
              <div
                key={i}
                className="mx-12 flex items-center flex-shrink-0"
              >
                <img
                  src={brand.file}
                  alt={brand.name}
                  className="h-10 opacity-40 brightness-0 invert hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIXED MOBILE CALL BUTTON */}
      <a
        href="tel:89091797555"
        className="lg:hidden fixed bottom-4 left-4 right-4 z-50"
      >
        <Button className="w-full bg-black text-white font-bold py-6 rounded-full shadow-2xl text-lg">
          Позвонить
        </Button>
      </a>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Index;
