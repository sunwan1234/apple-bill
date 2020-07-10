<template>
	<div class="nav-wrapper">
		<div class="content">
			<slot></slot>
		</div>
		<Nav></Nav>
	</div>
</template>

<script lang="ts">
  export default {
    name: 'Layout'
  };
</script>

<style scoped lang="scss">
	.nav-wrapper {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.content {
		flex-grow: 1; // 让内容尽量占满
		overflow: auto;
		display: flex;
		flex-direction: column;
	}
</style>