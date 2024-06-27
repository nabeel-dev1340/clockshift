"use client";
import { SetStateAction, useState } from "react";
import Select from "react-select";
import { TimeZones } from "@/constants/timezones";
import shiftTimezone from "@/lib/shiftTimezone";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import StarLogo from "@/_logos/star";
import { saveFavourite } from "./action";

const TimeInput = () => {
  const session = useSession();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedTimeZoneFrom, setSelectedTimeZoneFrom] = useState("");
  const [selectedTimeZoneTo, setSelectedTimeZoneTo] = useState("");
  const [convertedTime, setConvertedTime] = useState("");
  const [originalTime, setOriginalTime] = useState("");
  const [timeDifference, setTimeDifference] = useState("");

  const handleDateChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTime(event.target.value);
  };

  const handleTimeZoneFromChange = (selectedOption: any) => {
    setSelectedTimeZoneFrom(selectedOption.value);
  };

  const handleTimeZoneToChange = (selectedOption: any) => {
    setSelectedTimeZoneTo(selectedOption.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (date && time && selectedTimeZoneFrom && selectedTimeZoneTo) {
      const original = `${date}T${time}`;
      const converted = shiftTimezone({
        time,
        timezoneFrom: selectedTimeZoneFrom,
        timezoneTo: selectedTimeZoneTo,
        selectedDate: date,
      }) as string;

      const date1 = new Date(original);
      const date2 = new Date(converted.split(".")[0]);

      // Calculate the difference in milliseconds
      const diffInMs = date1.getTime() - date2.getTime();

      // Convert the difference to hours and minutes
      const diffInMinutes = Math.abs(Math.floor(diffInMs / (1000 * 60)));
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;

      // Determine if the time is ahead or behind
      const timeStatus = diffInMs > 0 ? "ahead" : "behind";

      // Construct the time difference string
      let timeDifferenceString = "";
      if (hours > 0) {
        timeDifferenceString += `${hours} hour(s) `;
      }
      if (minutes > 0) {
        timeDifferenceString += `${minutes} minutes `;
      }
      if (timeDifferenceString) {
        timeDifferenceString += timeStatus;
      } else {
        timeDifferenceString = "No difference";
      }

      // Format the original and converted times
      const originalDateTime = DateTime.fromISO(original, {
        zone: selectedTimeZoneFrom,
      });
      const convertedDateTime = DateTime.fromISO(converted as string, {
        zone: selectedTimeZoneTo,
      });

      // Function to format DateTime to 12-hour format
      const to12HourFormat = (dateTime: DateTime) => {
        return dateTime.toLocaleString({
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      };

      // Set formatted times
      setOriginalTime(
        `${to12HourFormat(originalDateTime)} ${selectedTimeZoneFrom}`
      );
      setConvertedTime(
        `${to12HourFormat(convertedDateTime)} ${selectedTimeZoneTo}`
      );
      setTimeDifference(timeDifferenceString);
    }
  };

  return (
    <div className="flex items-center justify-center lg:mt-14 mt-10">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg lg:max-w-sm md:max-w-sm max-w-[350px] w-full mx-2">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Let&apos;s Shift Timezones
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <div>
            <label
              htmlFor="time"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter Time (HH:MM)
            </label>
            <input
              type="time"
              name="time"
              value={time}
              onChange={handleTimeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="timezoneFrom"
              className="block text-gray-700 font-medium mb-2"
            >
              Select Time Zone (From)
            </label>
            <Select
              name="timezoneFrom"
              value={TimeZones.find((tz) => tz.value === selectedTimeZoneFrom)}
              onChange={handleTimeZoneFromChange}
              options={TimeZones}
              className="w-full"
              required
            />
          </div>
          <div>
            <label
              htmlFor="timezoneTo"
              className="block text-gray-700 font-medium mb-2"
            >
              Select Time Zone (To)
            </label>
            <Select
              name="timezoneTo"
              value={TimeZones.find((tz) => tz.value === selectedTimeZoneTo)}
              onChange={handleTimeZoneToChange}
              options={TimeZones}
              className="w-full"
              required
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-2"
            >
              Select Date
            </label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="bg-[#FF8F00] p-3 rounded-xl shadow-md font-bold"
            >
              Convert
            </button>
            {convertedTime && (
              <div
                onClick={async () => {
                  saveFavourite(
                    selectedTimeZoneFrom,
                    selectedTimeZoneTo,
                    "My Fav",
                    session?.data?.user?.email as string
                  );
                }}
                className="flex gap-2 items-center justify-center bg-white p-3 shadow-md rounded-xl font-bold text-center cursor-pointer"
              >
                <span>Add to Favourites</span>
                <span>
                  <StarLogo />
                </span>
              </div>
            )}
          </div>
        </form>
        {convertedTime && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            <p>
              <strong>Original Time:</strong> {originalTime}
            </p>
            <p>
              <strong>Converted Time:</strong> {convertedTime}
            </p>
            <div className="mt-4 p-4 bg-blue-100 rounded-md">
              <p className="font-bold mb-2">Time Difference:</p>
              <p className="text-lg text-green-700">{timeDifference}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeInput;
