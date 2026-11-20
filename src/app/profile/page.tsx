import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ProfileCard } from "@/components/profile/ProfileCard";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My Profile — BookNook",
  description: "Your BookNook reading profile.",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login?callbackUrl=/profile");
  }

  const createdAt = user.createdAt
    ? new Date(user.createdAt).toISOString()
    : null;

  return (
    <main className="flex-1 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
        <ProfileCard
          name={user.name ?? null}
          email={user.email}
          image={user.image ?? null}
          createdAt={createdAt}
        />
      </div>
    </main>
  );
}
