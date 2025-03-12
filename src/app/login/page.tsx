"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/loading-wheel";

export default function SignUp() {
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = async () => {
    const email = logEmail;
    const password = logPassword;

    const { error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx: { error: { message: string } }) => {
          alert(ctx.error.message);
          console.error(error);
          setLoading(false);
        },
      }
    );
  };

  const signUp = async () => {
    const email = signEmail;
    const password = signPassword;

    const { error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          console.log("loading", ctx);
          setLoading(true);
        },
        onSuccess: (ctx: { data: string }) => {
          console.log("User created: ", ctx.data);
          router.push("/dashboard");
        },
        onError: (ctx: { error: { message: string } }) => {
          alert(ctx.error.message);
          console.error(error);
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="h-screen w-full bg-indigo-400 flex gap-28 items-center justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Register</TabsTrigger>
          <TabsTrigger value="password">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Sign up!</CardTitle>
              <CardDescription>
                Make your account here. <br /> Click &apos;Sign up&apos; when
                you&apos;re done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="mail">Email</Label>
                <Input
                  id="email"
                  value={signEmail}
                  onChange={(e) => setSignEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={signPassword}
                  onChange={(e) => setSignPassword(e.target.value)}
                  placeholder="******"
                />
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button onClick={signUp}>Sign up</Button>
              {loading && <LoadingSpinner />}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Log in</CardTitle>
              <CardDescription>
                Log in to your pre-existing account here!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="current"
                  type="text"
                  value={logEmail}
                  onChange={(e) => setLogEmail(e.target.value)}
                  placeholder="Your email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="new"
                  type="password"
                  value={logPassword}
                  onChange={(e) => setLogPassword(e.target.value)}
                  placeholder="******"
                />
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button onClick={signIn}>Login</Button>
              {loading && <LoadingSpinner />}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
