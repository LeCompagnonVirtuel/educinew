'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, CameraOff, X } from 'lucide-react';

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError?: (error: string) => void;
  running?: boolean;
}

export default function QRScanner({ onScan, onError, running = true }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!running || started) return;

    const startScanner = async () => {
      if (!containerRef.current) return;

      try {
        const scanner = new Html5Qrcode('qr-reader');
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            onScan(decodedText);
          },
          () => {}
        );

        setStarted(true);
        setError(null);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Impossible d\'accéder à la caméra';
        setError(msg);
        onError?.(msg);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [running]);

  const handleStop = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().catch(() => {});
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setStarted(false);
  };

  if (!running) return null;

  return (
    <div className="relative">
      <div
        id="qr-reader"
        ref={containerRef}
        className="w-full rounded-xl overflow-hidden bg-black"
        style={{ minHeight: 250 }}
      />
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-white p-4 text-center rounded-xl">
          <CameraOff size={48} className="mb-4 text-red-400" />
          <p className="font-medium mb-2">{error}</p>
          <p className="text-sm text-slate-400">Vérifiez les permissions de la caméra</p>
        </div>
      )}
      {started && (
        <button
          onClick={handleStop}
          className="absolute top-2 right-2 p-2 bg-black/60 rounded-lg text-white hover:bg-black/80 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
