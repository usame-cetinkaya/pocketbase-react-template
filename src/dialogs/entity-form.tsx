import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label.tsx";
import { createEntity, updateEntity } from "@/lib/actions.ts";
import { toDatetimeLocal } from "@/lib/format.ts";
import type { Entity } from "@/lib/models.ts";

function EntityForm({
  entity,
  open,
  onOpenChange,
}: {
  entity: Entity | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    let date = formData.get("date") as string;

    date = date ? new Date(date).toISOString().replace("T", " ") : "";

    if (entity) {
      await updateEntity(entity.id, { name, date });
    } else {
      await createEntity({ name, date });
    }

    onOpenChange(false);

    window.location.reload();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{entity ? "Update" : "Create"} Entity</DialogTitle>
        </DialogHeader>

        <form id="session-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={entity?.name || ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="datetime-local"
                defaultValue={toDatetimeLocal(entity?.date || "")}
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="session-form">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EntityForm;
