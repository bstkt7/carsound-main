import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PriceTagItem } from "@/types/PriceTag";

interface ItemEditorProps {
  items: PriceTagItem[];
  onChange: (items: PriceTagItem[]) => void;
}

const ItemEditor = ({ items, onChange }: ItemEditorProps) => {
  const addItem = () => {
    onChange([
      ...items,
      { id: crypto.randomUUID(), name: "", article: "", price: "" },
    ]);
  };

  const updateItem = (id: string, field: keyof Omit<PriceTagItem, "id">, value: string) => {
    onChange(items.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const removeItem = (id: string) => {
    onChange(items.filter((it) => it.id !== id));
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_120px_100px_36px] gap-2 text-xs font-medium text-muted-foreground px-1">
        <span>Наименование</span>
        <span>Артикул</span>
        <span>Цена</span>
        <span />
      </div>
      <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_120px_100px_36px] gap-2 items-center"
          >
            <Input
              value={item.name}
              onChange={(e) => updateItem(item.id, "name", e.target.value)}
              placeholder="Название"
              className="h-8 text-sm"
            />
            <Input
              value={item.article}
              onChange={(e) => updateItem(item.id, "article", e.target.value)}
              placeholder="Артикул"
              className="h-8 text-sm"
            />
            <Input
              value={item.price}
              onChange={(e) => updateItem(item.id, "price", e.target.value)}
              placeholder="Цена"
              className="h-8 text-sm"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={addItem} className="gap-1.5">
        <Plus className="h-3.5 w-3.5" />
        Добавить
      </Button>
    </div>
  );
};

export default ItemEditor;
