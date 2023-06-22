namespace BatchRequestQueue {
  export class BatchRequestManager {
    private requestGenerators: BatchRequestGenerator[] = [];

    private static cachedBatchPaths: { [key: string]: string };
    private batchPath: string;

    constructor(batchPath: string) {

      // Checking if batchPath has been found already
      if(!BatchRequestManager.cachedBatchPaths[batchPath]){
        // Fetching Path from Google
        BatchRequestManager.cachedBatchPaths[batchPath] = BatchRequest.getBatchPath(batchPath); // This submits a sync GET request to google(Very Slow) caching results for speed up
      }

      this.batchPath = BatchRequestManager.cachedBatchPaths[batchPath];
    }

    /**
     * AppendRequest
     * @param requestGenerator The Request sent in the batch request
     * @param callback A callback function that will run after the batch request runs. Runs: callback(response)
     */
    public AppendRequest(requestGenerator: BatchRequestGenerator) {
      this.requestGenerators.push(requestGenerator);
    }

    /**
     * SubmitRequests
     */
    public async SubmitRequests() {
      let request = this.GenerateRequests();
      if (request.requests.length === 0) {
        Log.warn(
          "Batch Request Manager attempted to submit requests without any requests. Please insure requests aren't being submitted with a RequestOrderIndex greater than 1+(the highest RequestOrderIndex of all dependencies)."
        );
        return;
      }

      let multipartRequest = BatchRequest.EDo(request);

      for (let i = 0; i < multipartRequest.length; i++) {
        if (multipartRequest[i].error) {
          this.requestGenerators[i].RejectPostRequestPromise(
            multipartRequest[i]
          );
          await this.requestGenerators[i].GetResponsePromise(); // await forces all callback functions to be resolved before continuing
        } else {
          this.requestGenerators[i].ResolvePostRequestPromise(
            multipartRequest[i]
          );
          await this.requestGenerators[i].GetResponsePromise(); // await forces all callback functions to be resolved before continuing
        }
      }

      return multipartRequest;
    }

    /**
     * GenerateRequests
     *
     * Calls Each BatchRequest Generator's Get Request Function. Used to Generate Requests that requires the result of one or more previous requests
     */
    private GenerateRequests(): BatchRequest.BatchRequestType {
      let request: BatchRequest.BatchRequestType = {
        batchPath: this.batchPath,
        requests: [],
        accessToken: ScriptApp.getOAuthToken(),
      };

      for (let i = 0; i < this.requestGenerators.length; i++) {
        const requestGenerator = this.requestGenerators[i];
        request.requests.push(requestGenerator.GetRequest());
      }
      return request;
    }
  }
}
