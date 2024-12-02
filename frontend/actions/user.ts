"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  // 環境変数からAPIのURLを取得
  const apiUrl = process.env.API_URL;

  const token = cookieStore.get("token")?.value;

  if (token === undefined) {
    redirect("/login");
  }

  const res = await fetch(`${apiUrl}/users`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      // UnAuthorizedが返ってきた場合、何らかの理由で無効なトークンがCookieにあるので消す
      cookieStore.delete("token");
    }

    redirect("/login");
  }

  return res.json();
}
