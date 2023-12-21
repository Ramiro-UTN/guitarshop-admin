"use client";

import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { FileAudio, Trash } from "lucide-react";

interface AudioUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const AudioUpload: React.FC<AudioUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // const onUpload = (result: any) => {
  //   onChange(result.info.secure_url)
  // }
  const validateUrl = (url: string) => {
    url.search(/\.(?:wav|mp3)$/i) !== -1 ? onChange(url) : onRemove(url);
  }
  return (
    <div>

      <div className="flex gap-4 items-center mb-4">

        {value.map((url) => (

          <div key={url} className="flex gap-4 items-center h-10 overflow-hidden">
            <audio controls src={url}></audio>
            <Button type="button" onClick={() => onRemove(url)} size="icon" variant="destructive">
              <Trash className="h-4 w-4" />
            </Button>
          </div>



        ))}
      </div>
      <CldUploadWidget
        uploadPreset="uyq3zuak"
        options={{ maxFiles: 1 }}
        onSuccess={(result: any, { widget }) => {
          validateUrl(result.info.secure_url);
          widget.close();
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          }

          return (
            <Button
              onClick={onClick}
              variant="secondary"
              type="button"
              disabled={disabled}
            >
              <FileAudio className="h-4 w-4 mr-2" />
              Subir Audio
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default AudioUpload;