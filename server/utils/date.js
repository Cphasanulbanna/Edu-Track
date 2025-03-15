import dayjs from "dayjs";

export const getTimeFromDate = (date) => {
    return dayjs(date).format('HH:mm:ss');
}