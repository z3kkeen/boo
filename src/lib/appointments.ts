"use server";
import { prisma } from "./prisma";
import { auth } from "./auth";
import { headers } from "next/headers";

export async function getAvailableAppointments(selectedDate: Date) {
  const startOfDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    0,
    0,
    0,
    0
  );
  const endOfDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    23,
    59,
    59,
    999
  );

  let appointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: { date: "asc" },
  });

  if (!appointments.length) {
    const businessStartHour = 8;
    const businessEndHour = 23;
    const slotDuration = 30;

    const slots = [];

    const current = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      businessStartHour,
      0,
      0,
      0
    );
    const endTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      businessEndHour,
      0,
      0,
      0
    );

    while (current < endTime) {
      slots.push({
        date: new Date(current),
        isBooked: false,
      });
      current.setMinutes(current.getMinutes() + slotDuration);
    }

    await prisma.appointment.createMany({
      data: slots,
      skipDuplicates: true,
    });

    appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { date: "asc" },
    });
  }

  return appointments;
}

export async function bookAppointment(appointmentId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authorized");
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment || appointment.isBooked) {
      throw new Error("Time-slot is no longer available.");
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        isBooked: true,
      },
    });
    return updatedAppointment;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to book appointment");
  }
}

export async function bookAppointmentAction(formData: FormData): Promise<void> {
  const appointmentIdsStr = formData.get("appointmentIds") as string;
  if (!appointmentIdsStr) return;

  const ids = appointmentIdsStr.split(",").map((id) => parseInt(id, 10));

  for (const id of ids) {
    try {
      await bookAppointment(id);
    } catch (error) {
      console.error("Booking failed for appointment", id, ":", error);
    }
  }
}

export async function getUpcomingAppointments() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authorized");
  }

  const userId = session.user.id;
  const now = new Date();

  console.log("now: ", now);

  const appointments = await prisma.appointment.findMany({
    where: {
      isBooked: true,
      bookedById: userId,
      date: { gt: new Date(now) },
    },
    orderBy: { date: "asc" },
  });

  return appointments;
}
