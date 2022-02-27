<script lang='ts'>
    export let query
</script>

<div class='layout'>
    <input
        class='searchbar'
        type='text'
        placeholder='Type to search or create'
        aria-label='Search bar'
        role='searchbox'
        bind:value={query}
    />
</div>

<style>
    .searchbar {
        grid-column: 2 / span 2;

        display: block;

        width: 100%;
    }
</style>