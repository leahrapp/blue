export const TwelveHourClock: Map<number, {}> = TwelveHourClockMap(1, 12, 0, 60);
export const TwentyFourHourClock: Map<number, {}> = ClockMap(0, 23, 0, 60);
export const ApptClock: Map<number, {}> = ClockMap(0, 24, 1, 90);
export const MinuteClock :Map<number, string>= MinuteMap(0, 60); 

function TwelveHourClockMap(hourMin: number, hourMax: number, minuteMin: number, minuteMax: number): Map<number, {}> {

    const timeMap = new Map();
    const minuteMap: Map<number, string> = MinuteMap(minuteMin, minuteMax);

    for (let i = hourMin; i <= hourMax; i++) {
        timeMap.set(i, { hour: StringTime(i), minutes: minuteMap })
    }

    for (let i = 13; i <= 24; i++) {
        const half = StringTime(i - 12)
        
        timeMap.set(i, { hour:half, minutes: minuteMap })
    }


    return timeMap;
}

function ClockMap(hourMin: number, hourMax: number, minuteMin: number, minuteMax: number): Map<number, {}> {

    const timeMap = new Map();
    const minuteMap: Map<number, string> = MinuteMap(minuteMin, minuteMax);

    for (let i = hourMin; i <= hourMax; i++) {

        timeMap.set(i, { hour: StringTime(i), minutes: minuteMap })

    }

    return timeMap;
}

function MinuteMap(minMin: number, minMax: number): Map<number, string> {
    const minuteMap = new Map();

    for (var i = minMin; i <= minMax; i++) {

        minuteMap.set(i, StringTime(i))
    }
    return minuteMap

}

function StringTime(timeUnit: number): string {

    return (timeUnit > 9) ? timeUnit.toString() : "0" + timeUnit;




}

export interface ITimeConstant {
    id: number;
    time: string;
}




export const Hours: ITimeConstant[] = TimeFormat(12);
export const Minutes: ITimeConstant[] = TimeFormat(60);
function TimeFormat(stopper: number): ITimeConstant[] {

    var times = new Array<ITimeConstant>();
    for (var i = 0; i <= stopper; i++) {

        var j = i.toString();
        if (j.length < 2) { }
        j = "0" + j;

        times.push({
            id: i,
            time: j
        })
    }

    return times.sort();
};


