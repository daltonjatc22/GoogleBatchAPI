namespace BatchRequestQueue {
    type primitive = string | number | boolean | null;

    export class BatchRequestGenerator extends BatchRequestUtils.PromisedPriority<any> {
        protected maxDependentPriority = -1;

        constructor(){
            super();

            this._promise = this._promise.then((response) => {
                this.updateDependencies(response);
            })
        }

        public UpdateFromParent(){}

        public GetRequestPriority(): number {
            return this.maxDependentPriority + 1;
        }

        public GetRequest(): BatchRequest.RequestType | null {
            throw new Error("Not Implemented"); // if this function isn't over-written it will throw an error before submitting.
        }

        /**
         * getValue
         * Returns the value of param while enforcing a dependency between this RequestGenerator and the RequestGenerator that created param if exists
         * @param param A value that is dependent on another request or a primitive.
         * @returns The Perceived value of param
         */
        protected getValue(param: BatchRequestUtils.QueuedProperty<any> | any): any {
            this.extractPriority(param);
            return param.valueOf();
        }

        protected extractPriority(param?: primitive | BatchRequestUtils.QueuedProperty<any>, ignore?: boolean): any {
            if(param instanceof BatchRequestUtils.QueuedProperty && !ignore){
                this.maxDependentPriority = Math.max(this.maxDependentPriority, param.getPriority());
            }
            return param;
        }

        protected updateDependencies(response: any){
            throw Error("Not Implemented");
        }
    }
}