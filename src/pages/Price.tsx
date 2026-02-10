import { useState } from "react";
import { FileDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";
import ItemEditor from "@/components/ItemEditor";
import PriceTagGrid from "@/components/PriceTagGrid";
import { generatePdf } from "@/lib/generatePdf";
import type { PriceTagItem, PriceTagSettings } from "@/types/PriceTag";

const DEMO_ITEMS: PriceTagItem[] = [
  { id: "1", name: "Молоко 3.2% 1л", article: "МЛК-001", price: "89" },
  { id: "2", name: "Хлеб белый нарезной", article: "ХЛБ-042", price: "52" },
  { id: "3", name: "Сыр Российский 300г", article: "СЫР-105", price: "349" },
];

const DEFAULT_SETTINGS: PriceTagSettings = {
  nameFontSize: 16,
  articleFontSize: 12,
  priceFontSize: 24,
  margin: 2,
  gap: 1,
};

const Index = () => {
  const [items, setItems] = useState<PriceTagItem[]>(DEMO_ITEMS);
  const [page, setPage] = useState(0);
  const [settings, setSettings] = useState<PriceTagSettings>(DEFAULT_SETTINGS);
  const [generating, setGenerating] = useState(false);

  // Calculate how many tags can fit per row and column based on fixed size and available space
  const availableWidth = 297 - (settings.margin * 2); // A4 width minus margins
  const availableHeight = 210 - (settings.margin * 2); // A4 height minus margins
  
  // Calculate max possible columns and rows based on fixed tag size and gap
  const maxCols = Math.floor(availableWidth / (60 + settings.gap));
  const maxRows = Math.floor(availableHeight / (40 + settings.gap));
  
  // Calculate the maximum number of tags that can physically fit
  const effectiveTagsPerSheet = maxCols * maxRows;
  
  const totalPages = Math.max(1, Math.ceil(items.length / effectiveTagsPerSheet));

  const handleDataLoaded = (newItems: PriceTagItem[]) => {
    setItems(newItems);
    setPage(0);
  };

  const handleSettingChange = (key: keyof PriceTagSettings, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = async () => {
    setGenerating(true);
    try {
      const ids = Array.from({ length: totalPages }, (_, i) => `pdf-page-${i}`);
      await generatePdf(ids);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Генератор ценников
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          A4 альбомный · 3×3 сетка · PDF экспорт
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* Left panel — editor and settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <FileUploader onDataLoaded={handleDataLoaded} />
            <Button onClick={handleExport} disabled={generating} className="gap-2">
              <FileDown className="h-4 w-4" />
              {generating ? "Генерация..." : "Скачать PDF"}
            </Button>
          </div>

          {/* Settings Panel */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-3">Настройки</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="nameFontSize" className="text-xs">Размер шрифта названия</Label>
                <Input
                  id="nameFontSize"
                  type="number"
                  value={settings.nameFontSize}
                  onChange={(e) => handleSettingChange('nameFontSize', Number(e.target.value))}
                  className="h-8 text-sm mt-1"
                />
              </div>
              <div>
                <Label htmlFor="articleFontSize" className="text-xs">Размер шрифта артикула</Label>
                <Input
                  id="articleFontSize"
                  type="number"
                  value={settings.articleFontSize}
                  onChange={(e) => handleSettingChange('articleFontSize', Number(e.target.value))}
                  className="h-8 text-sm mt-1"
                />
              </div>
              <div>
                <Label htmlFor="priceFontSize" className="text-xs">Размер шрифта цены</Label>
                <Input
                  id="priceFontSize"
                  type="number"
                  value={settings.priceFontSize}
                  onChange={(e) => handleSettingChange('priceFontSize', Number(e.target.value))}
                  className="h-8 text-sm mt-1"
                />
              </div>
              <div>
                <Label htmlFor="margin" className="text-xs">Отступы (мм)</Label>
                <Input
                  id="margin"
                  type="number"
                  value={settings.margin}
                  onChange={(e) => handleSettingChange('margin', Number(e.target.value))}
                  className="h-8 text-sm mt-1"
                />
              </div>
              <div>
                <Label htmlFor="gap" className="text-xs">Расстояние (мм)</Label>
                <Input
                  id="gap"
                  type="number"
                  value={settings.gap}
                  onChange={(e) => handleSettingChange('gap', Number(e.target.value))}
                  className="h-8 text-sm mt-1"
                />
              </div>
              <div className="col-span-2">
                <div className="text-xs text-muted-foreground mt-2">
                  Автоматически: {maxCols}×{maxRows} = {effectiveTagsPerSheet} ценников на листе
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <ItemEditor items={items} onChange={setItems} />
          </div>

          <p className="text-xs text-muted-foreground">
            Всего: {items.length} ценник(ов) · {totalPages} стр. · {maxCols}×{maxRows} на листе
          </p>
        </div>

        {/* Right panel — preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Предпросмотр · стр. {page + 1} / {totalPages}
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Visible preview of current page */}
          <div
            className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
            style={{ aspectRatio: "297 / 210" }}
          >
            <div className="scale-75 origin-top-left w-[297mm] h-[210mm]">
              <PriceTagGrid items={items} page={page} settings={settings} />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden pages for PDF rendering */}
      <div className="fixed left-[-9999px] top-0" aria-hidden="true">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            id={`pdf-page-${i}`}
            style={{ width: "297mm", height: "210mm", background: "white" }}
          >
            <PriceTagGrid items={items} page={i} settings={settings} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
