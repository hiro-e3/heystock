"use client";

import { logout } from "@/actions/logout";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

export function AppSidebarFooter() {
  return (
    <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
      <DropdownMenuItem onSelect={async ()=> await logout()}>
        サインアウト
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
