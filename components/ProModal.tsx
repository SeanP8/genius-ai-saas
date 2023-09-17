"use client";

import axios from "axios";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { tools } from "@/constants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div>
              upgrade to Genius
              <Badge>pro</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
