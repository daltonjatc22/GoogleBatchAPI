function test(){
    let options: BatchCalendarApp.CalendarCreationOptionsType = 
    {
        summary: new BatchRequestQueue.RequestGenerator.QueuedProperty(1, "My test Calendar")
    };

    BatchCalendarApp.createCalendar("testCalendar", options);
    BatchRequestQueue.SubmitRequests();

    //let p = new BatchRequestQueue.RequestGenerator.QueuedProperty(0, {a: 1});

    //Logger.log(JSON.stringify(p));
}