<script lang='ts'>
    let searchText = ''
</script>

<div class='layout'>
    <input
        class='searchbar'
        type='text'
        placeholder='Type to search or create'
        aria-label='Search bar'
        role='searchbox'
        bind:value={searchText}
    />
</div>

<style>
    .searchbar {
        display: block;

        width: 100%;
    }
</style>