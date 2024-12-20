import { cookies } from "next/headers";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getUser } from "@/actions/user";

export const metadata: Metadata = {
  title: "Login",
  description: "Login form",
};

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    const user = await getUser();
    if(user?.ok) {
      redirect("/");
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
