import { writable } from "svelte/store";

export const fakerData = writable({
    email: '',
    password: ''
});