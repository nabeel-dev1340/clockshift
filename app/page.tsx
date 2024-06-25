import AuthButton from "@/components/ui/auth-btn";
import { Hero } from "./_sections/hero";
import TimeInput from "./_sections/timeinput";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const userEmail = session?.user?.email;

  return (
    <div>
      <AuthButton isUserLoggedIn={!!userEmail} />
      <Hero />
      <TimeInput />
    </div>
  );
}
