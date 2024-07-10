import TotalTimezones from "@/public/100_timezones.svg";
import SaveTimezone from "@/public/save_timezone.svg";
import AutomaticTimezone from "@/public/automatic_timezone.jpg";
import CalendarSync from "@/public/calendar_integration.svg";

import Image from "next/image";
export default function Features() {
  return (
    <div className="flex flex-col max-w-5xl justify-center items-center mt-10 mx-auto">
      <h2 className="text-center text-gray-900 text-3xl font-bold md:text-4xl lg:text-5xl">
        Discover <span className="text-[#FF851B]">Key Features</span>
      </h2>
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="flex flex-wrap items-center">
          <div className="w-full p-6 sm:w-1/2 md:mt-8">
            <h3 className="mb-3 p-2 rounded-xl w-fit bg-[#DFF1F4] text-2xl font-bold leading-none text-black md:text-3xl">
              100+ time zones
            </h3>
            <p className="text-gray-600">
              Access over 100+ time zones for precise conversions. From major
              cities to remote regions, ensure accurate timekeeping worldwide.
            </p>
          </div>
          <div className="w-full p-6 sm:w-1/2">
            <Image
              src={TotalTimezones}
              alt="100 time zones"
              width={250}
              height={250}
              className="mx-auto"
            />
          </div>
        </div>
        <div className="flex flex-col-reverse flex-wrap sm:flex-row items-center">
          <div className="w-full p-6 sm:w-1/2">
            <Image
              src={SaveTimezone}
              alt="100 time zones"
              width={250}
              height={250}
              className="mx-auto"
            />
          </div>
          <div className="w-full p-6 sm:w-1/2 md:mt-8">
            <h3 className="mb-3 p-2 rounded-xl w-fit bg-[#DFF1F4] text-2xl font-bold leading-none text-black md:text-3xl">
              Save favourite timezone
            </h3>
            <p className="text-gray-600">
              Save frequently used time zone conversions for easy access. Manage
              and compare time differences for important events and meetings.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          <div className="w-full p-6 sm:w-1/2 md:mt-8">
            <h3 className="mb-3 p-2 rounded-xl w-fit bg-[#DFF1F4] text-2xl font-bold leading-none text-black md:text-3xl">
              Automatic timezone detection
            </h3>
            <p className="text-gray-600">
              Effortlessly identify your current time zone with automatic
              detection. Enjoy instant, location-based adjustments for accuracy.
            </p>
          </div>
          <div className="w-full p-6 sm:w-1/2">
            <Image
              src={AutomaticTimezone}
              alt="Automatic timezone detection"
              width={250}
              height={250}
              className="mx-auto"
            />
          </div>
        </div>
        <div className="flex flex-col-reverse flex-wrap sm:flex-row items-center">
          <div className="w-full p-6 sm:w-1/2">
            <Image
              src={CalendarSync}
              alt="Calendar Sync"
              width={250}
              height={250}
              className="mx-auto"
            />
          </div>
          <div className="w-full p-6 sm:w-1/2 md:mt-8">
            <h3 className="mb-3 p-2 rounded-xl w-fit bg-[#DFF1F4] text-2xl font-bold leading-none text-black md:text-3xl">
              Calendar sync
            </h3>
            <p className="text-gray-600">
              Sync with Google Calendar and Outlook. Incorporate time zone
              conversions into your schedule for global appointments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
