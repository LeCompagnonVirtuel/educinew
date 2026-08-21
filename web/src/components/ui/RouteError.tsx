import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface RouteErrorProps {
  title?: string;
  description?: string;
  reset?: () => void;
  error?: Error & { digest?: string };
}

export default function RouteError({ title = 'Erreur', description, reset, error }: RouteErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 text-center">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md">{description || error?.message || 'Une erreur est survenue.'}</p>
      {reset && (
        <Button variant="secondary" onClick={reset}>
          Réessayer
        </Button>
      )}
    </div>
  );
}
