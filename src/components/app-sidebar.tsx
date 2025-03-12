"use client";
import type * as React from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

interface Appointment {
  id: number;
  date: Date | null;
  isBooked: boolean;
  bookedById: string | null;
}

interface AppSidebarProps {
  appointments: Appointment[];
}

export default function AppSidebar({ appointments }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-5">
        <CardTitle>Sidebar</CardTitle>
        <CardDescription>
          Upcoming appointments you have booked:
        </CardDescription>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="px-2">
            {appointments.map((item: Appointment) => {
              const date = new Date(item.date!).toLocaleString();
              console.log("date: ", date);

              return <SidebarMenuItem key={item.id}>{date}</SidebarMenuItem>;
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
