import { useState } from "react";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { DataTableColumnHeader } from "@/components/data-table-column-header.tsx";
import EntityForm from "@/dialogs/entity-form.tsx";
import { deleteEntity } from "@/lib/actions.ts";
import { formatDate } from "@/lib/format.ts";
import type { Entity } from "@/lib/models.ts";

interface ActionsProps {
  entity: Entity;
}

// eslint-disable-next-line react-refresh/only-export-components
function Actions({ entity }: ActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  function handleEdit() {
    setIsEditOpen(true);
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete entity?")) {
      await deleteEntity(id);

      window.location.reload();
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" asChild>
        <a href={`/entities/${entity.id}`}>
          <EyeIcon />
        </a>
      </Button>
      <Button variant="outline" onClick={handleEdit}>
        <PencilIcon />
      </Button>
      <EntityForm
        entity={entity}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      <Button variant="outline" onClick={() => handleDelete(entity.id)}>
        <TrashIcon />
      </Button>
    </div>
  );
}

export const columns: ColumnDef<Entity>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions entity={row.original} />,
  },
  {
    id: "filter",
    accessorFn: (row) => `${row.name}|${row.date}`,
  },
];
