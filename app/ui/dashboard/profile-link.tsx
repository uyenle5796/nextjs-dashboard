"use client";
import Link from "next/link";
import clsx from "clsx";
import { User } from "@/app/lib/definitions";
import { fetchUser } from "@/app/lib/data";
import { usePathname } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default async function ProfileLink() {
  //   const user: User = await fetchUser();
  const pathname = usePathname();

  return (
    <Link
      key="profile"
      href="/profile"
      className={clsx(
        "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
        {
          "bg-sky-100 text-blue-600": pathname === "/profile",
        }
      )}
    >
      <UserCircleIcon className="w-6" />
      {/* <div className="hidden md:block">{user[0].name}</div> */}
    </Link>
  );
}
