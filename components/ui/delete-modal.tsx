"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}


const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading

}) => {

  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ¿Estás seguro/a?
          </DialogTitle>
          <DialogDescription>
            Esta acción no puede revertirse
          </DialogDescription>
        </DialogHeader>
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button disabled={loading} variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal;