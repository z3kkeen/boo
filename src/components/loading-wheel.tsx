"use client";

import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm font-semibold text-indigo-500">Loading...</span>
    </div>
  );
}
