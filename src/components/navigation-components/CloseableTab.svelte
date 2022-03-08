<script lang='ts'>
    import { createEventDispatcher } from 'svelte'
    import { Link } from 'svelte-navigator'

    import { useEnterKeyAsClick } from '../../utils/useEnterKeyAsClick'

    import Tab from './Tab.svelte'
    import DirectoryName from './DirectoryName.svelte'

    export let path
    export let name
    export let hidden = false

    const dispatch = createEventDispatcher()

    const closeTab = () => {
        dispatch('closeTab', {})
    }

    const handleKeydown = useEnterKeyAsClick(closeTab)
</script>

<Tab {hidden} {path} {name}>
    <div class='layout'>
        <Link to={`/${path}`} class='link nav-link'>
            <DirectoryName {name} />
        </Link>

        <span
            class='close-button clickable'
            tabindex='2'
            on:click={closeTab}
            on:keydown={handleKeydown}
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
        top: -3px;
        right: 2px;

        margin-left: .5em;
    }
</style>