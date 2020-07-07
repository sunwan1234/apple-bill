<template>
	<div class="tags">
		<ul class="current out" v-if="isShow === '-'">
			<li v-for="(value, name) in this.outDataSource"
					:class="{selected: selectedTags.indexOf(value) >= 0}"
					:key="name" @click="toggle(value)">
				<Icon :name="name"></Icon>
				{{ value }}
			</li>

			<li class="new">
				<button>
					<Icon name="plus"></Icon>
					新增
				</button>
			</li>
		</ul>
		<ul class="current in" v-if="isShow === '+'">
			<li v-for="(value, name) in this.inDataSource"
					:class="{selected: selectedTags.indexOf(value) >= 0}"
					:key="name">
				<Icon :name="name"></Icon>
				{{ value }}
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
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop(String) isShow: string | undefined;
    @Prop(Object) outDataSource: Record<string, string> | undefined;
    @Prop(Object) inDataSource: Record<string, string> | undefined;


    selectedTags: string[] = [];

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag)
     if (index >= 0) {
       // 如果当前点击的tag已经在数组中，即已经被点击过
			 // 就删除这个元素，我们的目标是双击取消选中
			 this.selectedTags.splice(index, 1);

		 } else {
       this.selectedTags.push(tag);
		 }
    }

  }
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