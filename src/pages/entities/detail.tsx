import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format.ts";
import type { Entity } from "@/lib/models.ts";
import { pb } from "@/lib/pocketbase.ts";

interface DetailProps {
  id: string;
}

function Detail({ id }: DetailProps) {
  const [data, setData] = useState<Entity>();

  useEffect(() => {
    pb.collection("entities")
      .getOne<Entity>(id)
      .then((entity) => {
        setData(entity);
      });
  }, [id]);

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {data && <EntityCard entity={data} />}
    </div>
  );
}

function EntityCard({ entity }: { entity: Entity }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{entity.name}</CardTitle>
      </CardHeader>
      <CardContent>{formatDate(entity.date)}</CardContent>
    </Card>
  );
}

export default Detail;
