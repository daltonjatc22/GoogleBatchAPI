function test(){
    BatchRequestQueue.QueueRequest("drive", new requestGenerator(), 2);
}

class requestGenerator implements BatchRequestQueue.BatchRequestGenerator{
    UpdateFromParent(): void {
        throw new Error("Method not implemented.");
    }
    GetRequestOrderIndex(): number {
        throw new Error("Method not implemented.");
    }
    GetRequest(): BatchRequest.RequestType {
        throw new Error("Method not implemented.");
    }
    GetResponsePromise(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    ResolvePostRequestPromise(value: any): void {
        throw new Error("Method not implemented.");
    }
    RejectPostRequestPromise(reason: any): void {
        throw new Error("Method not implemented.");
    }
    
}