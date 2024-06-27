import { ClockLogo } from "@/_logos/clock";
import { ShiftLogo } from "@/_logos/shift";
import AuthButton from "@/components/ui/auth-btn";
import { auth } from "@/auth";
import Link from "next/link";

export default async function NavBar() {
  const session = await auth();
  const userEmail = session?.user?.email;
  return (
    <div className="w-full h-14 shadow-sm border border-orange-200">
      <div className="flex justify-between items-center max-w-[1024px] mx-auto h-full">
        <Link href="/" className="flex justify-center items-center gap-2 mx-4">
          <h1 className="lg:text-2xl md:text-2xl font-bold">ClockShift</h1>
          <div className="flex">
            <ClockLogo />
            <ShiftLogo />
          </div>
        </Link>
        <div className="flex justify-center items-center mx-4">
          <AuthButton isUserLoggedIn={!!userEmail} />
        </div>
      </div>
    </div>
  );
}
