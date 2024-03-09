<script>
	import { onMount } from "svelte";
	import {fakerData} from "../Faker.Store";
	import { userData } from "../../lib/User.Store";
	import {goto} from '$app/navigation';

	export let form;

	onMount(async ()=>{
		if($userData?.token) return goto("/cars");
		if(form?.status === true) {
			userData.set({
				token: form?.token,
				email: form?.user?.email,
				name: form?.user?.name,
				type: form?.user?.type
			});

			console.log($userData);

			return goto("/cars");
		}
	});
</script>

<main class="flex w-full h-screen justify-center items-center bg-gray-200 select-none">
	<div class="w-full max-w-xs">
		<form id="login" method="post" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
				<input
					name="email"
					value={form?.data?.email ?? $fakerData.email ?? ''}
					class="shadow appearance-none border {form?.errors?.email
						? 'border-red-500'
						: ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="username"
					type="text"
					placeholder="Username"
				/>
				<p class="{form?.errors?.email ? '' : 'hidden'} text-red-500 text-xs italic">
					{form?.errors?.email}
				</p>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
				<input
					name="password"
					value={form?.data?.password ?? $fakerData?.password ?? ''}
					class="shadow appearance-none border {form?.errors?.password
						? 'border-red-500'
						: ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="password"
					type="password"
					placeholder="******************"
				/>
				<p class="{form?.errors?.password ? '' : 'hidden'} text-red-500 text-xs italic">
					{form?.errors?.password}
				</p>
			</div>
			<div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="isDealer"> Are you dealer? </label>
				<input
					type="checkbox"
                    name="isDealer"
				/>
			</div>
			<div class="flex items-center justify-between">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					Sign In
				</button>
				<a
					class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
					href="/register"
				>
					Forgot Password?
				</a>
			</div>
		</form>
		<p class="text-center text-gray-500 text-xs">&copy;2024 Car Room All rights reserved.</p>
	</div>
</main>
