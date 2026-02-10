import { Link } from "react-router-dom";
import { Volume2, Radio, Shield, Speaker, Music, Headphones, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES = [
  { icon: Shield, title: "Шумоизоляция", desc: "Профессиональная шумо- и виброизоляция автомобиля" },
  { icon: Radio, title: "Сигнализация", desc: "Установка охранных систем и автозапуска" },
  { icon: Music, title: "Магнитолы", desc: "Штатные и мультимедийные головные устройства" },
  { icon: Volume2, title: "Усилители", desc: "Моно, двух- и четырёхканальные усилители" },
  { icon: Speaker, title: "Сабвуферы", desc: "Активные и пассивные сабвуферы любых форматов" },
  { icon: Headphones, title: "Акустика", desc: "Компонентная и коаксиальная акустика" },
];

const BRANDS = [
  "Machete", "Ural Sound", "DD Audio", "Avatar",
  "Alphard Group", "JBL", "Alpine", "Hannibal",
];

const SCHEDULE = [
  { days: "ПН – ПТ", hours: "10:00 – 18:00" },
  { days: "СБ", hours: "10:00 – 15:00" },
  { days: "ВС", hours: "Выходной" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-carsound-dark/95 backdrop-blur border-b border-carsound-yellow/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
          <Link to="/" className="flex items-center gap-2">
            <Volume2 className="h-7 w-7 text-carsound-yellow" />
            <span className="text-2xl font-black tracking-tight text-white">
              Car<span className="text-carsound-yellow">Sound</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/price">
              <Button variant="outline" className="border-carsound-yellow/50 text-carsound-yellow hover:bg-carsound-yellow hover:text-carsound-dark font-semibold">
                Генератор ценников
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative bg-carsound-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-carsound-yellow/20 via-transparent to-carsound-dark" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(45, 100%, 50%) 0%, transparent 50%), radial-gradient(circle at 80% 30%, hsl(45, 100%, 50%) 0%, transparent 40%)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black leading-none mb-6">
              <span className="text-white">Car</span>
              <span className="text-carsound-yellow">Sound</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium mb-4">
              Магазин автозвука и аксессуаров
            </p>
            <ul className="text-lg text-carsound-yellow font-bold space-y-1 mb-8">
              {["Шумоизоляция", "Сигнализация", "Магнитолы", "Усилители", "Сабвуферы", "Акустика"].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-carsound-yellow inline-block" />
                  {s}
                </li>
              ))}
            </ul>
            <a href="tel:+70001234567">
              <Button size="lg" className="bg-carsound-yellow text-carsound-dark hover:bg-carsound-yellow/90 font-bold text-lg px-8">
                <Phone className="h-5 w-5 mr-2" /> Позвонить
              </Button>
            </a>
          </div>

          {/* Schedule card */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block bg-carsound-dark/80 border border-carsound-yellow/30 rounded-xl p-6 backdrop-blur">
            <h3 className="text-carsound-yellow font-bold text-lg mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" /> График работы
            </h3>
            <div className="space-y-2">
              {SCHEDULE.map((s) => (
                <div key={s.days} className="flex justify-between gap-6 text-sm">
                  <span className="text-gray-400 font-semibold">{s.days}</span>
                  <span className="text-white font-bold">{s.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Наши <span className="text-carsound-yellow">услуги</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="group bg-card border border-border rounded-xl p-6 hover:border-carsound-yellow/50 transition-colors"
              >
                <svc.icon className="h-10 w-10 text-carsound-yellow mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{svc.title}</h3>
                <p className="text-muted-foreground text-sm">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-16 bg-carsound-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-10">
            Бренды
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BRANDS.map((brand) => (
              <div
                key={brand}
                className="bg-carsound-dark border border-carsound-yellow/20 rounded-lg py-5 flex items-center justify-center hover:border-carsound-yellow/60 transition-colors"
              >
                <span className="text-white font-bold text-lg tracking-wide">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE (mobile) */}
      <section className="py-12 bg-background lg:hidden">
        <div className="max-w-md mx-auto px-4">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Clock className="h-6 w-6 text-carsound-yellow" /> График работы
          </h2>
          <div className="space-y-3">
            {SCHEDULE.map((s) => (
              <div key={s.days} className="flex justify-between border-b border-border pb-2">
                <span className="font-semibold">{s.days}</span>
                <span className="font-bold">{s.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Контакты</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-carsound-yellow" /> +7 (000) 123-45-67
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-carsound-yellow" /> г. Город, ул. Улица, д. 1
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-carsound-dark text-gray-500 text-center py-6 text-sm">
        © {new Date().getFullYear()} CarSound — Магазин автозвука
      </footer>
    </div>
  );
};

export default Index;
