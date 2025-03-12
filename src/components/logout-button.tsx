"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { logout } from "@/lib/logout";
import { useState } from "react";
import LoadingBooking from "./loading-booking";

export function LogoutButton() {
  const [loading, isLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    try {
      isLoading(true);
      await logout();
      isLoading(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleLogout}
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          {loading && <LoadingBooking />}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
