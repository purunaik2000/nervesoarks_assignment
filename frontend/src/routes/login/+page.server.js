import { z } from 'zod';

const loginSchema = z.object({
	email: z.string({ required_error: 'Username is required' }).email({ message: 'Invalid Username' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must be min 8 character' })
		.max(30, { message: 'Password must be max 15 character' })
});

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		// console.log(formData); // eslint-disable-line no-console

		try {
			const result = loginSchema.parse(formData);

            const form = new FormData();

            for(let key of Object.keys(result)) {
                form.append(key, result[key]);
            }

            if(formData.isDealer == "on") form.append("isDealer", true);
            
            try {
                const response = await fetch(import.meta.env?.VITE_BASE_URL+"login", {
                    method: "POST",
                    contentType: "multipart/form-data",
                    body: form
                });

                const res = await response.json();

                if(res.status) {
                    cookies.set("token", res.token, {path: "/"});
                    return res;
                }
            } catch (error) {
                console.log(error.message);
            }
            
		} catch (error) {
			const {fieldErrors: errors} = error.flatten();
            const {...rest} = formData;

            return  {
                data: rest,
                errors
            }
		}
	}
};


// /** @type {import('./$types').PageLoad} */
// export const load = async () => {
//     const obj = {
//         fakerData
//     }
// }