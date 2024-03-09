<script>
	import { userData } from "../../lib/User.Store";

</script>
<main>
    {#if $userData?.token}
    <div>
        <h1 class="text-center">Profile</h1>
        <div class="flex">
            <div>Name: </div>
            <div>{$userData?.name}</div>
        </div>
        <div class="flex">
            <div>Email: </div>
            <div>{$userData?.email}</div>
        </div>
        <div class="flex">
            <div>User Type: </div>
            <div>{$userData?.type}</div>
        </div>

    </div>
    {/if}
</main>