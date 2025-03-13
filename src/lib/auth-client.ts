import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://booking-app-pied-five.vercel.app",
});
