function test(){
    /*
    let options: BatchCalendarApp.CalendarCreationOptionsType = 
    {
        summary: new BatchRequestUtils.QueuedProperty(1, "My test Calendar")
    };

    BatchCalendarApp.createCalendar("testCalendar", options);
    let primary = BatchCalendarApp.getDefaultCalendar();
    BatchRequestQueue.SubmitRequests();
    */

    let test = BatchRequestUtils.newQueuedArray(BatchCalendarApp.BatchCalendar);

    Logger.log(test[0]);
    Logger.log(test[3]);

    test[1]._id = new BatchRequestUtils.QueuedProperty(-1, "hi");
}