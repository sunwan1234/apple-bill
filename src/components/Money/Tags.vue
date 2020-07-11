<template>
	<div class="tags">
		<div class="current out" v-if="!isNewTag && isShow === '-'">
			<div class="div-wrapper">
				<div v-for="(item, index) in this.outDataSource"
						 :class="{selected: fuckTags.indexOf(item) >= 0}"
						 :key="index" @click="toggle(item)">
					<Icon :name="item.svg"></Icon>
					{{ item.name }}
				</div>

				<div class="new">
					<router-link to="/labels/edit">
						<button>
							<Icon name="plus"></Icon>
							新增
						</button>
					</router-link>
				</div>
			</div>


		</div>
		<div class="current in" v-if="!isNewTag && isShow === '+'">
			<div class="div-wrapper">
				<div v-for="(item, index) in this.inDataSource"
						 :class="{selected: fuckTags.indexOf(item.name) >= 0}"
						 :key="index" @click="toggle(item)">
					<Icon :name="item.svg"></Icon>
					{{ item.name }}
				</div>
				<div class="new">
					<router-link to="/labels/edit">
						<button>
							<Icon name="plus"></Icon>
							新增
						</button>
					</router-link>
				</div>
			</div>
		</div>

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
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop(String) isShow: string | undefined;
    @Prop(String) isNewTag: string | undefined;
    @Prop(Array) fuckTags: Tag[] | undefined;

    get tags() {
      return this.$store.state.tagList;
    }

    beforeCreate() {
      this.$store.commit('fetchTags');

    }

    created() {
      this.$store.commit('getNewTagList');
    }

    get outDataSource() {
      return this.$store.state.tagList.filter(item => item.type === '-');
    }

    get inDataSource() {
      return this.$store.state.tagList.filter(item => item.type === '+');
    }

    get newDataSource() {
      return this.$store.state.defaultTagList;
    }


    toggle(tag: Tag) {
      // 每次只能选中一个
      if (this.fuckTags) {
        if (this.fuckTags.length === 0) {
          this.fuckTags.push(tag);
        } else {
          this.fuckTags.pop();
          this.fuckTags.push(tag);
        }

        if (this.isNewTag === '+') {
          this.$emit('update:new:tag', this.fuckTags);
        } else {
          this.$emit('update:fucktags', this.fuckTags);
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
		.tags .current > div.div-wrapper {

			justify-content: center;

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

	.tags::-webkit-scrollbar {
		display: none;
	}

	.tags {
		flex-shrink: 1;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.tags .current {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
		font-size: 12px;
		max-width: 350px;
		margin-left: auto;
		margin-right: auto;
	}

	.tags .current > div {
		display: flex;
		flex-wrap: wrap;
		margin-right: -10px;
	}

	.tags .current > div > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 68px;
		border: 2px solid #333;
		border-radius: 50%;
		margin-right: 22px;
		margin-bottom: 10px;
		padding: 8px;
	}

	.tags .current > div > div.selected {
		border: 2px solid rgb(248, 124, 148);
	}

	.tags .current > div > div svg {
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