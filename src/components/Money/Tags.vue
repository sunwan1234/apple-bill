<template>
	<div class="tags">
		<ul class="current out" v-if="!isNewTag && isShow === '-'">
			<li v-for="(item, index) in this.outDataSource"
					:class="{selected: selectedTags.indexOf(item.name) >= 0}"
					:key="index" @click="toggle(item.name)">
				<Icon :name="item.svg"></Icon>
				{{ item.name }}
			</li>

			<li class="new">
				<button @click="create('out')">
					<Icon name="plus"></Icon>
					新增
				</button>
			</li>
		</ul>
		<ul class="current in" v-if="!isNewTag && isShow === '+'">
			<li v-for="(item, index) in this.inDataSource"
					:class="{selected: selectedTags.indexOf(item.name) >= 0}"
					:key="index" @click="toggle(item.name)">
				<Icon :name="item.svg"></Icon>
				{{ item.name }}
			</li>
			<li class="new">
				<button @click="create('in')">
					<Icon name="plus"></Icon>
					新增
				</button>
			</li>
		</ul>

		<div class="tag-list" v-if="isNewTag === '+'">
			<div class="tag-wrapper">
				<div v-for="(item, index) in newDataSource" :key="index"
						 :class="{selected: selectedTags.indexOf(item) >= 0}"
						 @click="toggle(item)">
					<Icon :name="item"></Icon>
				</div>
			</div>
		</div>
	</div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';


  @Component
  export default class Tags extends Vue {
    @Prop(String) isShow: string | undefined;
    @Prop(Array) outDataSource: Array<Record<string, string>> | undefined;
    @Prop(Array) inDataSource: Array<Record<string, string>> | undefined;
    @Prop(String) isNewTag: string | undefined;
    @Prop(Array) newDataSource: string[] | undefined

    mounted() {
      console.log(this.outDataSource);
    }

    selectedTags: string[] = [];

    toggle(tag: string) {
      // 每次只能选中一个
      if (this.selectedTags.length === 0) {
        this.selectedTags.push(tag);
      } else {
        this.selectedTags.pop();
        this.selectedTags.push(tag);
      }
      this.$emit('update:tag', this.selectedTags[0]);
    }

    create(tagType: string) {
      const name = window.prompt('请输入标签名');
      if (name === '') {
        window.alert('标签名不能为空');
      } else {
        if (tagType === 'out') {
          if (this.outDataSource) {
            console.log('----update');
            console.log({svg: 'newsvg', 'name': name, 'type': '-'});
            this.$emit('update:outDataSource', [...this.outDataSource, {svg: 'newsvg', 'name': name, 'type': '-'}]);
          }
        }
        if (tagType === 'in') {
          if (this.inDataSource) {
            this.$emit('update:inDataSource', [...this.inDataSource, {svg: 'newsvg', 'name': name, 'type': '+'}]);
          }
        }

      }

    }

  }
</script>

<style scoped lang="scss">
	@media (max-device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
		// iphone se
		.tags {
			max-height: 29vh;
		}

	}

	@media only screen and (min-device-width: 375px) and (max-device-height: 667px) {
		//iphone 678
		.tags {
			max-height: 37vh;
		}
	}

	@media only screen and (min-device-width: 400px) and (max-device-height: 850px) {
		//iphone 678 plus
		.tags {
			min-height: 34vh;
			max-height: 49vh;
		}
	}

	@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		//iphone X
		.tags {
			min-height: 38vh;
			max-height: 49vh;
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

	.tag-list {
		overflow: hidden;
		width: 345px;

		margin: auto;
		padding-top: 3px;

		> .tag-wrapper {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			margin-right: -20px;

			> div.selected {
				border: 1px solid rgb(248, 124, 148);
			}

			> div {
				padding: 10px;
				border: 1px solid #333;
				border-radius: 50%;
				line-height: 1;
				margin-right: 20px;
				margin-bottom: 20px;

				> svg {
					width: 30px;
					height: 30px;
				}
			}

		}
	}

</style>