'use client';

import { logout } from "./actions";

export function LogoutButton() {
  return (
    <button type='button' className="px-4 py-2 border dark:text-white rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500" onClick={async () => {
      await logout();
    }} >Logout</button>
  )
}