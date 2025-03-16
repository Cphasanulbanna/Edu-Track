import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const  convertUTCtoIST = (date) => {
    return dayjs(date).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
}

export const COLLEGE_CHECK_IN_TIME = dayjs().hour(9).minute(0).second(0).millisecond(0);