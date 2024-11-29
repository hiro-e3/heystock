
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if(token === undefined) {
    redirect("/login");
  }
  return (
    <div>
      <h1 className="dark:text-white">Authorized</h1>
      <LogoutButton />
    </div>
  );
}
