<script lang='ts'>
    export let message
</script>

<li>
    <h2 class='message'>{message}</h2>
</li>

<style>
    li {
        order: -1;
    }

    .message {
        text-align: center;

        margin: 0;
    }
</style>