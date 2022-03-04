<script lang='ts'>
    import { slide } from 'svelte/transition'

    export let textSearched
</script>

<div
    class='clickable'
    aria-label='Create playlist button'
    role='button'
    in:slide={{ delay: 1000 }}
>
    <h3 class='title'>Create playlist called: {textSearched}?</h3>
</div>

<style>
    .title {
        text-align: center;
    }
</style>