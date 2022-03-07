<script lang='ts'>
    import { createEventDispatcher } from 'svelte'

    import { useEnterKeyAsClick } from '../../utils/useEnterKeyAsClick'

    import Tab from './Tab.svelte'

    export let path

    const dispatch = createEventDispatcher()

    const closeTab = () => {
        dispatch('closeTab', {})
    }

    const handleKeydown = useEnterKeyAsClick(closeTab)
</script>

<Tab {path}>
    <div class='layout'>
        <slot></slot>

        <span
            class='close-button clickable'
            tabindex='2'
            on:keydown={handleKeydown}
            on:click={closeTab}
        >
            x
        </span>
    </div>
</Tab>

<style>
    .layout {
        position: relative;
    }

    .close-button {
        font-weight: 700;

        position: absolute;
        top: -10px;
        right: -13px;

        margin-left: .5em;
    }
</style>