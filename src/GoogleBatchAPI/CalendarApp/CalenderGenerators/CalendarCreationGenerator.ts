namespace BatchCalendarApp.Calendar.Generators{
    let QueuedProperty = BatchRequestUtils.QueuedProperty;

    type responseType = {
        "kind": "calendar#calendar",
        "etag": string,
        "id": string,
        "summary": string, // Note: According to Batch API summary is the name of the calender but in GAS summary is the description of the calendar
        "description": string,
        "location": string,
        "timeZone": string,
        "conferenceProperties": {
          "allowedConferenceSolutionTypes": ("eventHangout" | "eventNamedHangout" | "hangoutsMeet")[]
        }
      }
    export class CalendarCreationGenerator extends BatchRequestQueue.BatchRequestGenerator {
        private _name: BatchRequestUtils.QueuedProperty<string>;
        private _location?: string | BatchRequestUtils.QueuedProperty<string>;
        private _summary?: string | BatchRequestUtils.QueuedProperty<string>;
        private _timeZone?: string | BatchRequestUtils.QueuedProperty<string>;

        private _batchCalendar: BatchCalendarApp.BatchCalendar;
        
        // Removed the color and selected aspects of calendar as they relate to Calendar List Resource thus taking two requests to complete.
        //private _color?: boolean;
        //private _selected?: boolean;

        constructor(name: string | BatchRequestUtils.QueuedProperty<string>, options?: BatchCalendarApp.CalendarCreationOptionsType){
            super();

            this._name = this.extractPriority(name);
            
            // Create Batch Calendar Object and update it with known Values
            this._batchCalendar = new BatchCalendar();
            this._batchCalendar._name = this._name;
            
            if(options) this.extractPriorityFromOptions(options);

            this.createQueuedProperties(name, options);

            let test = this;
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

        private extractPriorityFromOptions(options: BatchCalendarApp.CalendarCreationOptionsType) {
            this._location = this.extractPriority(options.location);
            this._summary = this.extractPriority(options.summary);
            this._timeZone = this.extractPriority(options.timeZone);
            // Removed the color and selected aspects of calendar as they relate to Calendar List Resource thus taking two requests to complete.
            //this._color = options.color;
            //this._selected = options.selected;
        }

        private createQueuedProperties(name: string | BatchRequestUtils.QueuedProperty<string>, options: BatchCalendarApp.CalendarCreationOptionsType | undefined) {
            this._batchCalendar._etag = this.createQueuedProperty<string>();
            this._batchCalendar._id = this.createQueuedProperty<string>();
            this._batchCalendar._name = this.createQueuedProperty<string>(name);
            this._batchCalendar._accessRole = this.createQueuedProperty<"owner">("owner");
            
            if(options){
                this._batchCalendar._summary = this.createQueuedProperty<string>(options.summary);
                this._batchCalendar._location = this.createQueuedProperty<string>(options.location);
                this._batchCalendar._timeZone = this.createQueuedProperty<string>(options.timeZone);
            }else{
                this._batchCalendar._summary = this.createQueuedProperty<string>();
                this._batchCalendar._location = this.createQueuedProperty<string>();
                this._batchCalendar._timeZone = this.createQueuedProperty<string>();
            }
            
        }

        private createQueuedProperty<T>(prop?: T | BatchRequestUtils.QueuedProperty<T>): BatchRequestUtils.QueuedProperty<T> {
            if(prop) return QueuedProperty.enforceQueuedProperty(prop);
            else return new QueuedProperty<T>(this.GetRequestPriority());
        }

        protected override updateDependencies(response: responseType): void {
            // All of these Queued Properties were created in the constructor of this class so under no circumstance should any of these values be undefined(Exclamation Point). If any of these are undefined there are serious problems.
            this._batchCalendar._etag!.value = response.etag;
            this._batchCalendar._id!.value = response.id;
            this._batchCalendar._name!.value = response.summary;
            this._batchCalendar._summary!.value = response.description;
            this._batchCalendar._location!.value = response.location;
            this._batchCalendar._timeZone!.value = response.timeZone;
        }
    }
}