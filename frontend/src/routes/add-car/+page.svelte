<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { userData } from '../../lib/User.Store';
	import { showAlert } from '../../lib/Alert/Alert.Store';
	import {enhance, applyAction} from '$app/forms';

	export let form;
	export let data;

	const delay = new Promise((resolve) => setTimeout(() => resolve(true), 2000));

	const submitHandler = async () => {
		try {
			const response = await fetch('/add-car', {
				method: 'POST',
				body: {}
			})
		} catch (error) {
			console.log(error.message);
		}
	}

	onMount(async () => {
        console.log(form)
        console.log($userData)
		// if (!$userData?.token) return goto('/login');
		if (form?.status) {
			try {
			} catch (error) {
				console.log(error.message);
				showAlert(error.message, 'danger');
			}
		}
	});
</script>

<main class="flex w-full h-screen justify-center items-center bg-gray-200 select-none">
	<div class="w-full max-w-xs">
		<form use:enhance={(()=>{
			return async ({result}) => {
				if(result?.type == "redirect") goto(result.location);
				else applyAction(result);
			}
			})} id="add-car" method="post" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
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
					placeholder="Name"
				/>
				<p class="{form?.errors?.name ? '' : 'hidden'} text-red-500 text-xs italic">
					{form?.errors?.name}
				</p>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="type"> Type </label>
				<input
					name="type"
					value={form?.data?.type ?? data?.type ?? ''}
					class="shadow appearance-none border {form?.errors?.type
						? 'border-red-500'
						: ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="type"
					type="text"
					placeholder="Type"
				/>
				<p class="{form?.errors?.type ? '' : 'hidden'} text-red-500 text-xs italic">
					{form?.errors?.type}
				</p>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="model"> Model </label>
				<input
					name="model"
					value={form?.data?.model ?? data?.model ?? ''}
					class="shadow appearance-none border {form?.errors?.model
						? 'border-red-500'
						: ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="model"
					type="text"
					placeholder="Mumbai"
				/>
				<p class="{form?.errors?.model ? '' : 'hidden'} text-red-500 text-xs italic">
					{form?.errors?.model}
				</p>
			</div>
			<div class="flex items-center justify-center">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					Add Car
				</button>
			</div>
		</form>
		<p class="text-center text-gray-500 text-xs">&copy;2024 Car Room All rights reserved.</p>
	</div>
</main>
