"use client";

import { logout } from "@/actions/logout";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

export function AppSidebarFooter() {
  return (
    <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
      <DropdownMenuItem>
        <span>Account</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span>Billing</span>
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={async ()=> await logout()}>
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
