"use client";
import React from "react";

export default function LoadingBooking() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm font-semibold text-indigo-400">
        Booking appointment for you...
      </span>
    </div>
  );
}
