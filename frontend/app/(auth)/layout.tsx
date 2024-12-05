import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Users, Briefcase, Package, PackageOpen, PackagePlus, PackageSearch, Blocks } from "lucide-react";
import { MenuItem } from "@/types/menu-item";
import { getUser } from "@/actions/user";

const menuItems: MenuItem[] = [
  {
    title: "商品",
    href: "/products",
    icon: PackageOpen,
    subItems: [
      { title: "商品一覧", href: "/products", icon: PackageSearch },
      { title: "商品登録", href: "/products/create", icon: PackagePlus },
      { title: "商品種別", href: "/products/category", icon: Blocks }
    ],
  },
  {
    title: "取引先",
    href: "/clients",
    icon: Briefcase,
    subItems: [
      { title: "取引先一覧", href: "/clients", icon: Users },
      { title: "取引先登録", href: "/clients/create", icon: Users },
    ],
  },
  {
    title: "在庫",
    href: "/inventory",
    icon: Package,
    subItems: [
      { title: "在庫一覧", href: "/inventory", icon: Package },
      { title: "入庫登録", href: "/inventory/in", icon: Package },
      { title: "出庫登録", href: "/inventory/out", icon: Package },
    ],
  },
  {
    title: "ユーザー",
    href: "/users",
    icon: Users,
    subItems: [
      { title: "ユーザー一覧", href: "/users", icon: Users },
      { title: "ユーザー登録", href: "/users/create", icon: Users },
    ],
  },
];

export default async function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <SidebarProvider>
      <AppSidebar menuItems={menuItems} userInfo={user} />
      <SidebarInset>
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
