import { Provider } from '@/types';
import { ProviderCard } from './ProviderCard';

interface ProviderListProps {
  providers: Provider[];
  viewMode: 'grid' | 'list';
  loading?: boolean;
}

export const ProviderList = ({ providers, viewMode, loading }: ProviderListProps) => {
  if (loading) return <div className="p-10 text-center">Carregando...</div>;

  return (
    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
      {providers.map((pro) => (
        <ProviderCard key={pro.id} provider={pro} viewMode={viewMode} />
      ))}
    </div>
  );
};