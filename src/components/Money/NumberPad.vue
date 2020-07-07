<template>
	<div class="numberPad">
		<Notes></Notes>
		<div class="buttons">
			<button>1</button>
			<button>2</button>
			<button>3</button>
			<button>删除</button>
			<button>4</button>
			<button>5</button>
			<button>6</button>
			<button>清空</button>
			<button>7</button>
			<button>8</button>
			<button>9</button>
			<button>.</button>
			<button class="zero">0</button>
			<button class="ok">OK</button>


		</div>
	</div>
</template>

<script lang="ts">
  import Notes from '@/components/Money/Notes.vue';
  export default {
    name: 'NumberPad',
    components: {Notes}
  };
</script>

<style scoped lang="scss">
	@import "~@/assets/styles/helper.scss";
	.numberPad {
		background: rgb(254, 208, 88);
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		min-height: 0;
		min-width: 0;

		.output {
			@extend %clearFix;
			font-size: 34px;
			font-family: Consolas, monospace;
		}

		.buttons {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding: 5px;
			flex-grow: 1;


			> button {
				width: 21%;
				border: 1px solid #333;
				border-radius: 10px;
				background: white;
				flex-grow: 1;
				padding: 10px;
				margin: 3px;
				font-size: 16px;

			}
		}
	}


</style>