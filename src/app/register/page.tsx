"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  ImageIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { authClient, signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const passwordRules = [
  { label: "at least 6 characters", test: (value: string) => value.length >= 6 },
  { label: "an uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "a lowercase letter", test: (value: string) => /[a-z]/.test(value) },
] as const;

const passwordSchema = z.string().superRefine((value, ctx) => {
  const unmet = passwordRules.filter((rule) => !rule.test(value));
  if (unmet.length > 0) {
    ctx.addIssue({
      code: "custom",
      message: `Password must include ${unmet
        .map((rule) => rule.label)
        .join(", ")}`,
    });
  }
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    image: z
      .literal("")
      .or(
        z
          .url("Enter a valid image URL")
          .refine(
            (value) => /^https?:\/\//i.test(value),
            "Enter a valid image URL"
          )
      )
      .optional(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

const inputGroupBase =
  "h-12 rounded-2xl border-border bg-background [&_input]:h-full has-[[data-slot=input-group-control]:focus-visible]:border-amber has-[[data-slot=input-group-control]:focus-visible]:ring-4 has-[[data-slot=input-group-control]:focus-visible]:ring-amber/20";

const inputGroupError =
  "border-destructive bg-destructive/10 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot=input-group-control]:focus-visible]:border-destructive has-[[data-slot=input-group-control]:focus-visible]:ring-destructive/15";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      image: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: RegisterValues) => {
    const { error } = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image || undefined,
    });

    if (error) {
      toast.error(error.message || "Could not create your account");
      return;
    }

    router.push("/login");
  };

  const handleGoogleSignUp=async ()=>{
    const data = await signIn.social({
      provider:"google"
    })
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-6 pb-24 sm:px-6">
      <section className="relative overflow-hidden rounded-[32px] bg-[#16202D] text-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_82%)]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(251,248,243,0.16) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[10%] size-72 animate-pulse rounded-full bg-amber/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-[12%] size-80 animate-pulse rounded-full bg-teal/40 blur-3xl [animation-delay:1s]"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 px-6 pt-9 pb-24 sm:px-10"
        >
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-medium text-paper/60"
          >
            <Link href="/" className="transition-colors hover:text-amber">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-amber">Register</span>
          </nav>

          <h1 className="mt-4 font-heading text-4xl leading-tight font-semibold tracking-tight text-white">
            Join <span className="text-amber italic">BookNook</span>
          </h1>
          <p className="mt-2 text-sm text-paper/65 sm:text-base">
            Create an account to borrow and share books.
          </p>
        </motion.div>
      </section>

      <div className="relative z-10 -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mx-auto w-full max-w-[520px] rounded-[32px] border border-border bg-card p-6 shadow-[0_32px_70px_-36px_rgba(30,42,58,0.35)] sm:p-10"
        >
          <h1 className="font-heading text-[34px] leading-tight font-semibold tracking-tight text-foreground">
            Register
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Create your account to start borrowing and sharing books.
          </p>

         

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-7"
          >
            <FieldGroup className="gap-5">
              <Field className="gap-2">
                <FieldLabel
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Full name
                </FieldLabel>
                <InputGroup
                  className={cn(
                    inputGroupBase,
                    errors.name && inputGroupError
                  )}
                >
                  <InputGroupAddon align="inline-start" className="pl-4">
                    <UserIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="name"
                    // name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                </InputGroup>
                {errors.name?.message && (
                  <FieldError
                    id="name-error"
                    className="flex items-center gap-1.5 text-xs font-medium text-destructive"
                  >
                    <AlertCircleIcon aria-hidden className="size-3.5 shrink-0" />
                    {errors.name.message}
                  </FieldError>
                )}
              </Field>

              <Field className="gap-2">
                <FieldLabel
                  htmlFor="image"
                  className="text-sm font-medium text-foreground"
                >
                  Photo URL{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <InputGroup
                  className={cn(
                    inputGroupBase,
                    errors.image && inputGroupError
                  )}
                >
                  <InputGroupAddon align="inline-start" className="pl-4">
                    <ImageIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="image"
                    type="url"
                    autoComplete="url"
                    placeholder="https://example.com/photo.jpg"
                    aria-invalid={!!errors.image}
                    aria-describedby={errors.image ? "image-error" : undefined}
                    {...register("image")}
                  />
                </InputGroup>
                {errors.image?.message && (
                  <FieldError
                    id="image-error"
                    className="flex items-center gap-1.5 text-xs font-medium text-destructive"
                  >
                    <AlertCircleIcon aria-hidden className="size-3.5 shrink-0" />
                    {errors.image.message}
                  </FieldError>
                )}
              </Field>

              <Field className="gap-2">
                <FieldLabel
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </FieldLabel>
                <InputGroup
                  className={cn(
                    inputGroupBase,
                    errors.email && inputGroupError
                  )}
                >
                  <InputGroupAddon align="inline-start" className="pl-4">
                    <MailIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "email-error" : undefined
                    }
                    {...register("email")}
                  />
                </InputGroup>
                {errors.email?.message && (
                  <FieldError
                    id="email-error"
                    className="flex items-center gap-1.5 text-xs font-medium text-destructive"
                  >
                    <AlertCircleIcon aria-hidden className="size-3.5 shrink-0" />
                    {errors.email.message}
                  </FieldError>
                )}
              </Field>

              <Field className="gap-2">
                <FieldLabel
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </FieldLabel>
                <InputGroup
                  className={cn(
                    inputGroupBase,
                    errors.password && inputGroupError
                  )}
                >
                  <InputGroupAddon align="inline-start" className="pl-4">
                    <LockIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password
                        ? "password-hint password-error"
                        : "password-hint"
                    }
                    {...register("password")}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-sm"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <p
                  id="password-hint"
                  className="text-xs text-muted-foreground"
                >
                  At least 6 characters, including an uppercase and a lowercase
                  letter.
                </p>
                {errors.password?.message && (
                  <FieldError
                    id="password-error"
                    className="flex items-center gap-1.5 text-xs font-medium text-destructive"
                  >
                    <AlertCircleIcon aria-hidden className="size-3.5 shrink-0" />
                    {errors.password.message}
                  </FieldError>
                )}
              </Field>

              <Field className="gap-2">
                <FieldLabel
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-foreground"
                >
                  Confirm password
                </FieldLabel>
                <InputGroup
                  className={cn(
                    inputGroupBase,
                    errors.confirmPassword && inputGroupError
                  )}
                >
                  <InputGroupAddon align="inline-start" className="pl-4">
                    <LockIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={
                      errors.confirmPassword
                        ? "confirm-password-error"
                        : undefined
                    }
                    {...register("confirmPassword")}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-sm"
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {errors.confirmPassword?.message && (
                  <FieldError
                    id="confirm-password-error"
                    className="flex items-center gap-1.5 text-xs font-medium text-destructive"
                  >
                    <AlertCircleIcon aria-hidden className="size-3.5 shrink-0" />
                    {errors.confirmPassword.message}
                  </FieldError>
                )}
              </Field>

              <Button
                type="submit"
                className="relative h-14 w-full overflow-hidden rounded-full bg-amber text-base font-bold text-ink shadow-[0_16px_30px_-14px_rgba(232,163,61,0.9)] transition-colors hover:bg-amber/90 focus-visible:border-amber focus-visible:ring-4 focus-visible:ring-amber/30"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 animate-shine bg-white/35 blur-md"
                />
                <span className="relative z-10">Register</span>
              </Button>

              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">
                  or continue with
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignUp}
                className="h-14 w-full rounded-full border border-border bg-card text-sm font-semibold text-foreground shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted/50 hover:shadow-[0_12px_24px_-14px_rgba(30,42,58,0.4)] focus-visible:border-amber focus-visible:ring-4 focus-visible:ring-amber/20"
              >
                <FcGoogle />
                Continue with Google
              </Button>

              <p className="pt-1 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-highlight-foreground transition-colors hover:text-amber hover:underline"
                >
                  Login
                </Link>
              </p>
            </FieldGroup>
          </form>

          
        </motion.div>
      </div>
    </main>
  );
}
