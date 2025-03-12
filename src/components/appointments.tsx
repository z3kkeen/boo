"use server";
import { getAvailableAppointments } from "@/lib/appointments";
import AppointmentsTableClient from "./client-appointments";
import { TimeSlot } from "./columns";
import { DateParam } from "./dash-main";

interface AppointmentDB {
  id: number;
  date: Date | null;
  isBooked: boolean;
  bookedById: string | null;
}

async function getData(date: Date): Promise<TimeSlot[]> {
  const currentDate = new Date(date);
  const appointments = await getAvailableAppointments(currentDate);
  return appointments.map((appointment: AppointmentDB) => ({
    id: appointment.id.toString(),
    time: appointment.date ? new Date(appointment.date) : new Date(),
    status: appointment.isBooked ? "Booked" : "Available",
    email: appointment.bookedById || "N/A",
  }));
}

export default async function CalAppointments({ date }: DateParam) {
  const data = await getData(date);
  return (
    <div>
      <AppointmentsTableClient data={data} />
    </div>
  );
}
