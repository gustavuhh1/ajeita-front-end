import { Star, MapPin } from 'lucide-react';

// Badge de Avaliação
export const RatingBadge = ({ rating, reviews }: { rating?: number; reviews?: number }) => (
  <div className="flex items-center gap-1.5 text-sm">
    <Star size={14} className={rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
    <span className="font-bold text-gray-800">{rating ? rating.toFixed(1) : "Novo"}</span>
    {reviews !== undefined && <span className="text-gray-400 text-xs">({reviews})</span>}
  </div>
);

// Tags de Categoria/Habilidade
export const ServiceTag = ({ label }: { label: string }) => (
  <span className="px-2.5 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-gray-100/50">
    {label}
  </span>
);