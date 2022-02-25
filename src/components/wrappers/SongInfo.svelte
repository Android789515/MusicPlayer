<script lang='ts'>
    import { onMount } from 'svelte'

    import formatTime from '../../utils/formatTime'

    export let songInfo
    export let timeToDisplay

    export let styles = undefined

    const { title, artist } = songInfo

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
    <slot name='title'>
        <h2>{title}</h2>
    </slot>

    <slot name='other-info'>
        <p>{artist}</p>

        <p>{formatTime(timeToDisplay)}</p>
    </slot>
</div>

<style>
    .container > * {
        margin: 0;
    }

    .default {
        text-align: center;
    }
</style>