export interface PriceTagItem {
  id: string;
  name: string;
  article: string;
  price: string;
}

export interface PriceTagSettings {
  nameFontSize: number;
  articleFontSize: number;
  priceFontSize: number;
  margin: number; // Margin in mm
  gap: number; // Gap between tags in mm
}
