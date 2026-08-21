'use client';

export default function AuthSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="space-y-2">
        <div className="h-3 w-24 bg-slate-200 rounded" />
        <div className="h-12 w-full bg-slate-100 rounded-xl" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-20 bg-slate-200 rounded" />
        <div className="h-12 w-full bg-slate-100 rounded-xl" />
      </div>
      <div className="h-12 w-full bg-slate-100 rounded-xl" />
    </div>
  );
}
