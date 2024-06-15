"use client";
import { SetStateAction, useState } from "react";
import Select from "react-select";
import { TimeZones } from "@/constants/timezones";
import shiftTimezone from "@/lib/shiftTimezone";
import { DateTime } from "luxon";

const TimeInput = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedTimeZoneFrom, setSelectedTimeZoneFrom] = useState("");
  const [selectedTimeZoneTo, setSelectedTimeZoneTo] = useState("");
  const [convertedTime, setConvertedTime] = useState("");
  const [originalTime, setOriginalTime] = useState("");

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

  const handleTimeZoneFromChange = (selectedOption: {
    value: SetStateAction<string>;
  }) => {
    setSelectedTimeZoneFrom(selectedOption.value);
  };

  const handleTimeZoneToChange = (selectedOption: {
    value: SetStateAction<string>;
  }) => {
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
      });

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
              value={TimeZones.find((tz) => tz.tzCode === selectedTimeZoneFrom)}
              onChange={handleTimeZoneFromChange}
              options={TimeZones.map(({ label, tzCode }) => ({
                label,
                value: tzCode,
              }))}
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
              value={TimeZones.find((tz) => tz.tzCode === selectedTimeZoneTo)}
              onChange={handleTimeZoneToChange}
              options={TimeZones.map(({ label, tzCode }) => ({
                label,
                value: tzCode,
              }))}
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
          <div>
            <button
              type="submit"
              className="bg-[#FF8F00] p-3 rounded-xl shadow-md font-bold"
            >
              Convert
            </button>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeInput;
