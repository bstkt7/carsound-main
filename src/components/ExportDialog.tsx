import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ExportDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onExport: (filename: string, pageRange: string) => void;
    totalPages: number;
}

const ExportDialog = ({ isOpen, onOpenChange, onExport, totalPages }: ExportDialogProps) => {
    const [filename, setFilename] = useState("ценники");
    const [pageRange, setPageRange] = useState(`1-${totalPages}`);

    const handleExport = () => {
        onExport(filename, pageRange);
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Настройки экспорта PDF</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="filename" className="text-right">
                            Имя файла
                        </Label>
                        <Input
                            id="filename"
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="pageRange" className="text-right">
                            Страницы
                        </Label>
                        <Input
                            id="pageRange"
                            value={pageRange}
                            onChange={(e) => setPageRange(e.target.value)}
                            placeholder={`например: 1-${totalPages} или 1,3,5`}
                            className="col-span-3"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground ml-[100px]">
                        Всего страниц: {totalPages}. Оставьте как есть, чтобы скачать всё.
                    </p>
                </div>
                <DialogFooter>
                    <Button onClick={handleExport}>Скачать PDF</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ExportDialog;
