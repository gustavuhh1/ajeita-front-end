import {
  BroomIcon,
  PaintBrushBroadIcon,
  PipeWrenchIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Cable } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Encanador",
    icon: <PipeWrenchIcon weight="fill" size={20} />,
    href: "/cliente/servicos?categoria=encanador",
  },
  {
    id: 2,
    name: "Eletricista",
    icon: <Cable strokeWidth={1.25} />,
    href: "/cliente/servicos?categoria=eletricista",
  },
  {
    id: 3,
    name: "Pintor",
    icon: <PaintBrushBroadIcon weight="fill" size={20} />,
    href: "/cliente/servicos?categoria=pintor",
  },
  {
    id: 4,
    name: "Limpeza",
    icon: <BroomIcon weight="fill" size={20} />,
    href: "/cliente/servicos?categoria=limpeza",
  },
];

const NavCategory = () => {
  return (
    <>
      {categories.map((category) => (
        <Link
          href={category.href}
          key={category.id}
          className="flex h-18 flex-col items-center gap-2"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200">
            {category.icon}
          </div>
          <span className="text-sm text-zinc-800">{category.name}</span>
        </Link>
      ))}
    </>
  );
};

export default NavCategory;
