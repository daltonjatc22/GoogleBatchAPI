namespace BatchRequestUtils {
    export function PriorityExtractor(value: any): number | null {
        if(value.priority){
            return value.priority;
        }
        return null;
    }
}