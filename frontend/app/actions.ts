'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  
  if(token) {
    const response = await fetch(`${process.env.API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
    });

    if(response.ok || response.status === 401) {
      cookieStore.delete("token");
      redirect("/login");
    } 
  }

  redirect("/login");
}