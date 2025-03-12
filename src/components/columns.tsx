"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TimeSlot = {
  id: string;
  time: Date;
  status: "Booked" | "Available";
};

export const columns: ColumnDef<TimeSlot>[] = [
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
