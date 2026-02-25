import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      <h1>Style Guide</h1>
      <div className="grid max-w-2xl grid-cols-2 gap-2 space-y-2 p-2">
        <div className="text-secondary-foreground h-80 space-y-2 rounded-lg border bg-zinc-50 p-4">
          <h1>Cores</h1>
          <div className="flex flex-wrap gap-2">
            <div className="bg-primary text-primary-foreground flex h-10 w-fit items-center justify-center rounded-full px-2 font-bold">
              Primary
            </div>
            <div className="bg-background text-foreground flex h-10 w-fit items-center justify-center rounded-full px-2 font-bold">
              Background
            </div>
            <div className="bg-primary-foreground text-primary flex h-10 w-fit items-center justify-center rounded-full px-2 font-bold">
              Primary Foreground
            </div>
            <div className="bg-secondary text-secondary-foreground flex h-10 w-fit items-center justify-center rounded-full px-2 font-bold">
              Secondary
            </div>
            <div className="bg-secondary-foreground text-secondary flex h-10 w-fit items-center justify-center rounded-full px-2 font-bold">
              Secondary Foreground
            </div>
            <div className="bg-foreground text-primary flex h-10 w-fit items-center justify-center rounded-full px-2 font-bold">
              Foreground
            </div>
            <div className="bg-muted flex h-10 w-fit items-center justify-center rounded-full px-2 font-bold">
              Muted
            </div>
            <div className="bg-border flex h-10 w-fit items-center justify-center rounded-full px-2 font-bold">
              Border
            </div>
          </div>
        </div>
        <div className="text-secondary-foreground h-80 space-y-2 rounded-lg border bg-zinc-50 p-4">
          <h1>Botões</h1>
          <Button size={"lg"} variant="default">
            Primary
          </Button>
          <Button size={"lg"} variant="default" disabled>
            Disabled
          </Button>
          <Button size={"lg"} variant="secondary">
            Secondary
          </Button>
          <Button size={"lg"} variant="destructive">
            Destructive
          </Button>
          <Button size={"lg"} variant="outline">
            Outline
          </Button>
          <Button size={"lg"} variant="ghost">
            Ghost
          </Button>
        </div>
        <div className="text-secondary-foreground h-80 space-y-2 rounded-lg border bg-zinc-50 p-4">
          <h1>Inputs</h1>
          <Input placeholder="Default" />
          <Input placeholder="Default" disabled />
        </div>
        <div className="text-secondary-foreground h-80 space-y-2 rounded-lg border bg-zinc-50 p-4">
          <h1>Tipografia</h1>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <p>Paragraph text</p>
          <a href="">link</a>
        </div>
      </div>
    </div>
  );
}
