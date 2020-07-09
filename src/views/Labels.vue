<template>
	<Layout>
		{{tags}}
		<Types :value.sync="record.type">
		</Types>
		<div class="labels-wrapper">
			<ol class="labels" v-if=" isShow === '-'">
				<li v-for="(item, index) in this.outputTags"
						:key="index">
				<span class="iconItem">
					<Icon :name="item.svg"></Icon>
					<span>{{ item.name }}</span>
				</span>
					<Icon :name="'delete2'" @click="deleteTag(item.id)"></Icon>
				</li>
			</ol>
			<ol class="labels" v-if=" isShow === '+'">
				<li v-for="(item, index) in this.inputTags"
						:key="index">
				<span class="iconItem">
					<Icon :name="item.svg"></Icon>
					<span>{{ item.name }}</span>
				</span>

					<Icon :name="'delete2'"></Icon>
				</li>
			</ol>
			<div class="createTag-wrapper" v-if=" isShow === '-'">
				<router-link to="/labels/edit">
					<!--					<button class="createTag" @click="createTag('-')">新建支出标签</button>-->
					<button class="createTag">新建支出标签</button>
				</router-link>

			</div>
			<div class="createTag-wrapper" v-if=" isShow === '+'">
				<button class="createTag" @click="createTag('+')">新建收入标签</button>
			</div>

		</div>

	</Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import Types from '@/components/Money/Types.vue';
  import tagListModel from '@/models/tagListModel';


  tagListModel.fetch();
  @Component({
    components: {Types}
  })
  export default class Labels extends Vue {
    tags = tagListModel.data;
    outputTags = this.tags.filter((item) => item.type === '-');
    inputTags = this.tags.filter((item) => item.type === '+');


    record: RecordItem = {
      type: '-', tag: '', amount: 0, note: '',
    };
    isShow!: string;

    @Watch('record.type', {immediate: true})
    onRecordTypeChange(value) {
      this.isShow = value;
    }

    @Watch('tags', {immediate: true})
    onTagChange(tags) {
      this.outputTags = tags.filter((item) => item.type === '-');
      this.inputTags = tags.filter((item) => item.type === '+');
    }

    createTag(type: string) {
      const name = window.prompt('请输入标签名');
      if (name) {
        const message = tagListModel.create(name, type);
        if (message === 'duplicated') {
          window.alert('标签名重复');
        } else if (message === 'success') {
          window.alert('添加成功');
        }
      }
    }


  }
</script>

<style scoped lang="scss">
	.labels-wrapper {
		display: flex;
		flex-direction: column;
	}

	.labels {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		font-size: 16px;
		max-height: 65vh;

		li {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #e6e6e6;
			padding-right: 10px;

			> .iconItem {
				display: flex;
				align-items: center;
				padding: 5px 2px;
			}

			> .iconItem svg {
				border: 1px solid #333;
				padding: 5px;
				width: 2em;
				height: 2em;
				border-radius: 50%;
				background: white;
				margin-right: 5px;
			}
		}
	}

	.createTag {
		background: #fed058;
		color: #333;
		border-radius: 4px;
		border: none;
		height: 40px;
		padding: 0 16px;

		&-wrapper {
			text-align: center;
			padding: 16px;
		}
	}
</style>