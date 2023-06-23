namespace BatchRequestUtils {
    export class PromisedPriority {
        private _promise: Promise<any>;
        private _promiseResolve!: (value: any) => void;
        private _promiseReject!: (value: any) => void;

        constructor() {
            // Create Promise
            this._promise = new Promise<unknown>((resolve, reject) => {
                this._promiseResolve = resolve;
                this._promiseReject = reject;
            });
        }

        // Promise Handling
        public GetResponsePromise(): Promise<any>{
            return this._promise;
        }
        public ResolvePostRequestPromise(value: any): void{
            this._promiseResolve(value);
        }
        public RejectPostRequestPromise(reason: any): void{
            this._promiseReject(reason);
        }
    }
}