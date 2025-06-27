import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props{
    content: React.ReactNode | string;
    trigger: React.ReactNode | string;
}
function NameTooltip({trigger,content}:Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="text-start">{trigger}...</TooltipTrigger>
        <TooltipContent className="max-w-72 text-muted-foreground text-sm">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default NameTooltip;
