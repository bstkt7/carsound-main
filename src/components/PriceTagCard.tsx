import type { PriceTagItem, PriceTagSettings } from "@/types/PriceTag";

interface PriceTagCardProps {
  item: PriceTagItem;
  settings: PriceTagSettings;
}

const PriceTagCard = ({ item, settings }: PriceTagCardProps) => {
  // Calculate dynamic name font size based on text length and user setting
  const nameLen = item.name.length;
  let calculatedNameSize = settings.nameFontSize;
  if (nameLen > 60) calculatedNameSize = Math.max(8, settings.nameFontSize * 0.5);
  else if (nameLen > 40) calculatedNameSize = Math.max(10, settings.nameFontSize * 0.7);
  else if (nameLen > 25) calculatedNameSize = Math.max(12, settings.nameFontSize * 0.85);

  return (
    <div
      className="flex flex-col justify-between border-2 border-tag-border bg-tag p-2 w-full h-full overflow-hidden box-border relative"
      style={{ width: '60mm', height: '40mm' }}
    >
      {/* Name - from second column, bigger and black */}
      <div className="flex-1 flex items-start min-h-0 overflow-hidden">
        <span
          className="text-black break-words w-full font-semibold"
          style={{ fontSize: `${calculatedNameSize}px`, lineHeight: 'normal' }}
        >
          {item.name || "—"}
        </span>
      </div>

      {/* Article - from first column, smaller and gray */}
      <div
        className="text-muted-foreground mt-1 break-words"
        style={{ fontSize: `${settings.articleFontSize}px` }}
      >
        арт. {item.article || "—"}
      </div>

      {/* Price - from third column, bigger, bolder, black color */}
      <div
        className="font-bold font-mono text-black mt-1 text-right"
        style={{ fontSize: `${settings.priceFontSize}px` }}
      >
        {item.price ? `${item.price} ₽` : "—"}
      </div>

      {/* Logo as background watermark - bottom left area */}
      <div className="absolute bottom-1 left-2 pointer-events-none opacity-20 z-0">
        <img
          src="/logo.svg"
          alt="CarSound Logo"
          className="object-contain"
          style={{ width: '25mm', height: '12mm' }}
        />
      </div>
    </div>
  );
};

export default PriceTagCard;
