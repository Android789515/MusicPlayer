<script lang='ts'>
    import { onMount } from 'svelte'

    import { formatTime } from '../../utils/formatTime'

    export let songInfo
    export let timeToDisplay

    export let styles = undefined

    // Note that this is valid, the Svelte plugin
    // needs to update
    $: ({ title, artist } = songInfo)

    let container
    const applyStyles = () => {
        Object.entries(styles).forEach(([ style, value ]) => {
            container.style[style] = value
        })
    }

    onMount(() => {
        if (styles) {
            applyStyles()
        }
    })
</script>

<div class='container' class:default={!styles} bind:this={container}>
    <h2>{title}</h2>

    <p>{artist}</p>

    <p>{formatTime(timeToDisplay)}</p>
</div>

<style>
    .container > * {
        margin: 0;
    }
</style>