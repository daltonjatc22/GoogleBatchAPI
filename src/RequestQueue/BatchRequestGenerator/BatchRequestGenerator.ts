namespace BatchRequestQueue {
    type primitive = string | number | boolean | null;

    export class BatchRequestGenerator extends BatchRequestUtils.PromisedPriority<any> {
        protected maxDependentPriority = 0;

        constructor(){
            super();
        }

        public UpdateFromParent(){}

        public GetRequestPriority(): number {
            return this.maxDependentPriority + 1;
        }

        public GetRequest(): BatchRequest.RequestType {
            throw new Error("Not Implemented"); // if this function isn't over-written it will throw an error before submitting.
        }

        public GetUpdatableProperties(): string[]{
            throw new Error("Not Implemented"); // if this function isn't over-written it will throw an error.
        }

        public setProperty(propName: string, propValue: BatchRequestQueue.RequestGenerator.QueuedProperty<primitive> | primitive){
            throw new Error("Not Implemented"); // if this function isn't over-written it will throw an error.
        }

        /**
         * getValue
         * Returns the value of param while enforcing a dependency between this RequestGenerator and the RequestGenerator that created param if exists
         * @param param A value that is dependent on another request or a primitive.
         * @returns The Perceived value of param
         */
        protected getValue(param: RequestGenerator.QueuedProperty<any> | any): any {
            this.extractPriority(param);
            return param.valueOf();
        }

        protected extractPriority(param: primitive | RequestGenerator.QueuedProperty<any>, ignore?: boolean): any {
            if(param instanceof RequestGenerator.QueuedProperty && !ignore){
                this.maxDependentPriority = Math.max(this.maxDependentPriority, param.getPriority());
            }
            return param;
        }
    }
}