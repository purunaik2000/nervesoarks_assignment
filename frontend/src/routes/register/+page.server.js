import { z } from "zod";
import { faker } from "@faker-js/faker";
import { browser } from "$app/environment";

const registerSchema = z.object({
	email: z
		.string({ required_error: 'Username is required' })
		.email({ message: 'Invalid Username' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must be min 8 character' })
		.max(30, { message: 'Password must be max 15 character' }),
	passwordConfirm: z
		.string({ required_error: 'Confirm Password is required' })
		.min(8, { message: 'Password must be min 8 character' })
		.max(30, { message: 'Password must be max 15 character' }),
	name: z
		.string({ required_error: 'Name is required' })
		.min(2, { message: 'Name must be min 8 character' })
		.max(50, { message: 'Name must be max 15 character' }),
	location: z
		.string({ required_error: 'Location is required' })
		.min(2, { message: 'Location must be min 8 character' })
		.max(50, { message: 'Location must be max 15 character' })
}).superRefine(({password, passwordConfirm}, ctx) => {
    if (password && !passwordConfirm){
        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must be same",
            path: ["password"]
        });
        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must be same",
            path: ["password"]
        });
    }
});

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		// console.log(formData); // eslint-disable-line no-console

		try {
			const result = registerSchema.parse(formData);

			const form = new FormData();

			for (let key of Object.keys(result)) {
				form.append(key, result[key]);
			}

            form.delete("passwordConfirm");

			if (formData.isDealer == 'on') form.append('isDealer', true);

			try {
				const response = await fetch(import.meta.env?.VITE_BASE_URL + 'register', {
					method: 'POST',
					contentType: 'multipart/form-data',
					body: form
				});

				const res = await response.json();

				if(res.status) {
					return {
						status: true,
						email: result?.email,
						password: result?.password
					}
                }
			} catch (error) {
				console.log(error.message);
			}
		} catch (error) {
			const { fieldErrors: errors } = error.flatten();
			const { ...rest } = formData;

			return {
				data: rest,
				errors
			};
		}
	}
};

/** @type {import('./$types').PageLoad} */
export const load = async () => {
    let obj = {};

    obj.name = faker.person.fullName();
    obj.email = faker.internet.email();
    obj.location = faker.location.city();
    obj.password = faker.internet.password();
    obj.passwordConfirm = obj.password;

    return obj;
}