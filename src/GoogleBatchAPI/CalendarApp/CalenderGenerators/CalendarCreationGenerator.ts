namespace BatchCalendarApp.Calendar.Generators{
    export class CalendarCreationGenerator implements BatchRequestQueue.BatchRequestGenerator {
        private _name: string;
        private _location?: string;
        private _summary?: string;
        private _timeZone?: string;

        private _promise: Promise<unknown>;
        private _promiseResolve!: (value: unknown) => void;
        private _promiseReject!: (value: unknown) => void;

        private _batchCalendar: BatchCalendarApp.BatchCalendar;
        
        // Removed the color and selected aspects of calendar as they relate to Calendar List Resource thus taking two requests to complete.
        //private _color?: boolean;
        //private _selected?: boolean;

        constructor(name: string, options?: BatchCalendarApp.CalendarCreationOptionsType){
            this._name = name;
            
            // Create Batch Calendar Object and update it with known Values
            this._batchCalendar = new BatchCalendar();
            this._batchCalendar._name = name;
            

            if(options) {
                this._location = options.location;
                this._summary = options.summary;
                this._timeZone = options.timeZone;
                // Removed the color and selected aspects of calendar as they relate to Calendar List Resource thus taking two requests to complete.
                //this._color = options.color;
                //this._selected = options.selected;


                this._batchCalendar._location = options.location;
                this._batchCalendar._summary = options.summary;
                this._batchCalendar._timeZone = options.timeZone;
            }

            // Create Promise
            this._promise = new Promise<unknown>((resolve, reject) => {
                this._promiseResolve = resolve;
                this._promiseReject = reject;
            });
        }

        public GetRequestOrderIndex(): number {
            return 0;
        }

        public GetRequest(): BatchRequest.RequestType { //TODO THIS
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
        public GetResponsePromise(): Promise<any> {
            return this._promise;
        }
        public ResolvePostRequestPromise(value: any): void {
            this._promiseResolve(value);
        }
        public RejectPostRequestPromise(reason: any): void {
            this._promiseReject(reason);
        }

        public UpdateFromParent(): void {}

        public GetCalendar(): BatchCalendarApp.BatchCalendar {
            return this._batchCalendar;
        }
        
    }
}