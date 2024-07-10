import BrandLogo from "@/public/brand-logo.svg";
import AuthButton from "@/components/ui/auth-btn";
import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";

export default async function NavBar() {
  const session = await auth();
  const userEmail = session?.user?.email;
  return (
    <div className="w-full fixed bg-white top-0 h-16 shadow-sm border border-gray-[#DFF1F4]">
      <div className="flex justify-between items-center max-w-[1024px] mx-auto h-full">
        <Link href="/" className="flex justify-center items-center gap-2 mx-4">
          <Image
            src={BrandLogo}
            alt="brand logo"
            className="lg:w-[180px] md:w-[160px] w-[150px] h-[175px]"
          />
        </Link>
        <div className="flex justify-center items-center mx-4">
          <AuthButton isUserLoggedIn={!!userEmail} />
        </div>
      </div>
    </div>
  );
}
