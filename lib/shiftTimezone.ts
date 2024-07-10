import { DateTime } from "luxon";
import { TimeInput } from "@/types/timeinput";

const shiftTimezone = ({
  time,
  timezoneFrom,
  timezoneTo,
  selectedDate,
}: TimeInput) => {
  try {
    // Combine the selected date and time
    const dateTimeString = `${selectedDate}T${time}`;

    // Parse the date and time in the 'from' timezone
    const dateTimeFrom = DateTime.fromISO(dateTimeString, {
      zone: timezoneFrom,
    });

    // Convert to the 'to' timezone
    const dateTimeTo = dateTimeFrom.setZone(timezoneTo);

    return dateTimeTo.toISO();
  } catch (error) {
    console.error("Error converting timezones", error);
    return "";
  }
};

export default shiftTimezone;
