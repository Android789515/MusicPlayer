<script lang='ts'>
    export let name
</script>

<h3 class='directory-name'>
    <span class='directory-name-inner'>{name}</span>
</h3>

<style>
    .directory-name {
        font-size: .9rem;
        text-align: center;
        color: #fff;

        margin-top: 0;
    }

    .directory-name-inner {
        display: inline-block;

        padding: .125em .5em;
        background: #0082d9;
        border-radius: .5em;
    }
</style>