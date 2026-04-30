import { MapPin } from 'lucide-react';

interface LocationProps {
  city?: string;
  distance?: string;
  className?: string;
}

export const ProviderLocation = ({ city, distance, className = "" }: LocationProps) => {
  if (!city) return (
    <span className="text-xs text-gray-400 italic">Atendimento sob consulta</span>
  );

  return (
    <div className={`flex items-center gap-1 text-gray-400 text-xs font-medium ${className}`}>
      <MapPin size={12} className="shrink-0 text-yellow-500" />
      <span className="truncate">{city}</span>
      {distance && (
        <>
          <span className="w-1 h-1 rounded-full bg-gray-300 mx-1" />
          <span>{distance}</span>
        </>
      )}
    </div>
  );
};