<template>
	<Layout>
		<div>
			<ol class="types">
				<li class="selected">
					<span>支出</span></li>
				<li>收入</li>
			</ol>
		</div>
		<div class="tags">
			<ul class="current">
				<li class="selected">
					<Icon name="meal"></Icon>
					餐饮
				</li>
				<li>
					<Icon name="shop"></Icon>
					购物
				</li>
				<li>
					<Icon name="everyday"></Icon>
					日用
				</li>
				<li>
					<Icon name="transport"></Icon>
					交通
				</li>
				<li>
					<Icon name="sport2"></Icon>
					运动
				</li>
				<li>
					<Icon name="fun"></Icon>
					娱乐
				</li>
				<li>
					<Icon name="cloth"></Icon>
					服饰
				</li>
				<li>
					<Icon name="pet"></Icon>
					宠物
				</li>
				<li class="new">
					<button>
						<Icon name="plus"></Icon>
						新增
					</button>
				</li>
			</ul>
		</div>


		<div class="numberPad">
			<div class="notes-wrapper">
				<label class="notes">
					<span class="name">备注</span>
					<input type="text">
					<span class="output">100</span>
				</label>


			</div>

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
	</Layout>

</template>

<script lang="ts">
  export default {
    name: 'Money'
  };
</script>

<style scoped lang="scss">
	@media (device-height:568px) and (-webkit-min-device-pixel-ratio:2){
		.tags {
			max-height: 29vh;
		}

	}

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

	.tags {
		flex-shrink: 1;
		overflow: auto;
	}

	.tags .current {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		justify-content: space-between;
		margin-right: -10px;
		font-size: 12px;
	}

	.tags .current > li {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 67px;
		border: 2px solid #333;
		border-radius: 50%;
		margin-right: 10px;
		margin-bottom: 10px;
		padding: 8px;
	}

	.tags .current > li.selected {
		border: 2px solid rgb(248, 124, 148);
	}

	.tags .current > li svg {
		height: 30px;
		width: 30px;
	}

	.new button {
		background: transparent;
		border: none;
		padding: 0 4px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

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

	/*.types > li.selected span {*/
	/*	background-color: #fff2ac;*/
	/*	background-image: linear-gradient(to right, #ffe359 0%, #fff2ac 100%);*/
	/*}*/
</style>