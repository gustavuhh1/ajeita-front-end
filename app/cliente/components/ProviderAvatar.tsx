import { User } from 'lucide-react';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
}

export const ProviderAvatar = ({ src, name, size = "md" }: AvatarProps) => {
  const sizeClasses = {
    sm: "w-10 h-10 rounded-xl",
    md: "w-16 h-16 rounded-2xl",
    lg: "w-24 h-24 rounded-3xl",
  };

  return (
    <div className={`${sizeClasses[size]} bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <User size={size === "sm" ? 20 : 32} className="text-gray-400" />
      )}
    </div>
  );
};