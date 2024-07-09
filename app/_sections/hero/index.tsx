import Image from "next/image";
import HeroImage from "@/public/hero.svg";
import Clock from "@/public/clock.svg";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto items-center text-center lg:mt-[130px] md:mt-[95px] mt-[90px] p-4">
      <h1 className="lg:text-6xl md:text-4xl text-3xl text-gray-900 font-bold mb-4">
        Your Time, Any Zone, Instantly
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl">
        Instantly convert any time to any zone with precision and ease, ensuring
        you stay organized and on time across the globe. Your go-to solution for
        seamless time zone conversions.
      </p>
      <Button className="flex justify-center items-center gap-2 mt-7 p-6 rounded-3xl">
        <span>Try it out</span>
        <span>
          <Image src={Clock} alt="clock icon" width={20} height={20} />
        </span>
      </Button>
      <Image src={HeroImage} alt="Hero Image" className="w-[650px]" />
    </div>
  );
}
