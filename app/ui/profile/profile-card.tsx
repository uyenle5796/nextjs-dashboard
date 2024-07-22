import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { User } from "@/app/lib/definitions";
export default async function ProfileCard({ user }: { user: User }) {
  return (
    <div className="flex items-center rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-2">
        <div className="bg-white px-6">
          <div className="flex items-center">
            <Image
              src="/customers/bumblebee.png"
              alt={`${user.name}'s profile picture`}
              className="mr-4 rounded-full"
              width={150}
              height={150}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold md:text-base">
                {user.name}
              </p>
              <p className="hidden text-sm text-gray-500 sm:block">
                {user.email}
              </p>
              <p className="hidden text-sm text-gray-500 sm:block">
                {user.phone_number}
              </p>
              <p className="hidden text-sm text-gray-500 sm:block">
                {user.address}, {user.city} {user.postcode}, {user.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
