<template>
	<div class="notes-wrapper">
		<label class="notes">
			<span class="name">备注</span>
			<input type="text"  placeholder="在这里输入备注" >
			<span class="output">100</span>
		</label>
	</div>
</template>

<script lang="ts">
  export default {
    name: 'Notes'
  };
</script>

<style scoped lang="scss">
	.notes {
		font-size: 14px;
		background: #f5f5f5;
		padding-left: 16px;
		padding-right: 10px;
		display: flex;
		align-items: center;
		border: 1px solid #333;
		border-radius: 16px;

		.name {
			padding-right: 16px;
		}

		input {
			height: 56px;
			flex-grow: 1;
			background: transparent;
			border: none;
			padding-right: 12px;
		}
	}

	.notes-wrapper {
		position: relative;
		margin: 4px;
	}
</style>