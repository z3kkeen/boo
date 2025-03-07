"use server";
import { cookies } from "next/headers";

export const logout = async () => {
  const storedCookies = cookies();
  (await storedCookies).delete("better-auth.session_token");
};
