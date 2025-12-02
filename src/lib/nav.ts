import * as React from "react";
import { LayoutDashboardIcon, PackageIcon } from "lucide-react";
import List from "@/pages/entities/list.tsx";
import UserDashboard from "@/pages/user-dashboard.tsx";

type NavItem = {
  title: string;
  pathname: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  component: React.ComponentType;
  hideInMenu?: boolean;
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    pathname: "/",
    icon: LayoutDashboardIcon,
    component: UserDashboard,
  },
  {
    title: "Entities",
    pathname: "/entities",
    icon: PackageIcon,
    component: List,
  },
];

export const pathnameSegments = () => window.location.pathname.split("/");

export const route = () => `/${pathnameSegments().at(1)}`;

export const routeId = () => pathnameSegments().at(2);
