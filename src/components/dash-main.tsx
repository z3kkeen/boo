"use server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MyCalendar from "./calendar";
import CalAppointments from "./appointments";

export type DateParam = { date: Date };

export default async function DashMain({ date }: DateParam) {
  return (
    <div className="h-full flex items-start gap-2">
      <MyCalendar date={date} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Avalible times</CardTitle>
          <CardDescription>
            Select the day you want to book the local venue, <br /> pick an
            avalible time to book it, bellow.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <CalAppointments date={date} />
        </CardContent>
      </Card>
    </div>
  );
}
