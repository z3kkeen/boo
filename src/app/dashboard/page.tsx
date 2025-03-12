"use server";
import MainHeader from "@/components/dash-header";
import DashMain from "@/components/dash-main";
import { JSX } from "react";

type DashboardProps = {
  params: Promise<object>;
  searchParams: Promise<{ date?: string }>;
};

export default async function Dashboard({
  params,
  searchParams,
}: DashboardProps): Promise<JSX.Element> {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  console.log(awaitedParams);

  const selectedDate = awaitedSearchParams.date
    ? new Date(awaitedSearchParams.date)
    : new Date();
  console.log("selected date: ", selectedDate);

  return Promise.resolve(
    <div className="h-full m-3 flex flex-col gap-4">
      <MainHeader />
      <DashMain date={selectedDate} />
    </div>
  );
}
