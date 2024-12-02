'use client';

import { logout } from "../actions/logout";
import { Button } from "./ui/button";

export function LogoutButton({children}: {children: React.ReactNode}) {
  return (
    <Button onClick={async () => await logout()}>
      {children}
    </Button>
  )
}