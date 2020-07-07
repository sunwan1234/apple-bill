<template>
	<div>
		<ol class="types">
			<li class="selected">
				<span>支出</span></li>
			<li>收入</li>
		</ol>
	</div>
</template>

<script lang="ts">
  export default {
    name: 'Types'
  };
</script>

<style scoped lang="scss">
	.types {
		display: flex;
		flex-direction: row;

	}

	.types > li {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		padding: 5px 0;
		position: relative;
	}

	.types > li.selected {
		background: url("~@/assets/1.png") center center no-repeat;
		background-size: 50% 100%;
	}

</style>