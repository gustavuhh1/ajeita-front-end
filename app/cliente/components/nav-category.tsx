import {
  BroomIcon,
  PaintBrushBroadIcon,
  PipeWrenchIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Cable } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Encanador",
    icon: <PipeWrenchIcon weight="fill" size={20} />,
  },
  {
    id: 2,
    name: "Eletricista",
    icon: <Cable strokeWidth={1.25} />,
  },
  {
    id: 3,
    name: "Pintor",
    icon: <PaintBrushBroadIcon weight="fill" size={20} />,
  },
  { id: 4, name: "Limpeza", icon: <BroomIcon weight="fill" size={20} /> },
];

const NavCategory = () => {
  return (
    <>
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex h-18 flex-col items-center gap-2"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-zinc-700">
            {category.icon}
          </div>
          <span className="text-sm text-zinc-800">{category.name}</span>
        </div>
      ))}
    </>
  );
};

export default NavCategory;
