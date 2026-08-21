'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';

interface LogoUploadProps {
  currentUrl: string | null;
  onUpload: (file: File) => Promise<string | null>;
  label?: string;
  accept?: string;
  maxSizeKB?: number;
  aspectRatio?: string;
  className?: string;
}

async function resizeImage(file: File, maxWidth: number, maxHeight: number, quality: number = 0.9): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        resolve(blob!);
      }, 'image/png', quality);
    };
    img.src = url;
  });
}

async function createFavicon(file: File): Promise<Blob> {
  return resizeImage(file, 64, 64, 0.9);
}

async function createIcon(file: File): Promise<Blob> {
  return resizeImage(file, 192, 192, 0.9);
}

export default function LogoUpload({
  currentUrl,
  onUpload,
  label = 'Logo',
  accept = 'image/png,image/jpeg,image/svg+xml,image/webp',
  maxSizeKB = 2048,
  className = '',
}: LogoUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setSuccess(false);

    if (file.size > maxSizeKB * 1024) {
      setError(`Fichier trop volumineux (max ${maxSizeKB}KB)`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Format non supporté');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const url = await onUpload(file);
      if (url) {
        setPreview(url);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (err: any) {
      setError(err.message || "Erreur d'upload");
    } finally {
      setUploading(false);
    }
  }, [onUpload, maxSizeKB]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{label}</label>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden ${
          dragOver
            ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
            : preview
              ? 'border-slate-200 dark:border-slate-600 hover:border-indigo-300'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {preview ? (
          <div className="relative p-6 flex items-center justify-center bg-white dark:bg-slate-800 min-h-[140px]">
            <Image
              src={preview}
              alt={label}
              width={96}
              height={96}
              unoptimized
              className="max-h-24 max-w-full object-contain"
            />
            {uploading && (
              <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 flex items-center justify-center">
                <Loader2 size={24} className="animate-spin text-indigo-500" />
              </div>
            )}
            {success && (
              <div className="absolute top-3 right-3 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="px-3 py-1.5 bg-white/90 dark:bg-slate-800/90 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 shadow-lg">
                Changer le logo
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-3 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
              <ImageIcon size={24} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Glissez-déposez ou cliquez
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              PNG, SVG, JPG, WebP — Max {maxSizeKB}KB
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
          <X size={12} /> {error}
        </p>
      )}
    </div>
  );
}

export { resizeImage, createFavicon, createIcon };
