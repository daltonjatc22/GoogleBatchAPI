namespace BatchRequestUtils {
    export class PromisedPriority<T> {
        protected _promise: Promise<T>;
        private _promiseResolve!: (value: any) => void;
        private _promiseReject!: (value: any) => void;

        constructor() {
            // Create Promise
            this._promise = new Promise<T>((resolve, reject) => {
                this._promiseResolve = resolve;
                this._promiseReject = reject;
            });
        }

        // Promise Handling
        public GetResponsePromise(): Promise<T>{
            return this._promise;
        }
        public ResolvePostRequestPromise(value: T): void{
            this._promiseResolve(value);
        }
        public RejectPostRequestPromise(reason: any): void{
            this._promiseReject(reason);
        }
    }
}