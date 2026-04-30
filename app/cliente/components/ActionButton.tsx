import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const ActionButton = ({ 
  label, 
  onClick, 
  icon: Icon, 
  variant = 'primary',
  fullWidth = false 
}: ActionButtonProps) => {
  const baseStyles = "flex items-center justify-center gap-2 font-bold transition-all active:scale-95 py-2.5 px-6 rounded-xl text-sm";
  
  const variants = {
    primary: "bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-sm",
    outline: "border-2 border-gray-100 hover:border-yellow-400 text-gray-700 hover:text-yellow-600",
    ghost: "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {label}
      {Icon && <Icon size={16} />}
    </button>
  );
};