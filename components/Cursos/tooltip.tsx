import { Info } from "lucide-react";

export function ToolTip() {
    return (
        <p className="group flex relative">
            <Info className="h-5 w-5 text-gray-500 cursor-pointer" />
            <span className="group-hover:opacity-100 transition-opacity bg-muted-foreground px-2 py-2 text-sm text-background rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 w-max mx-auto">Custo adicional de 500MT</span>
        </p>
    );
}
