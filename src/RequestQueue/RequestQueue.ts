// Acting as Public Static Class
namespace BatchRequestQueue {
    //--------------------- Public Types -----------------------
    export type RequestType = {};


    //--------------------- Public Vars -----------------------

    //--------------------- Private Vars -----------------------
    let requestManagers: {[key: string] : BatchRequestManager[]} = {};
    let greatestPriority = 0;

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
        // Tracking Priority for submitting requests
        greatestPriority = Math.max(greatestPriority, priority);

        createQueueIfNotExists(requestPath, priority);
        fillQueue(requestPath, priority);

        requestManagers[requestPath][priority].AppendRequest(requestGenerator);
    }
    /**
     * SubmitRequests
     * Submits all pending requests in order of priority
     */
    export function SubmitRequests(){
        let batchPaths = Object.keys(requestManagers);
        for (let priority = 0; priority < greatestPriority; priority++) {
            for(let pathIndex = 0; pathIndex < batchPaths.length; pathIndex++){
                const batchPath = batchPaths[pathIndex];
                const requestManager = requestManagers[batchPath][priority];

                if(requestManager){
                    requestManager.SubmitRequests();
                }
            }
        }

    }

    //--------------------- Private Methods -----------------------
    function createQueueIfNotExists(requestPath: string, priority: number){
        // Creating Queue for Request Path
        if(!requestManagers[requestPath]){
            if(priority > 0) Log.warn("Attempted to create a Request With a priority greater than 0. Please insure all requests are being sent with a Priority of 1 + (the greatest Priority of all descendants)");
            requestManagers[requestPath] = [];
        }
    }

    /**
     * fillQueue
     * 
     * Fills queue with BatchRequestManager Classes up to priority, This function is used incase this library is run with bad code that doesn't follow proper priority use.
     * @param requestPath 
     * @param priority 
     */
    function fillQueue(requestPath: string, priority: number){
        // Creating BatchRequestManager for following priority's up to priority.
        if(requestManagers[requestPath].length !== priority) Log.warn("Attempted to create a Request With a priority greater than 1 + (the greatest Priority of all descendants).\n Please insure all requests are being sent with a Priority of 1 + (the greatest Priority of all descendants)");

        for (let i = requestManagers[requestPath].length-1; i < priority; i++) {
            requestManagers[requestPath].push(new BatchRequestManager(requestPath));
        }
    }
}