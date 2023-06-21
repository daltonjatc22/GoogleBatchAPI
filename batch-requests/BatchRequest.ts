

namespace BatchRequest{
    
    export type RequestType = {
        method: string,
        endpoint: string,
        requestBody: any,
        accessToken?: string
    }

    export type BatchRequestType = {
        batchPath: string,
        requests: RequestType[],
        accessToken: string
    }

    export function getBatchPath(APIName : string, version?: string) : string {return ""}

    export function Do(requests : BatchRequestType) : string {return ""}
    
    export function EDo(requests : BatchRequestType) : any[] {return []}

    

}