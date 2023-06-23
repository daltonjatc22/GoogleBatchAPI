// Acting as Public Static Class
namespace Log {
    //--------------------- Public Vars -----------------------
    export let logWarnings = true;
    export let logRequestErrors = true;

    //--------------------- Private Vars -----------------------
    let shownWarning = false;
    let shownRequestError = false;

    //--------------------- Public Methods -----------------------

    export function warn(data: string | any[]){
        if(!logWarnings) return;
        console.warn(data);

        if(shownWarning) return;
        console.log(`Warnings can be muted by setting Logger.logWarnings to false`);
        shownWarning = true;
    }

    export function logRequestError(data: any){
        if(!logRequestErrors) return;
        console.error(data);

        if(shownRequestError) return;
        console.log(`Request Errors can be muted by setting Logger.shownRequestErrors to false`);
        shownWarning = true;
    }

    //--------------------- Private Methods -----------------------
}