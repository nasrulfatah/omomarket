"use client";

import { useCallback, useState } from "react";
import InstallPrompt from "@/components/InstallPrompt";
import WhatsAppChannelPopup from "@/components/WhatsAppChannelPopup";

// Hanya satu popup yang tampil. Popup Channel WhatsApp diprioritaskan,
// banner install baru muncul setelah popup WhatsApp tidak aktif.
export default function StickyPopups() {
  const [waOpen, setWaOpen] = useState(false);
  const handleWaOpenChange = useCallback((open: boolean) => setWaOpen(open), []);

  return (
    <>
      <WhatsAppChannelPopup onOpenChange={handleWaOpenChange} />
      <InstallPrompt hidden={waOpen} />
    </>
  );
}
