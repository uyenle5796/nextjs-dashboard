"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default async function ProfileLink() {
  const pathname = usePathname();
  const hrefLink = "/profile";

  return (
    <Link
      href={hrefLink}
      className={clsx(
        "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
        {
          "bg-sky-100 text-blue-600": pathname === hrefLink,
        }
      )}
    >
      <UserCircleIcon className="w-6" />
      <p className="hidden md:block">Profile</p>
    </Link>
  );
}
