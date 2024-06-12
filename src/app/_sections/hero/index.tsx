import { ClockLogo } from "@/app/_logos/clock";
import { ShiftLogo } from "@/app/_logos/shift";

export function Hero() {
  return (
    <div className="flex flex-col text-center mt-20">
      <div className="flex justify-center items-center gap-2">
        <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold">
          ClockShift
        </h1>
        <div className="flex">
          <ClockLogo />
          <ShiftLogo />
        </div>
      </div>
      <p className="text-xl mt-2">
      Seamlessly Shift Time Zones – Anywhere, Anytime.
      </p>
    </div>
  );
}
