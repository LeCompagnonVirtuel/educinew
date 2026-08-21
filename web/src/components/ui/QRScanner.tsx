'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Camera, CameraOff, Loader2, RefreshCw, X, ScanLine, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
  active?: boolean;
  className?: string;
}

type ScannerState = 'idle' | 'requesting' | 'scanning' | 'error' | 'no-camera' | 'permission-denied';

export default function QRScanner({ onScan, onError, active = false, className }: QRScannerProps) {
  const [state, setState] = useState<ScannerState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const scannerRef = useRef<any>(null);
  const containerIdRef = useRef(`qr-scanner-${Math.random().toString(36).slice(2, 8)}`);
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  const stopScanner = useCallback(async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch {}
    setState('idle');
  }, []);

  const startScanner = useCallback(async () => {
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setState('no-camera');
      setErrorMsg('Caméra non disponible sur ce navigateur');
      onError?.('Caméra non disponible');
      return;
    }

    setState('requesting');
    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      const scanner = new Html5Qrcode(containerIdRef.current);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          disableFlip: false,
        },
        (decodedText: string) => {
          onScanRef.current(decodedText);
          stopScanner();
        },
        () => {}
      );
      setState('scanning');
    } catch (err: any) {
      const msg = err?.message || '';
      if (msg.includes('NotAllowedError') || msg.includes('Permission')) {
        setState('permission-denied');
        setErrorMsg('Autorisation caméra refusée. Veuillez autoriser l\'accès dans les paramètres du navigateur.');
      } else if (msg.includes('NotFoundError') || msg.includes('No camera')) {
        setState('no-camera');
        setErrorMsg('Aucune caméra détectée sur cet appareil.');
      } else {
        setState('error');
        setErrorMsg('Erreur lors de l\'accès à la caméra. Utilisez la saisie manuelle.');
      }
      onError?.(msg || 'Erreur caméra');
    }
  }, [stopScanner, onError]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (active && state === 'idle') {
      startScanner();
    }
    return () => { stopScanner(); };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn('relative', className)}>
      {/* Scanner container */}
      <div
        id={containerIdRef.current}
        className={cn(
          'w-full rounded-xl overflow-hidden bg-black',
          state === 'scanning' ? 'block' : 'hidden'
        )}
        style={{ minHeight: 280 }}
      />

      {/* Scanning overlay */}
      {state === 'scanning' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[250px] h-[250px] relative">
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/80 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/80 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/80 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/80 rounded-br-lg" />
            {/* Scan line animation */}
            <div className="absolute left-2 right-2 h-0.5 bg-emerald-400/80 animate-[scanLine_2s_ease-in-out_infinite]" />
          </div>
        </div>
      )}

      {/* Idle state — start button */}
      {state === 'idle' && (
        <button
          onClick={startScanner}
          className="w-full py-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-3 text-slate-700 font-medium transition-colors"
        >
          <Camera size={20} />
          Activer la caméra
        </button>
      )}

      {/* Requesting permission */}
      {state === 'requesting' && (
        <div className="w-full py-8 rounded-xl border border-slate-200 bg-white flex flex-col items-center gap-3">
          <Loader2 size={24} className="animate-spin text-slate-400" />
          <p className="text-sm text-slate-500">Accès à la caméra...</p>
        </div>
      )}

      {/* Error states */}
      {(state === 'no-camera' || state === 'permission-denied' || state === 'error') && (
        <div className="w-full py-6 px-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center gap-3 text-center">
          <div className="p-2 rounded-lg bg-slate-100">
            {state === 'permission-denied' ? <CameraOff size={24} className="text-slate-500" /> : <AlertCircle size={24} className="text-slate-500" />}
          </div>
          <p className="text-sm text-slate-600">{errorMsg}</p>
          <div className="flex gap-2">
            {state === 'permission-denied' && (
              <button
                onClick={startScanner}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                <RefreshCw size={14} className="inline mr-1.5" />
                Réessayer
              </button>
            )}
            {state === 'error' && (
              <button
                onClick={startScanner}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                <RefreshCw size={14} className="inline mr-1.5" />
                Réessayer
              </button>
            )}
          </div>
        </div>
      )}

      {/* Stop button when scanning */}
      {state === 'scanning' && (
        <button
          onClick={stopScanner}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium hover:bg-black/70 transition-colors"
        >
          <X size={12} className="inline mr-1" />
          Fermer
        </button>
      )}

      {/* CSS for scan line animation */}
      <style jsx global>{`
        @keyframes scanLine {
          0%, 100% { top: 8px; }
          50% { top: calc(100% - 8px); }
        }
      `}</style>
    </div>
  );
}
