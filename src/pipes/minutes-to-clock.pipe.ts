import { Pipe, PipeTransform } from '@angular/core';
import { TwelveHourMap, MinuteMap } from "src/app/constants/Clock.interface";

@Pipe({ name: 'minuteToHour' })
export class MinuteToHourPipe implements PipeTransform {
  transform(value: number): string {

    var retTime = ""
    var meridiem = "am";

    if (value % 15 == 0) {

      if (TwelveHourMap.has(Math.floor(value / 60))) {

        retTime += TwelveHourMap.get(Math.floor(value / 60));

        if (value / 60 > 11) {
          meridiem = "pm";
        }
      }
      else{
        retTime+="12";
      }

      retTime += ":"

      const idk = (value % 60);
      if (MinuteMap.has(idk)) {

        retTime += MinuteMap.get(idk);
      }

      retTime += " " + meridiem;

    }

    return retTime;
  }
}