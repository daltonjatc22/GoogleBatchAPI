namespace BatchCalendarApp {
    /*
    function errorIfNull(){
        if(!this.value){
            if(this.priority) throw new Error(`Unable to get value this property has a priority of ${this.priority}, please wait until after requests of priority ${this.priority} have been submitted`)
        }
    }*/
    export class BatchCalendar {
        public _etag?: BatchRequestUtils.QueuedProperty<string>;
        public _name?: BatchRequestUtils.QueuedProperty<string>;
        public _id?: BatchRequestUtils.QueuedProperty<string>;
        public _summary?: BatchRequestUtils.QueuedProperty<string>;
        public _accessRole?: BatchRequestUtils.QueuedProperty< "freeBusyReader" | "owner" | "reader" | "writer" >;

        public _location?: BatchRequestUtils.QueuedProperty<string>;
        public _timeZone?: BatchRequestUtils.QueuedProperty<string>;
        public _foregroundColor?: BatchRequestUtils.QueuedProperty<string>;
        public _backgroundColor?: BatchRequestUtils.QueuedProperty<string>;
        public _hidden?: BatchRequestUtils.QueuedProperty<boolean>;
        public _selected?: BatchRequestUtils.QueuedProperty<boolean>;

        private _creationError?: Error;


        constructor(creationError?: Error){
            this._creationError = creationError;
        }
    //createAllDayEvent(title: string, date: GoogleAppsScript.Base.Date): GoogleAppsScript.Calendar.CalendarEvent;
    //createAllDayEvent(title: string, startDate: GoogleAppsScript.Base.Date, endDate: GoogleAppsScript.Base.Date): GoogleAppsScript.Calendar.CalendarEvent;
    //createAllDayEvent(title: string, startDate: GoogleAppsScript.Base.Date, endDate: GoogleAppsScript.Base.Date, options: { [key: string]: any }): GoogleAppsScript.Calendar.CalendarEvent;
    //createAllDayEvent(title: string, date: GoogleAppsScript.Base.Date, options: { [key: string]: any }): GoogleAppsScript.Calendar.CalendarEvent;
    //createAllDayEventSeries(title: string, startDate: GoogleAppsScript.Base.Date, recurrence: GoogleAppsScript.Calendar.EventRecurrence): GoogleAppsScript.Calendar.CalendarEventSeries;
    //createAllDayEventSeries(title: string, startDate: GoogleAppsScript.Base.Date, recurrence: GoogleAppsScript.Calendar.EventRecurrence, options: { [key: string]: any }): GoogleAppsScript.Calendar.CalendarEventSeries;
    //createEvent(title: string, startTime: GoogleAppsScript.Base.Date, endTime: GoogleAppsScript.Base.Date): GoogleAppsScript.Calendar.CalendarEvent;
    //createEvent(title: string, startTime: GoogleAppsScript.Base.Date, endTime: GoogleAppsScript.Base.Date, options: { [key: string]: any }): GoogleAppsScript.Calendar.CalendarEvent;
    //createEventFromDescription(description: string): GoogleAppsScript.Calendar.CalendarEvent;
    //createEventSeries(title: string, startTime: GoogleAppsScript.Base.Date, endTime: GoogleAppsScript.Base.Date, recurrence: GoogleAppsScript.Calendar.EventRecurrence): GoogleAppsScript.Calendar.CalendarEventSeries;
    //createEventSeries(title: string, startTime: GoogleAppsScript.Base.Date, endTime: GoogleAppsScript.Base.Date, recurrence: GoogleAppsScript.Calendar.EventRecurrence, options: { [key: string]: any }): GoogleAppsScript.Calendar.CalendarEventSeries;
    //deleteCalendar(): void;
    //getColor(): string;
    //getDescription(): string;
    //getEventById(iCalId: string): GoogleAppsScript.Calendar.CalendarEvent;
    //getEventSeriesById(iCalId: string): GoogleAppsScript.Calendar.CalendarEventSeries;
    //getEvents(startTime: GoogleAppsScript.Base.Date, endTime: GoogleAppsScript.Base.Date): GoogleAppsScript.Calendar.CalendarEvent[];
    //getEvents(startTime: GoogleAppsScript.Base.Date, endTime: GoogleAppsScript.Base.Date, options: { [key: string]: any }): GoogleAppsScript.Calendar.CalendarEvent[];
    //getEventsForDay(date: GoogleAppsScript.Base.Date): GoogleAppsScript.Calendar.CalendarEvent[];
    //getEventsForDay(date: GoogleAppsScript.Base.Date, options: { [key: string]: any }): GoogleAppsScript.Calendar.CalendarEvent[];
    //getId(): string;
    //getName(): string;
    //getTimeZone(): string;
    //isHidden(): boolean;
    //isMyPrimaryCalendar(): boolean;
    //isOwnedByMe(): boolean;
    //isSelected(): boolean;
    //setColor(color: string): Calendar;
    //setDescription(description: string): Calendar;
    //setHidden(hidden: boolean): Calendar;
    //setName(name: string): Calendar;
    //setSelected(selected: boolean): Calendar;
    //setTimeZone(timeZone: string): Calendar;
    //unsubscribeFromCalendar(): void;

    private throwCreationError(){
        throw this._creationError;
    }
}
}