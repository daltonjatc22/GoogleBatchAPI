namespace BatchRequestQueue {
    //--------------------- Public Types -----------------------
    export type RequestType = {};


    //--------------------- Public Vars -----------------------

    //--------------------- Private Vars -----------------------
    let requestManagers: {[key: string] : BatchRequestManager[]} = {};

    //--------------------- Public Methods -----------------------
    /**
     * QueueRequest
     * 
     * QueueRequest adds a request to the queue based on the priority of an request and the path that the request will be sent to. 
     * @param requestPath The path to the desired 
     * @param requestGenerator 
     * @param priority Priority depicts the earliest that a request can be sent. For example if a request has a priority of 1 it will wait until all requests with a priority of 0 to complete before it's submitted.
     */
    export function QueueRequest(requestPath: string, requestGenerator: BatchRequestGenerator, priority: number){
        if(!requestManagers[requestPath]){
            if(priority > 0) Log.warn("Attempted to create a Request With a priority greater than 0. Please insure all requests are being sent with a Priority of 1 + (the greatest Priority of all descendants)");
            requestManagers[requestPath] = [];
            for (let i = 0; i < priority; i++) {
                requestManagers[requestPath].push(new BatchRequestManager(requestPath));
            }
        }

        requestManagers[requestPath][priority].AppendRequest(requestGenerator);
    }

    //--------------------- Private Methods -----------------------
}