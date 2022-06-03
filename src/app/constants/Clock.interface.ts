import { Injectable } from "@angular/core";


export interface Clock {

    HourClock: Map<number, string>;
    MinuteClock: Map<number, string>;

    ClockMap(min: number, max: number): Map<number, string>;

}

export const TwentyFourMap:Map<number, string>=idk(0, 23); 
export const MinuteMap:Map<number, string>=idk(0, 60); 
export const TwelveHourMap:Map<number, string>=TwelveHourClock(1, 12); 

export function idk(min:number, max:number):Map<number, string>{
    
    let hourMap = new Map<number, string>(); 

    for (var i = min; i <= max; i++) {

        hourMap.set(i, StringClock(i))
    }
    


    return hourMap; 

}

function TwelveHourClock(min:number, max:number):Map<number, string>{
    
    const clockMap = new Map();

    for (var i = min; i <= max; i++) {

        clockMap.set(i, StringClock(i))
    }
    if (max == 12) {

        for (let i = 13; i <= 24; i++) {
            const half = StringClock(i - 12)

            clockMap.set(i, half);
        }

    }
    return clockMap
}

export class TwentyFourHour implements Clock {

    HourClock: Map<number, string> = this.ClockMap(0, 23);
    MinuteClock: Map<number, string> = this.ClockMap(0, 60);;

    ClockMap(min: number, max: number): Map<number, string> {

        const minuteMap = new Map();

        for (var i = min; i <= max; i++) {

            minuteMap.set(i, this.StringTime(i))
        }
        return minuteMap
    }
    StringTime(timeUnit: number): string {

        return (timeUnit > 9) ? timeUnit.toString() : "0" + timeUnit;

    }
}

export class ApptHour implements Clock {

    HourClock: Map<number, string> = this.ClockMap(0, 23);
    MinuteClock: Map<number, string> = this.ClockMap(0, 90);;

    ClockMap(min: number, max: number): Map<number, string> {

        const minuteMap = new Map();

        for (var i = min; i <= max; i++) {

            minuteMap.set(i, this.StringTime(i))
        }
        return minuteMap
    }

    StringTime(timeUnit: number): string {

        return (timeUnit > 9) ? timeUnit.toString() : "0" + timeUnit;

    }
}


export class TwelveHour implements Clock {

    HourClock: Map<number, string> = this.ClockMap(1, 12);
    MinuteClock: Map<number, string> = this.ClockMap(0, 60);;

    ClockMap(min: number, max: number): Map<number, string> {

        const clockMap = new Map();

        for (var i = min; i <= max; i++) {

            clockMap.set(i, this.StringTime(i))
        }
        if (max == 12) {

            for (let i = 13; i <= 24; i++) {
                const half = this.StringTime(i - 12)

                clockMap.set(i, half);
            }

        }
        return clockMap
    }

    StringTime(timeUnit: number): string {

        return (timeUnit > 9) ? timeUnit.toString() : "0" + timeUnit;

    }


  
}

function  StringClock(timeUnit:number):string {
        
    return (timeUnit > 9) ? timeUnit.toString() : "0" + timeUnit;
}