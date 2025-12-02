import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  function handleClick() {
    if (column.getIsSorted() === "asc") {
      column.toggleSorting(true);
    } else {
      column.toggleSorting(false);
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={handleClick}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowUp />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowDown />
        ) : (
          <ChevronsUpDown />
        )}
      </Button>
    </div>
  );
}
