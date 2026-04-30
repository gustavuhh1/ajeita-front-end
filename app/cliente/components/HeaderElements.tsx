import { Search } from 'lucide-react';

// Link de Navegação Padronizado
export const NavLink = ({ label, href, active = false }: { label: string; href: string; active?: boolean }) => (
  <a 
    href={href} 
    className={`px-5 py-2.5 rounded-xl transition-all text-sm font-medium ${
      active ? 'bg-yellow-400/10 text-yellow-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
    }`}
  >
    {label}
  </a>
);

// Barra de Busca do Header
export const HeaderSearchBar = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="relative flex items-center group">
    <Search size={16} className="absolute left-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
    <input 
      type="text"
      placeholder="Buscar Profissionais"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-11 pr-5 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-yellow-400 focus:outline-none transition-all w-64 text-gray-700 text-sm shadow-inner"
    />
  </div>
);