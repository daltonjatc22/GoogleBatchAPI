namespace BatchCalendarApp.Calendar.Generators{
    type calendarListResourceType = {
        "kind": "calendar#calendarListEntry",
        "etag": string,
        "id": string,
        "summary": string,
        "description": string,
        "location": string,
        "timeZone": string,
        "summaryOverride": string,// Ignore
        "colorId": string,// Ignore
        "backgroundColor": string,
        "foregroundColor": string,
        "hidden": boolean,
        "selected": boolean,
        "accessRole": "freeBusyReader" | "owner" | "reader" | "writer",
        "defaultReminders": [ //Ignore
          {
            "method": string,
            "minutes": number//int
          }
        ],
        "notificationSettings": {// Ignore
          "notifications": [
            {
              "type": string,
              "method": string
            }
          ]
        },
        "primary": boolean,// Ignore
        "deleted": boolean,// Ignore
        "conferenceProperties": {// Ignore
          "allowedConferenceSolutionTypes": [
            string
          ]
        }
      };

    type responseType = {
        "kind": "calendar#calendarList",
        "etag": string,
        "nextPageToken": string,
        "nextSyncToken": string,
        "items": calendarListResourceType[]
      };
    export class ListCalendarsGenerator extends BatchRequestQueue.BatchRequestGenerator {
        constructor(){
            super();
        }

        public override GetRequest(): BatchRequest.RequestType { //TODO THIS
            let request = {
                method: "POST",
                endpoint: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
                requestBody: {
                    maxResults: BatchCalendarApp.maxNumOfCalendarsListedInASingleRequest,
                    showHidden: true,
                }
            }

            return request;
        }

        protected override updateDependencies(response: responseType): void {
            for(let i = 0; i < response.items.length; i++){
                this.createCalendar(response.items[i]);
            }
        }

        private createCalendar(){
            let newCalendar = new BatchCalendar();
            let priority = this.GetRequestPriority();

            newCalendar._etag = new BatchRequestUtils.QueuedProperty(priority);
            newCalendar._name = new BatchRequestUtils.QueuedProperty(priority);
            newCalendar._summary = new BatchRequestUtils.QueuedProperty(priority);
            newCalendar._location = new BatchRequestUtils.QueuedProperty(priority);
            newCalendar._timeZone = new BatchRequestUtils.QueuedProperty(priority);
            newCalendar._foregroundColor = new BatchRequestUtils.QueuedProperty(priority);
            newCalendar._backgroundColor = new BatchRequestUtils.QueuedProperty(priority);
            newCalendar._hidden = new BatchRequestUtils.QueuedProperty(priority);
            newCalendar._selected = new BatchRequestUtils.QueuedProperty(priority);
            newCalendar._accessRole = new BatchRequestUtils.QueuedProperty(priority);
        }

        private updateCalendar(calendarListResource: calendarListResourceType): void{
            let newCalendar = BatchCalendarApp.getCalendarById(calendarListResource.id);
            newCalendar._etag!.value = calendarListResource.etag;
            newCalendar._name = new BatchRequestUtils.QueuedProperty(-1, calendarListResource.summary);
            newCalendar._summary = new BatchRequestUtils.QueuedProperty(-1, calendarListResource.description);
            newCalendar._location = new BatchRequestUtils.QueuedProperty(-1, calendarListResource.location);
            newCalendar._timeZone = new BatchRequestUtils.QueuedProperty(-1, calendarListResource.timeZone);
            newCalendar._foregroundColor = new BatchRequestUtils.QueuedProperty(-1, calendarListResource.foregroundColor);
            newCalendar._backgroundColor = new BatchRequestUtils.QueuedProperty(-1, calendarListResource.backgroundColor);
            newCalendar._hidden = new BatchRequestUtils.QueuedProperty(-1, calendarListResource.hidden);
            newCalendar._selected = new BatchRequestUtils.QueuedProperty(-1, calendarListResource.selected);
            newCalendar._accessRole = new BatchRequestUtils.QueuedProperty(-1, calendarListResource.accessRole);
        }

    }
}