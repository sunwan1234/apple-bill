<template>
	<div class="tags">
		<ul class="current out" v-if="!isNewTag && isShow === '-'">
			<li v-for="(item, index) in this.outDataSource"
					:class="{selected: fuckTags.indexOf(item.name) >= 0}"
					:key="index" @click="toggle(item.name)">
				<Icon :name="item.svg"></Icon>
				{{ item.name }}
			</li>

			<li class="new">
				<router-link to="/labels/edit">
					<button>
						<Icon name="plus"></Icon>
						新增
					</button>
				</router-link>
			</li>
		</ul>
		<ul class="current in" v-if="!isNewTag && isShow === '+'">
			<li v-for="(item, index) in this.inDataSource"
					:class="{selected: fuckTags.indexOf(item.name) >= 0}"
					:key="index" @click="toggle(item.name)">
				<Icon :name="item.svg"></Icon>
				{{ item.name }}
			</li>
			<li class="new">
				<router-link to="/labels/edit">
					<button>
						<Icon name="plus"></Icon>
						新增
					</button>
				</router-link>
			</li>
		</ul>

		<div class="tag-list" v-if="isNewTag === '+'">
			<div class="tag-wrapper">
				<div v-for="(item, index) in newDataSource" :key="index"
						 :class="{selected: fuckTags.indexOf(item) >= 0}"
						 @click="toggle(item)">
					<Icon :name="item"></Icon>
				</div>
			</div>
		</div>
	</div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, PropSync, Watch} from 'vue-property-decorator';


  @Component
  export default class Tags extends Vue {
    @Prop(String) isShow: string | undefined;
    @Prop(Array) outDataSource: Array<Record<string, string>> | undefined;
    @Prop(Array) inDataSource: Array<Record<string, string>> | undefined;
    @Prop(String) isNewTag: string | undefined;
    @Prop(Array) newDataSource: string[] | undefined;

    @Prop(Array) fuckTags: string[] | undefined;


    toggle(tag: string) {
      // 每次只能选中一个
			if(this.fuckTags) {
        if (this.fuckTags.length === 0) {
          this.fuckTags.push(tag);
        } else {
          this.fuckTags.pop();
          this.fuckTags.push(tag);
        }

        if (this.isNewTag === '+') {
          this.$emit('update:new:tag', this.fuckTags);
        } else {
          console.log('0000')
          this.$emit('update:fucktags', this.fuckTags);
        }
			}
    }


      // toggle(tag: string) {
      //   // 每次只能选中一个
      //   if (this.selectedTags.length === 0) {
      //     this.selectedTags.push(tag);
      //   } else {
      //     this.selectedTags.pop();
      //     this.selectedTags.push(tag);
      //   }
      //
      //   if (this.isNewTag === '+') {
      //     this.$emit('update:new:tag', this.selectedTags[0]);
      //   } else {
      //     this.$emit('update:value', this.selectedTags[0]);
      //   }
      // }


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