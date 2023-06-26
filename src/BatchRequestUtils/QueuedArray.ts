namespace BatchRequestUtils {
    export function newQueuedArray<T>(arrayClass: new () => T, knownArray?: T[]): T[]{
        let handler = {
            get: function(target: T[], prop: string): T{
                let index = parseInt(prop);
                if(!(index >= 0 && index % 1 == 0)) throw new Error("QueuedArrays must be indexed with positive integers")

                if(index >= target.length){
                    for (let i = target.length - 1; i < index; i++) {
                        target.push(new arrayClass());
                    }
                }
                Logger.log(target);
                return target[index];
            },
            set: function(target: T[], prop: string | symbol, newValue: any, receiver: any): boolean{
                if(typeof prop !== "number" || !(prop >= 0 && prop % 1 == 0)) return false;

                Logger.log(target);
                return true;
            }
            
        }
        if(!knownArray) knownArray = [];

        return new Proxy(knownArray, handler);
    }
}