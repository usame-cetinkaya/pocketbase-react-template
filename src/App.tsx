import AppLayout from "@/components/app-layout.tsx";
import { route, navItems } from "@/lib/nav.ts";
import { pb } from "@/lib/pocketbase";
import Login from "@/pages/login.tsx";
import NotFound from "@/pages/not-found.tsx";

function App() {
  if (!pb.authStore.isValid) {
    return <Login />;
  }

  const pathname = route();

  const Component =
    navItems.find((item) => item.pathname === pathname)?.component || NotFound;

  return (
    <AppLayout>
      <Component />
    </AppLayout>
  );
}

export default App;
