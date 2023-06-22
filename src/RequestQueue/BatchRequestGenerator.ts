namespace BatchRequestQueue {
    export interface BatchRequestGenerator {
        UpdateFromParent(): void;

        GetRequestOrderIndex(): number;
        
        GetRequest(): BatchRequest.RequestType;

        GetResponsePromise(): Promise<any>;

        ResolvePostRequestPromise(value: any): void;
        RejectPostRequestPromise(reason: any): void;

    }
}