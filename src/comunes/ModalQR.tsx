// components/ModalQR.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";

interface ModalQRProps {
  open: boolean;
  onClose: () => void;
  idInvitado: string;
}

export const ModalQR = ({ open, onClose, idInvitado }: ModalQRProps) => {
  const url = `http://localhost:5173/invitacion/${idInvitado}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center gap-4">
        <DialogHeader>
          <DialogTitle>Código QR</DialogTitle>
        </DialogHeader>
        <QRCodeCanvas value={url} size={256} />
        <p className="text-sm text-muted-foreground break-all">{url}</p>
      </DialogContent>
    </Dialog>
  );
};
