/// <reference path="CalenderGenerators/CalendarCreationGenerator.ts" />

namespace BatchCalendarApp {
    export let maxNumOfCalendarsListedInASingleRequest = 100;
    
    export type CalendarCreationOptionsType = {
        location?: string | BatchRequestUtils.QueuedProperty<string>;
        summary?: string | BatchRequestUtils.QueuedProperty<string>;
        timeZone?: string | BatchRequestUtils.QueuedProperty<string>;
        // Removed the color and selected aspects of calendar as they relate to Calendar List Resource thus taking two requests to complete.
        // color: boolean;
        // selected: boolean;
      };

    let calendarList: BatchCalendar[] = [];

    /**
     * Creates a new calendar, owned by the user.
     * @param name the name of the new calendar
     * @param options an object that specifies advanced parameters
     * @returns BatchCalendar: the newly created calendar
     */
    export function createCalendar( name: string, options?: CalendarCreationOptionsType): BatchCalendar {
        let Generator  = new Calendar.Generators.CalendarCreationGenerator(name, options);

        // Create Request
        BatchRequestQueue.QueueRequest("calendar", Generator);
        
        // append to list for future use
        calendarList.push(Generator.GetCalendar());
        return Generator.GetCalendar();
    }

    //function getAllCalendars(): Calendar[];
    //function getAllOwnedCalendars(): Calendar[];

    /**
     * Gets the calendar with the given ID.
     * Note: Only gets the calendar if the calendar is used, for example if getName() is called on the object. Under actual Google Documentation this function should return null but since it would take an extra request to check if it exists we will wait to see if this calendar exists.
     * @param id the calendar ID
     * @returns the calendar with the given ID, if the calendar does not exist, or if the user cannot access it, or if the user is not subscribed to the calendar the calendar will throw an error if any properties of the calendar are accessed.
     */
    export function getCalendarById(id: string): BatchCalendar{
        // Check if calendar is already obtained and known
        let newCalendar = getCalendarByIdIfExists(id);

        // if calendar doesn't exist create one
        if(!newCalendar) newCalendar = new BatchCalendar();
        newCalendar._id = new BatchRequestUtils.QueuedProperty(-1, id);

        // Add calendar to list for future use
        calendarList.push(newCalendar);
        return newCalendar;
    }
    
    //function getCalendarsByName(name: string): Calendar[] | null;

    /**
     * Gets the user's default calendar.
     * @returns BatchCalendar: the user's default calendar
     */
    export function getDefaultCalendar(): BatchCalendar {
        return getCalendarById("primary");
    }

    /**
    function getOwnedCalendarById(id: string): Calendar | null;
    function getOwnedCalendarsByName(name: string): Calendar[] | null;
    function newRecurrence(): EventRecurrence;
    function subscribeToCalendar(
    id: string,
    options?: { [key: string]: any }
    ): Calendar;

    */

    export function getCalendarByIdIfExists(id: string): BatchCalendar | null {
        for (let i = 0; i < calendarList.length; i++) {
            const  calendar = calendarList[i];
            if(calendar._id && calendar._id.hasValue() && calendar._id.valueOf() === id){
                return calendar;
            }
        }
        return null;
    }
}
