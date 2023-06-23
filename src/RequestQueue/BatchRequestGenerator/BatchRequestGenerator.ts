namespace BatchRequestQueue {
    export class BatchRequestGenerator extends BatchRequestUtils.PromisedPriority {
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

        /**
         * getValue
         * Returns the value of param while enforcing a dependency between this RequestGenerator and the RequestGenerator that created param if exists
         * @param param A value that is dependent on another request or a primitive.
         * @returns The Perceived value of param
         */
        protected getValue(param: any): string | number | boolean | null {
            this.extractPriority(param);
            return param.valueOf();
        }

        protected extractPriority(param: any, ignore?: boolean): any {
            if(this.hasPriority(param) && !ignore){
                this.maxDependentPriority = Math.max(this.maxDependentPriority, param.priority);
            }
            return param;
        }

        protected hasPriority(param: any){
            return param.priority !== null;
        }
    }
}