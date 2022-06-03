
export class Appointment implements IAppointment{

    timeStartHour:string='12'; 
    timeStartMin:string='00'; 
    apptLengthHours:string='00';
    apptLengthMinutes:string='30'; 
meridiem: number=0;
}


export interface IAppointment{
    timeStartHour:string; 
    timeStartMin:string; 
    apptLengthHours:string;
    apptLengthMinutes:string; 
    meridiem:number;

    
}

export class AppointmentSummary{

    timeStart:string=""; 
    timeEnd:string=""; 
    apptLength:string=""; 


}
