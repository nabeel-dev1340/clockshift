import { Hero } from "./_sections/hero";
import TimeInput from "./_sections/timeinput";
import { SessionProvider } from "next-auth/react";

export default async function Home() {

  return (
    <div>
      <Hero />
      <SessionProvider>
        <TimeInput />
      </SessionProvider>
    </div>
  );
}
