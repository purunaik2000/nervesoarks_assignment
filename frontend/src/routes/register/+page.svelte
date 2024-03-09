<script>
	import { onMount } from 'svelte';
	import {goto} from '$app/navigation';
	import {userData} from '../../lib/User.Store';
	import {fakerData} from '../Faker.Store';
	import {showAlert} from '../../lib/Alert/Alert.Store';

	export let form;
	export let data;

	const delay = new Promise(resolve=> setTimeout(() => resolve(true), 2000));

	onMount(async () => {
		if($userData?.token) return goto('/cars');
		if(form?.status) {
			fakerData.set({
				email: form?.email,
				password: form?.password
			});
			
			showAlert("Registered successfull", "success");
			await delay;
			goto('/login');
		}
	});
</script>

<main class="flex w-full h-screen justify-center items-center bg-gray-200 select-none">
	<div class="w-full max-w-xs">
		<form id="register" method="post" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Name </label>
				<input
					name="name"
					value={form?.data?.name ?? data?.name ?? ''}
					class="shadow appearance-none border {form?.errors?.name
						? 'border-red-500'
						: ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="name"
					type="text"
					placeholder="John Doe"
				/>
				<p class="{form?.errors?.name ? '' : 'hidden'} text-red-500 text-xs italic">
					{form?.errors?.name}
				</p>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email </label>
				<input
					name="email"
					value={form?.data?.email ?? data?.email ?? ''}
					class="shadow appearance-none border {form?.errors?.email
						? 'border-red-500'
						: ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="email"
					type="email"
					placeholder="Example@example.com"
				/>
				<p class="{form?.errors?.email ? '' : 'hidden'} text-red-500 text-xs italic">
					{form?.errors?.email}
				</p>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="location"> Location </label>
				<input
					name="location"
					value={form?.data?.location ??  data?.location ?? ''}
					class="shadow appearance-none border {form?.errors?.location
						? 'border-red-500'
						: ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="location"
					type="text"
					placeholder="Mumbai"
				/>
				<p class="{form?.errors?.location ? '' : 'hidden'} text-red-500 text-xs italic">
					{form?.errors?.location}
				</p>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
				<input
					name="password"
					value={form?.data?.password ?? data?.password ?? ''}
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
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="passwordConfirm">
					Confirm password
				</label>
				<input
					name="passwordConfirm"
					value={form?.data?.passwordConfirm ?? data?.passwordConfirm ?? ''}
					class="shadow appearance-none border {form?.errors?.passwordConfirm
						? 'border-red-500'
						: ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="passwordConfirm"
					type="password"
					placeholder="******************"
				/>
				<p class="{form?.errors?.passwordConfirm ? '' : 'hidden'} text-red-500 text-xs italic">
					{form?.errors?.passwordConfirm}
				</p>
			</div>
			<div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="isDealer">
					Are you dealer?
				</label>
				<input type="checkbox" name="isDealer" />
			</div>
			<div class="flex items-center justify-between">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					Register
				</button>
				<a
					class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
					href="/login"
				>
					Already registered?
				</a>
			</div>
		</form>
		<p class="text-center text-gray-500 text-xs">&copy;2024 Car Room All rights reserved.</p>
	</div>
</main>
