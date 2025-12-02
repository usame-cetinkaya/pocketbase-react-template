import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/components/app-header.tsx";
import { AppSidebar } from "@/components/app-sidebar.tsx";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full">
        <AppHeader />
        <div className="p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
