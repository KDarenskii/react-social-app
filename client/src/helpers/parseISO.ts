export const parseISO = (date: string): { day: string; time: string } => {
    let [day, time] = date.split("T");
    day = day.split("-").reverse().join(".");
    time = time.substring(0, 5);
    return { day, time };
};
