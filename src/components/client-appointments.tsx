"use client";
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns, TimeSlot } from "./columns";
import { bookAppointmentAction } from "@/lib/appointments";
import { useRouter } from "next/navigation";
import LoadingBooking from "./loading-booking";
import { Button } from "./ui/button";
import { Row } from "@tanstack/react-table";

type AppointmentsTableClientProps = {
  data: TimeSlot[];
};

export default function AppointmentsTableClient({
  data,
}: AppointmentsTableClientProps) {
  const [selectedAppointmentIds, setSelectedAppointmentIds] = useState<
    string[]
  >([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRowClick = (row: Row<TimeSlot>) => {
    const id = row.original.id;
    setSelectedAppointmentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    console.log("selected appointment(s): ", selectedAppointmentIds);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("appointmentIds", selectedAppointmentIds.join(","));
    await bookAppointmentAction(formData);
    setSelectedAppointmentIds([]);
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="max-h-[47vh] overflow-y-auto">
      <DataTable
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
        selectedIds={selectedAppointmentIds}
      />
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="hidden"
          name="appointmentIds"
          value={selectedAppointmentIds.join(",")}
        />
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={selectedAppointmentIds.length === 0}
            className="btn btn-primary"
          >
            Book
          </Button>
          {loading && <LoadingBooking />}
        </div>
      </form>
    </div>
  );
}
