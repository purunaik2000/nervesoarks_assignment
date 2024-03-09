import { z } from "zod";
import { faker } from "@faker-js/faker";
import { redirect } from "@sveltejs/kit";

const carSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(2, { message: 'Name must be min 2 character' })
		.max(50, { message: 'Name must be max 50 character' }).trim(),
	type: z
		.string({ required_error: 'Type is required' })
		.min(2, { message: 'Type must be min 2 character' })
		.max(50, { message: 'Type must be max 50 character' }).trim(),
	model: z
		.string({ required_error: 'Model is required' })
		.min(1, { message: 'Model must be min 1 character' })
		.max(50, { message: 'Model must be max 50 character' }).trim()
});

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({request, cookies}) => {
		const formData = Object.fromEntries(await request.formData());

		let result;

		await carSchema.parseAsync(formData).then((res)=> result = res).catch((error)=>{
			const { fieldErrors: errors } = error?.flatten();
			const { ...rest } = formData;
			result = {
				data: rest,
				errors
			}
		});

		if(result?.errors) return result;

		let form = new FormData();

		for(let key of Object.keys(result)) {
			form.append(key, result[key]);
		}

		let res;

		const token = cookies.get("token");

		const response = await fetch(import.meta.env.VITE_BASE_URL + "add-car", {
			method: "POST",
			body: form,
			headers: {
				"x-api-key": token
			}
		}).then((x)=>{
			res = true;
		}).catch((err)=>{
			res = {
				status: false,
				message: err.message
			}
		});

		if(res == true) redirect(302, '/cars');

		return res;
	}
};

/** @type {import('./$types').PageLoad} */
export const load = async () => {
    let obj = {};

    obj.name = faker.vehicle.vehicle();
    obj.type = faker.vehicle.type();
    obj.model = faker.vehicle.model();

    return obj;
}