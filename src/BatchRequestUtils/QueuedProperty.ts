namespace BatchRequestUtils {
    export class QueuedProperty<T> extends BatchRequestUtils.PromisedPriority<T> {
        private _value: T | undefined;
        private _priority: number;
        private _hasValue = false;

        public static enforceQueuedProperty<T>(property: QueuedProperty<T> | T): QueuedProperty<T>{
            if (property instanceof QueuedProperty) return property;
            return new QueuedProperty(-1, property);
        }

        public static min<T>(...promises: (QueuedProperty<T> | undefined)[]): QueuedProperty<T> {
            let bestPromise = promises[0];
            let bestPriority = Infinity;
            if(bestPromise) bestPriority = bestPromise.getPriority();

            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i];
                if(promise && promise.getPriority() < bestPriority){
                    bestPromise = promise;
                    bestPriority = promise.getPriority();
                }
            }

            if(!bestPromise) throw new Error("QueuedProperty.min was called with only undefined promises. QueuedProperty.min must be called with at least one valid QueuedProperty");
            return bestPromise;
        }

        /**
         * QueuedProperty<T>
         * Creates a placeholder for a value that will become available once the RequestQueue has processed all events with an eventPriority <= priority
         * @param priority Used for creating request that are dependent on this value. All dependent requests will have a priority of at least priority+1. This parameter will only effect the QueuedProperty if value is undefined.
         * @param value If specified value will be available at runtime before any requests have been submitted.
         */
        constructor(priority: number, value?: T){
            super();

            this._priority = priority;
            if(typeof value !== "undefined") {
                this._value = value;
                this._priority = -1; // Value is already known

                this._hasValue = true;

                this.ResolvePostRequestPromise(value);
            }
        }

        /**
         * hasValue
         */
        public hasValue(): boolean {
            return this._hasValue;
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
        public toJSON(): any {
            this.throwErrorIfNotAvailable();

            if(this._value) return this._value;

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