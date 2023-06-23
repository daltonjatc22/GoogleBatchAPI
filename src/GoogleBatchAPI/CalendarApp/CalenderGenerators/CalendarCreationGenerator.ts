namespace BatchCalendarApp.Calendar.Generators{
    export class CalendarCreationGenerator extends BatchRequestQueue.BatchRequestGenerator {
        private _name: string | BatchRequestQueue.RequestGenerator.QueuedProperty<string>;
        private _location?: string | BatchRequestQueue.RequestGenerator.QueuedProperty<string>;
        private _summary?: string | BatchRequestQueue.RequestGenerator.QueuedProperty<string>;
        private _timeZone?: string | BatchRequestQueue.RequestGenerator.QueuedProperty<string>;

        private _batchCalendar: BatchCalendarApp.BatchCalendar;
        
        // Removed the color and selected aspects of calendar as they relate to Calendar List Resource thus taking two requests to complete.
        //private _color?: boolean;
        //private _selected?: boolean;

        constructor(name: string, options?: BatchCalendarApp.CalendarCreationOptionsType){
            super();

            this._name = this.extractPriority(name);
            
            // Create Batch Calendar Object and update it with known Values
            this._batchCalendar = new BatchCalendar();
            this._batchCalendar._name = this._name;
            
            if(options) {
                this._location = this.extractPriority(options.location);
                this._summary = this.extractPriority(options.summary);
                this._timeZone = this.extractPriority(options.timeZone);
                // Removed the color and selected aspects of calendar as they relate to Calendar List Resource thus taking two requests to complete.
                //this._color = options.color;
                //this._selected = options.selected;


                this._batchCalendar._location = options.location;
                this._batchCalendar._summary = options.summary;
                this._batchCalendar._timeZone = options.timeZone;
            }
        }

        public GetCalendar(): BatchCalendarApp.BatchCalendar {
            return this._batchCalendar;
        }


        public override GetRequest(): BatchRequest.RequestType { //TODO THIS
            let request = {
                method: "POST",
                endpoint: "https://www.googleapis.com/calendar/v3/calendars",
                requestBody: {
                    summary: this._name,
                    location: this._location,
                    description: this._summary,
                    timeZone: this._timeZone
                }
            }

            return request;
        }
    }
}