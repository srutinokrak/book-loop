"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleEmailLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const credentials = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    try {
      const { data, error } = await authClient.signIn.email(credentials);
      if (error) {
        setErrorMessage(error.message || "Login failed. Check your email and password.");
        return;
      }
      if (data) router.push("/");
    } catch {
      setErrorMessage("Could not connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto my-10 flex max-w-6xl flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-[#2878a5]">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@example.com" autoComplete="email" required />
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <button
                    type="button"
                    className="text-sm underline-offset-4 hover:underline"
                    onClick={() => setErrorMessage("Password reset is not set up yet. Please contact support.")}
                  >
                    Forgot password?
                  </button>
                </div>
                <Input id="password" name="password" type="password" autoComplete="current-password" required />
              </Field>

              {errorMessage && <p role="alert" className="text-sm text-red-600">{errorMessage}</p>}

              <Button type="submit" disabled={isSubmitting} className="bg-[#2878a5]">
                {isSubmitting ? "Logging in…" : "Login"}
              </Button>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href="/register" className="underline">Register</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
