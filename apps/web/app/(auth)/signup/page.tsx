import SignupPage from "@/features/auth/signup/SignupPage";
import {auth} from "@applivio/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
      headers: await headers()
    })
  
    if(session?.user?.email) {
      return redirect("/app")
    }
  return <SignupPage />;
}
