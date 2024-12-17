import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown, ChevronUp, User2 } from "lucide-react";
import { Orbitron } from "next/font/google";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";
import { MenuItem } from "@/types/menu-item";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { User } from "@/types/user";
import { AppSidebarFooter } from "./app-sidebar-footer";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export function AppSidebar({
  menuItems,
  userInfo,
}: {
  menuItems: MenuItem[];
  userInfo: User;
}) {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center">
        <h1
          className={`text-2xl font-bold text-gray-800 dark:text-gray-50 text-center mx-auto ${orbitron.className}`}
        >
          <Link href={"/"}>heystock</Link>
        </h1>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((item) => (
          <SidebarMenu key={item.title}>
            <SidebarGroup>
              <Collapsible className="group/collapsible">
                <SidebarGroupContent>
                  <SidebarMenuItem>
                    {item.subItems != undefined && item.subItems?.length > 0 ? (
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <div>
                            {item.icon && <item.icon />}
                            <Link href={item.href}>{item.title}</Link>
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    ) : (
                      <SidebarMenuButton asChild>
                        
                        <Link href={item.href}>{item.icon && <item.icon />} <span>{item.title}</span></Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItems?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            <Link href={subItem.href}>
                              {subItem.icon && <subItem.icon />}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarGroupContent>
              </Collapsible>
            </SidebarGroup>
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {userInfo.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <AppSidebarFooter />
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
