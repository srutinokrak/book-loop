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

export default function SignUpPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");

    async function handleGoogleSignIn() {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Google sign-in failed. Please try again.");
        setIsSubmitting(false);
      }
    } catch {
      setErrorMessage("Could not connect to Google. Please try again.");
      setIsSubmitting(false);
    }
  }

  async function handleEmailSignUp(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const user = {
      name: String(formData.get("name") ?? ""),
      image: String(formData.get("image") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    if (user.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setIsSubmitting(false);
      return;
    }
    if (!/[A-Z]/.test(user.password)) {
      setErrorMessage("Password must include at least one uppercase letter.");
      setIsSubmitting(false);
      return;
    }
    if (!/[a-z]/.test(user.password)) {
      setErrorMessage("Password must include at least one lowercase letter.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email(user);

      if (error) {
        setErrorMessage(
          error.message || "Registration failed. Please try again.",
        );
        return;
      }

      if (data) router.push("/login");
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
          <CardTitle className="text-2xl text-[#2878a5]">
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignUp}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="image">Image URL</FieldLabel>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <FieldDescription>
                  Use at least 6 characters with an uppercase and a lowercase
                  letter.
                </FieldDescription>
              </Field>

              {errorMessage && (
                <p role="alert" className="text-sm text-red-600">
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#2878a5]"
              >
                {isSubmitting ? "Registering…" : "Register"}
              </Button>

               <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                OR
                <span className="h-px flex-1 bg-slate-200" />
              </div>

               <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={handleGoogleSignIn}
                className="w-full"
              >
                  <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt=""
                  aria-hidden="true"
                  width={15}
                  height={15}
                />
                Continue with Google
              </Button>

              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </FieldDescription>

             
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
