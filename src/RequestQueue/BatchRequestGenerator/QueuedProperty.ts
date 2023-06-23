namespace BatchRequestQueue.RequestGenerator {
    export class QueuedProperty<T> extends BatchRequestUtils.PromisedPriority<T> {
        private _value: T | undefined;
        private _priority: number;
        private _hasValue = false;

        constructor(priority: number, value?: T){
            super();

            this._priority = priority;
            if(value) {
                this._hasValue = true;
                this._value = value;
            }
        }

        /**
         * value setter
         * 
         * Sets value
         */
        public set value(v : T) {
            this._value = v;
            this._hasValue = true;

            // Calls all queued promises
            this.ResolvePostRequestPromise(v);
        }
        

        // Overriding default behaviors
        /**
         * valueOf
         * 
         * Prevents early use of Property
         */
        public valueOf(): T {
            this.throwErrorIfNotAvailable();
            
            if(this._value) return this._value;
            
            throw new Error("value is unset");
        }

        public toString(): string{
            this.throwErrorIfNotAvailable();

            if(this._value) return this._value.toString();

            throw new Error("value is unset");
        }

        /**
         * toJSON
         * Note: This function is recursive as JSON.stringify will call children's toJSON function
         * @returns A JSON string defining this object;
         */
        public toJSON(): string {
            this.throwErrorIfNotAvailable();

            if(this._value) return JSON.stringify(this._value);

            throw new Error("value is unset");
        }

        public getPriority(): number{
            return this._priority;
        }

        private throwErrorIfNotAvailable(){
            if(!this._hasValue) throw new Error("Requested value is not yet available. If complex use is required please use the promise functionality of QueuedProperty(QueuedProperty.then())");
        }
    }
}