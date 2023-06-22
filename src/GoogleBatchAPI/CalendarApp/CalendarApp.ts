namespace BatchCalendarApp {
  function createCalendar(
    name: string,
    options?: {
      location: string;
      summary: string;
      timeZone: string;
      color: boolean;
      selected: boolean;
    }
  ): Calendar {
    
  }

  //function getAllCalendars(): Calendar[];
  //function getAllOwnedCalendars(): Calendar[];
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
}
