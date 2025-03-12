"server";
import type * as React from "react";
import AppSidebar from "./app-sidebar";
import { getUpcomingAppointments } from "@/lib/appointments";

export default async function ServerSidebar() {
  const data = await getUpcomingAppointments();
  return (
    <>
      <AppSidebar appointments={data} />
    </>
  );
}
