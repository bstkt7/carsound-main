import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import type { PriceTagItem } from "@/types/PriceTag";

interface FileUploaderProps {
  onDataLoaded: (items: PriceTagItem[]) => void;
}

// Helper function to normalize header names for comparison
const normalizeHeader = (header: string): string => {
  return header
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')
    .replace(/[._-]/g, '');
};

// Find the index of a column by its header name
const findColumnIndex = (headers: string[], possibleNames: string[]): number => {
  for (let i = 0; i < headers.length; i++) {
    const normalizedHeader = normalizeHeader(headers[i]);
    for (const name of possibleNames) {
      if (normalizedHeader.includes(normalizeHeader(name))) {
        return i;
      }
    }
  }
  return -1; // Return -1 if column not found
};

const FileUploader = ({ onDataLoaded }: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    const isCSV = file.name.endsWith(".csv");

    if (isCSV) {
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        const lines = text.split("\n").filter((l) => l.trim());
        
        if (lines.length < 2) {
          console.error("CSV file is empty or has no data");
          return;
        }

        // Parse headers
        const headerLine = lines[0];
        const delimiter = /[;,\t]/.exec(headerLine)?.[0] || ';';
        let headers = headerLine.split(delimiter).map(h => h.trim().replace(/^"|"$/g, ""));
        
        // Find column indices
        const nameIndex = findColumnIndex(headers, ['наименование', 'название', 'name', 'product', 'товар']);
        const articleIndex = findColumnIndex(headers, ['артикул', 'article', 'sku', 'код']);
        const priceIndex = findColumnIndex(headers, ['цена', 'price', 'стоимость']);

        if (nameIndex === -1) {
          console.error("Could not find 'name' column in CSV file");
          return;
        }

        // Process data rows
        const items: PriceTagItem[] = [];
        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(delimiter).map(s => s.trim().replace(/^"|"$/g, ""));
          
          if (parts.length === 0) continue; // Skip empty rows
          
          const item: PriceTagItem = {
            id: crypto.randomUUID(),
            name: parts[nameIndex] || "",
            article: articleIndex !== -1 ? parts[articleIndex] || "" : "",
            price: priceIndex !== -1 ? parts[priceIndex] || "" : "",
          };
          
          items.push(item);
        }
        
        onDataLoaded(items);
      };
      reader.readAsText(file);
    } else {
      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        
        // Convert to JSON with headers
        const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        
        if (rows.length < 1) {
          console.error("Excel file is empty or has no data");
          return;
        }

        // Get headers from first row
        const headers: string[] = rows[0].map((h: any) => String(h || ""));
        
        // Find column indices
        const nameIndex = findColumnIndex(headers, ['наименование', 'название', 'name', 'product', 'товар']);
        const articleIndex = findColumnIndex(headers, ['артикул', 'article', 'sku', 'код']);
        const priceIndex = findColumnIndex(headers, ['цена', 'price', 'стоимость']);

        if (nameIndex === -1) {
          console.error("Could not find 'name' column in Excel file");
          return;
        }

        // Process data rows (skip header row)
        const items: PriceTagItem[] = [];
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          
          if (!row || row.length === 0) continue; // Skip empty rows
          
          const item: PriceTagItem = {
            id: crypto.randomUUID(),
            name: String(row[nameIndex] ?? ""),
            article: articleIndex !== -1 ? String(row[articleIndex] ?? "") : "",
            price: priceIndex !== -1 ? String(row[priceIndex] ?? "") : "",
          };
          
          items.push(item);
        }
        
        onDataLoaded(items);
      };
      reader.readAsArrayBuffer(file);
    }

    // Reset input
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFile}
        className="hidden"
      />
      <Button
        variant="outline"
        onClick={() => inputRef.current?.click()}
        className="gap-2"
      >
        <Upload className="h-4 w-4" />
        Загрузить CSV / Excel
      </Button>
    </div>
  );
};

export default FileUploader;
