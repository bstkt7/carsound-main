import type { PriceTagItem, PriceTagSettings } from "@/types/PriceTag";
import PriceTagCard from "./PriceTagCard";

interface PriceTagGridProps {
  items: PriceTagItem[];
  page: number; // 0-indexed
  settings: PriceTagSettings;
}

const PriceTagGrid = ({ items, page, settings }: PriceTagGridProps) => {
  // Calculate how many tags can fit per row and column based on fixed size and available space
  const availableWidth = 297 - (settings.margin * 2); // A4 width minus margins
  const availableHeight = 210 - (settings.margin * 2); // A4 height minus margins
  
  // Calculate max possible columns and rows based on fixed tag size and gap
  const maxCols = Math.floor(availableWidth / (60 + settings.gap));
  const maxRows = Math.floor(availableHeight / (40 + settings.gap));
  
  // Calculate the maximum number of tags that can physically fit
  const maxPossibleTags = maxCols * maxRows;
  
  // Use the maximum possible tags instead of user's request (since we're auto-calculating)
  const effectiveTagsPerSheet = maxPossibleTags;
  
  // Calculate actual grid dimensions
  const cols = maxCols;
  const rows = maxRows;

  const pageItems = items.slice(page * effectiveTagsPerSheet, page * effectiveTagsPerSheet + effectiveTagsPerSheet);

  // Fill remaining slots with empty cards
  const slots: (PriceTagItem | null)[] = [...pageItems];
  while (slots.length < effectiveTagsPerSheet) slots.push(null);

  // Calculate centering offsets
  const totalGridWidth = cols * 60 + (cols - 1) * settings.gap;
  const totalGridHeight = rows * 40 + (rows - 1) * settings.gap;
  const horizontalOffset = (availableWidth - totalGridWidth) / 2;
  const verticalOffset = (availableHeight - totalGridHeight) / 2;

  return (
    <div 
      className="w-[297mm] h-[210mm] relative box-border" 
      style={{ padding: `${settings.margin}mm` }}
    >
      <div 
        className="w-full h-full relative"
        style={{ 
          paddingTop: `${verticalOffset}mm`,
          paddingLeft: `${horizontalOffset}mm`
        }}
      >
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${cols}, ${60}mm)`,
            gridTemplateRows: `repeat(${rows}, ${40}mm)`,
            gap: `${settings.gap}mm`
          }}
        >
          {slots.map((item, i) => (
            <div
              key={item?.id ?? `empty-${i}`}
              className="relative border border-border w-full h-full"
              style={{ width: '60mm', height: '40mm' }}
            >
              {item ? (
                <PriceTagCard item={item} settings={settings} />
              ) : (
                <div className="w-full h-full bg-tag opacity-30" />
              )}

              {/* Cut marks - only show between cells */}
              {i % cols !== cols - 1 && ( // Vertical cut marks (between columns)
                <div
                  className="absolute top-0 bottom-0 w-[0.5px] bg-gray-400 z-10"
                  style={{ right: '-0.5px' }}
                />
              )}
              {i < (rows * cols) - cols && ( // Horizontal cut marks (between rows)
                <div
                  className="absolute left-0 right-0 h-[0.5px] bg-gray-400 z-10"
                  style={{ bottom: '-0.5px' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Outer border for the entire grid */}
      <div 
        className="absolute pointer-events-none" 
        style={{ 
          top: `${settings.margin}mm`, 
          left: `${settings.margin}mm`, 
          right: `${settings.margin}mm`, 
          bottom: `${settings.margin}mm`, 
          border: '2px solid black' 
        }}
      ></div>
    </div>
  );
};

export default PriceTagGrid;
