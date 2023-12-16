import { CarteleraColumn } from "./columns";
import Image from "next/image";
import ImageModal from "@/components/ui/image-modal";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


interface ImageDisplayProps {
  data: CarteleraColumn;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  data
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ImageModal
        imageUrl={data.imageUrl}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Image
              className="cursor-pointer hover:scale-110 transition"
              width={50}
              height={50}
              alt="Image"
              src={data.imageUrl}
              onClick={() => setIsOpen(true)}
            />
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={10}>
            <p>Expandir</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>


    </>
  );
}

export default ImageDisplay;