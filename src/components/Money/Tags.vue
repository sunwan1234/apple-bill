<template>
	<div class="tags">
		<ul class="current out" v-if="isShow === '-'">
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
		<ul class="current in" v-if="isShow === '+'">
			<li class="selected">
				<Icon name="in-salary"></Icon>
				工资
			</li>
			<li>
				<Icon name="in-redpocket"></Icon>
				红包
			</li>
			<li>
				<Icon name="in-rent"></Icon>
				租金
			</li>
			<li>
				<Icon name="in-gift"></Icon>
				礼金
			</li>
			<li>
				<Icon name="in-get"></Icon>
				收款
			</li>
			<li>
				<Icon name="in-manage"></Icon>
				理财
			</li>
			<li>
				<Icon name="in-annual"></Icon>
				年终奖
			</li>
			<li>
				<Icon name="in-other"></Icon>
				其他
			</li>

			<li class="new">
				<button>
					<Icon name="plus"></Icon>
					新增
				</button>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
  export default {
    name: 'Tags',
    props: ['isShow']
  };
</script>

<style scoped lang="scss">
	@media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
		.tags {
			max-height: 29vh;
		}

	}

	.tags {
		flex-shrink: 1;
		overflow-y: auto;
		overflow-x: hidden;
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
</style>