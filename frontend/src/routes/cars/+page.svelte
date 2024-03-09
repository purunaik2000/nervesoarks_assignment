<script>
	import { onMount } from 'svelte';
	import { userData } from '../../lib/User.Store';
	// import { writable } from 'svelte/store';

	export let cars = [
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		},
		{
			name: 'Carfkljs',
			model: 'jdskl',
			type: 'djkasdjkl'
		}
	];

	onMount(async () => {
		try {
			const response = await fetch(import.meta.env.VITE_BASE_URL + 'get-cars', {
				method: 'get',
				headers: {
					'x-api-key': $userData?.token || ''
				}
			});

			const res = await response.json();

			if (res.status) {
				cars = res.data;
			}
		} catch (error) {
			console.log(error.message);
		}
	});
</script>

<main
	class="flex flex-col p-6 w-full h-screen justify-start items-center overflow-y-scroll bg-gray-200 select-none"
	id="page-content"
>
	<h1 class="w-full h-auto text-lg underline flex items-center justify-center">Car Details</h1>

	<div class="flex w-full h-auto">
		{#if cars && cars.length}
			<div
				class="w-full grid mx-auto shrink grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-10 gap-4 justify-center items-center"
			>
				{#each cars as car}
					<div class="rounded-lg shadow-lg capitalize p-4 border bg-gray-300 hover:bg-gray-400">
						<div class=" ">Name: {car.name}</div>
						<div class=" ">Type: {car.model}</div>
						<div class=" ">Model: {car.type}</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="m-auto">No Cars Found. Please add a new Car.</p>
		{/if}
	</div>
</main>
