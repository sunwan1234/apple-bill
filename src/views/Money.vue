<template>
	<div class="nav-wrapper">
		<div class="content">
			Money
		</div>

		<Nav></Nav>
	</div>

</template>

<script lang="ts">
  export default {
    name: 'Money'
  };
</script>

<style scoped lang="scss">
	.nav-wrapper {
		display: flex;
		border: 1px solid green;
		flex-direction: column;
		height: 100vh;
	}

	.content {
		flex-grow: 1; // 让内容尽量占满
		overflow: auto;
		border: 1px solid blue;
	}
</style>