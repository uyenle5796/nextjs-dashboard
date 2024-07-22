import AcmeLogo from "@/app/ui/acme-logo";
import { Suspense } from "react";
import { Metadata } from "next";
import { lusitana } from "@/app/ui/fonts";
import { User } from "@/app/lib/definitions";
import { fetchUser } from "@/app/lib/data";
import { CardsSkeleton } from "@/app/ui/skeletons";
import ProfileCard from "@/app/ui/profile/profile-card";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user: User = await fetchUser();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Profile</h1>
      </div>
      <br />
      <Suspense fallback={<CardsSkeleton />}>
        <ProfileCard user={user[0]} />
      </Suspense>
    </div>
  );
}
