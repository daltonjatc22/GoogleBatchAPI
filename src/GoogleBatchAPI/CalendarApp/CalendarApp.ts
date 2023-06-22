namespace BatchCalendarApp {
    export type CalendarCreationOptionsType = {
        location: string;
        summary: string;
        timeZone: string;
        // Removed the color and selected aspects of calendar as they relate to Calendar List Resource thus taking two requests to complete.
        // color: boolean;
        // selected: boolean;
      };
    function createCalendar( name: string, options?: CalendarCreationOptionsType): BatchCalendar {
        let Generator  = new Calendar.Generators.CalendarCreationGenerator(name, options);

        BatchRequestQueue.QueueRequest("calendar", Generator);
        return Generator.GetCalendar();
    }

    //function getAllCalendars(): Calendar[];
    //function getAllOwnedCalendars(): Calendar[];

    /**
    function getCalendarById(id: string): Calendar | null;
    function getCalendarsByName(name: string): Calendar[] | null;
    function getDefaultCalendar(): Calendar;
    function getOwnedCalendarById(id: string): Calendar | null;
    function getOwnedCalendarsByName(name: string): Calendar[] | null;
    function newRecurrence(): EventRecurrence;
    function subscribeToCalendar(
    id: string,
    options?: { [key: string]: any }
    ): Calendar;

    */
}