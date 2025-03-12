"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Calendar from "react-calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "react-calendar/dist/Calendar.css";
import { DateParam } from "./dash-main";

type ValuePiece = Date | null;

export default function MyCalendar({ date }: DateParam) {
  const [value, setValue] = useState<ValuePiece | [ValuePiece, ValuePiece]>(
    date
  );
  const router = useRouter();
  const handleChange = (newValue: Date | Date[]) => {
    const selectedDate = Array.isArray(newValue) ? newValue[0] : newValue;
    setValue(selectedDate);
    router.push(`/dashboard?date=${encodeURIComponent(String(value))}`);
  };

  return (
    <div className="rounded-md bg-white">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>
            Pick which day you want to book an appointment for.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Calendar
            value={value}
            onChange={setValue}
            onClickDay={handleChange}
            selectRange={false}
            className="w-full rounded-md"
          />
        </CardContent>
      </Card>
    </div>
  );
}
