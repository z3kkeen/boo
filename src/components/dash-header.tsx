"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";

export default function MainHeader() {
  const { data: session } = authClient.useSession();

  return (
    <header className="bg-white p-10">
      <h1 className="">
        Welcome, <b>{session?.user.name}</b>!
      </h1>
    </header>
  );
}
