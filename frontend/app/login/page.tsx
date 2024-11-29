import { cookies } from "next/headers";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login form",
};

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if(token) {
    console.log(`Token exists ${token.value}`);
    redirect("/");
  }

  return (
    <LoginForm />
  );
}