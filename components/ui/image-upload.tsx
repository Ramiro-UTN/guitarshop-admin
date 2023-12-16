"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) return null;

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }


  return (
    <div>
      <div className="flex gap-4 items-center mb-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url)} size="icon" variant="destructive">
              <Trash className="h-4 w-4" />
              </Button>
            </div>
            
            <Image 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="uyq3zuak" >
        {({open}) => {
          const onClick = () => {
            open();
          }
          
          return(
            <Button
              onClick={onClick}
              variant="secondary" 
              type="button"
              disabled={disabled} 
            >
              <ImagePlus className="h-4 w-4 mr-2"/>
              Subir Imagen
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload;