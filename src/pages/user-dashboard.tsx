import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { User } from "@/lib/models.ts";
import { pb } from "@/lib/pocketbase.ts";

function UserDashboard() {
  const id = pb.authStore?.record?.id as string;

  const [user, setUser] = useState<User>();

  useEffect(() => {
    pb.collection("users")
      .getOne<User>(id)
      .then((user) => {
        setUser(user);
      });
  }, [id]);

  if (!id) return null;

  return (
    <div className="flex flex-col gap-6 md:flex-row p-4">
      {user && <UserCard user={user} />}
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export default UserDashboard;
