import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to login page
  redirect("/login");

  // This part won't be executed due to the redirect, but Next.js requires a component to return JSX
  return null;
}
