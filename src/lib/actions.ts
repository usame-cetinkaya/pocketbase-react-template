import type { RecordModel } from "pocketbase";
import type { Entity } from "@/lib/models.ts";
import { pb } from "@/lib/pocketbase.ts";

export const createEntity = ({
  name,
  date,
}: Partial<Entity>): Promise<RecordModel> => {
  const user = pb.authStore?.record?.id;

  return pb.collection("entities").create({ user, name, date });
};

export const updateEntity = (
  id: string,
  { name, date }: Partial<Entity>,
): Promise<RecordModel> => {
  const user = pb.authStore?.record?.id;

  return pb.collection("entities").update(id, { user, name, date });
};

export const deleteEntity = (id: string): Promise<boolean> => {
  return pb.collection("entities").delete(id);
};
