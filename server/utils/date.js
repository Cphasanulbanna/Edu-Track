import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import duration from "dayjs/plugin/duration.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export const  convertUTCtoIST = (date) => {
    return dayjs(date).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
}

export const convertToDateOnly = (date) => {
    return dayjs(date).tz("Asia/Kolkata").format('YYYY-MM-DD')
}

export const getTimeDifference = (startTime, endTime) => {
    return dayjs(endTime).diff(dayjs(startTime), "minutes")
}

export const  convertMinutesToHoursMinutes =(minutes) => {
    const hours = Math.floor(minutes / 60); 
    const remainingMinutes = minutes % 60; 
    return `${hours}:${remainingMinutes}`;
}

export const COLLEGE_CHECK_IN_TIME = dayjs().hour(9).minute(0).second(0).millisecond(0);
export const COLLEGE_CHECK_OUT_TIME = dayjs().hour(15).minute(30).second(0).millisecond(0);