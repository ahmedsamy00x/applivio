import React from "react";
import {auth} from "@applivio/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session?.user?.email) {
    return redirect("/login")
  }

  console.log(session)
  return <div>Applivio</div>;
};

export default Page;
