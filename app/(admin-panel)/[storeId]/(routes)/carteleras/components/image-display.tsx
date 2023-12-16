import { CarteleraColumn } from "./columns";
import Image from "next/image";
import ImageModal from "@/components/ui/image-modal";
import { useState } from "react";

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
      <Image
        className="cursor-pointer hover:scale-110 transition"
        width={50}
        height={50}
        alt="Image"
        src={data.imageUrl}
        onClick={() => setIsOpen(true)}
      />
    </>
  );
}

export default ImageDisplay;