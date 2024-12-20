'use server'

import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  // 環境変数からAPIのURLを取得
  const apiUrl = process.env.API_URL;

  const token = cookieStore.get("token");

  if (token === undefined) {
    return undefined;
  }

  return fetch(`${apiUrl}/users`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
}
