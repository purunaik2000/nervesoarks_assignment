<script>
	import '../app.css';
	import Alert from '../lib/Alert/Alert.svelte';
	import { goto } from '$app/navigation';
	import { userData } from '../lib/User.Store';
	import { onMount } from 'svelte';
	export let menu = true;

	const logout = () => {
		userData.set({});
		goto('/login');
	};

	export let data;
</script>

<div class=" overflow-hidden h-screen w-screen">
	<Alert></Alert>
	<header
		class="relative top-0 l-0 z-30 border-b-2 shadow inline-flex align-middle justify-center h-10 w-full bg-gray-100 select-none"
	>
		<button class="ml-3 mt-3 md:hidden select-none" on:click={() => (menu = !menu)}>
			{#if menu}
				<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
					><path
						d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
					/></svg
				>
			{:else}
				<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
					><path
						d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
					/></svg
				>
			{/if}
		</button>
		<h1 class="md:pl-56 text-gray-600 font-semibold text-lg uppercase m-auto">car room</h1>
	</header>

	<div class="flex w-full overflow-hidden">
		<nav
			class="fixed md:relative top-0 z-20 {menu
				? '-left-full w-0 md:w-auto'
				: 'left-0'} transition-all ease-linear duration-500 md:left-0 min-h-screen inline-flex flex-row bg-gray-100 w-56 select-none"
		>
			<div class="flex flex-col w-56 overflow-hidden">
				<ul class="flex flex-col py-4 mt-5">
					<li>
						<a
							href="/"
							class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
						>
							<span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
								><i class="bx bx-home"></i></span
							>
							<span class="text-sm font-medium">Dashboard</span>
						</a>
					</li>
					{#if !$userData?.token}
						<li>
							<a
								href="/login"
								class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
							>
								<span
									class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
									><i class="bx bx-music"></i></span
								>
								<span class="text-sm font-medium">Login</span>
							</a>
						</li>
						<li>
							<a
								href="/register"
								class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
							>
								<span
									class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
									><i class="bx bx-drink"></i></span
								>
								<span class="text-sm font-medium">New User</span>
							</a>
						</li>
					{:else}
						<li>
							<a
								href="/cars"
								class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
							>
								<span
									class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
									><i class="bx bx-shopping-bag"></i></span
								>
								<span class="text-sm font-medium">Cars</span>
							</a>
						</li>
						{#if $userData?.type == 'Dealer'}
							<li>
								<a
									href="/add-car"
									class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
								>
									<span
										class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
										><i class="bx bx-chat"></i></span
									>
									<span class="text-sm font-medium">Add Car</span>
								</a>
							</li>
						{/if}
						<li>
							<a
								href="/profile"
								class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
							>
								<span
									class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
									><i class="bx bx-user"></i></span
								>
								<span class="text-sm font-medium">Profile</span>
							</a>
						</li>
						<!-- <li>
						<a
							href="/profile"
							class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
						>
							<span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
								><i class="bx bx-bell"></i></span
							>
							<span class="text-sm font-medium">Profile</span>
							<span class="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500"
								>5</span
							>
						</a>
					</li> -->
						<li>
							<a
								href="#"
								class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
								on:click={logout}
							>
								<span
									class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
									><i class="bx bx-log-out"></i></span
								>
								<span class="text-sm font-medium">Logout</span>
							</a>
						</li>
					{/if}
				</ul>
			</div>
		</nav>

		<div
			class="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-60 {menu
				? 'hidden'
				: ''} md:hidden"
		></div>
		<slot {menu} class=" overflow-y-scroll" />
	</div>
</div>

<style lang="postcss">
</style>
