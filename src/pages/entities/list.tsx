import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/data-table.tsx";
import EntityForm from "@/dialogs/entity-form.tsx";
import type { Entity } from "@/lib/models.ts";
import { routeId } from "@/lib/nav.ts";
import { pb } from "@/lib/pocketbase.ts";
import { columns } from "@/pages/entities/columns.tsx";
import Detail from "@/pages/entities/detail.tsx";
import { Button } from "@/components/ui/button.tsx";

function Route() {
  const id = routeId();

  return id ? <Detail id={id} /> : <List />;
}

function List() {
  const [data, setData] = useState<Entity[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);

  function handleEdit() {
    setIsEditOpen(true);
  }

  useEffect(() => {
    pb.collection("entities")
      .getFullList<Entity>()
      .then((entity: Entity[]) => {
        setData(entity);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Button className="ml-auto" onClick={handleEdit}>
        <PlusIcon />
      </Button>
      <DataTable columns={columns} data={data} />
      <EntityForm
        entity={null}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </div>
  );
}

export default Route;
