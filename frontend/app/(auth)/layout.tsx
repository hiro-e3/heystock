import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Users, Briefcase, Package, PackageOpen, PackagePlus, PackageSearch, Blocks } from "lucide-react";
import { MenuItem } from "@/types/menu-item";
import { getUser } from "@/actions/user";
import { Suspense } from "react";
import { redirect } from "next/navigation";

const menuItems: MenuItem[] = [
  {
    title: "商品",
    href: "/products",
    icon: PackageOpen,
    subItems: [
      { title: "商品一覧", href: "/products/list", icon: PackageSearch },
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
  async function getUserInner() {
    'use server'
    const userRes = await getUser();
    if(userRes?.ok) {
      return await userRes.json();
    } else {
      // (await cookies()).delete("token");
      redirect("/login");
    }
  }
  const user = await getUserInner();

  return (
    <SidebarProvider>
      <Suspense>
        <AppSidebar menuItems={menuItems} userInfo={user} />
      </Suspense>
      
      <SidebarInset>
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
