import { writable } from "svelte/store";

export const ALERT_TYPES = {
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
    WARNING: "WARNING",
    INFO: "INFO"
}

Object.freeze(ALERT_TYPES);

export const alertMessage = writable('');
export const alertType = writable('');

export const showAlert = async (message, type = ALERT_TYPES.INFO) => {
    alertMessage.set(message);
    alertType.set(type.toUpperCase());

    setTimeout(()=>{
        alertMessage.set("");
    }, 2000);
}