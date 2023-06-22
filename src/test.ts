function test(){
    BatchCalendarApp.createCalendar("testCalendar");
    BatchRequestQueue.SubmitRequests();
}