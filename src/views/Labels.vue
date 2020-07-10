<template>
	<Layout>
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

					<Icon :name="'delete2'" @click="deleteTag(item.id)"></Icon>
				</li>
			</ol>
			<div class="button-wrapper" v-if=" isShow === '-'">
				<router-link to="/labels/edit">
					<Button>新建标签</Button>
				</router-link>
			</div>
			<div class="button-wrapper" v-if=" isShow === '+'">
				<router-link to="/labels/edit">
					<Button>新建标签</Button>
				</router-link>
			</div>

		</div>

	</Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import Types from '@/components/Money/Types.vue';
  import Button from '@/components/Button.vue';


  @Component({
    components: {Button, Types}
  })
  export default class Labels extends Vue {
    tags = window.tagList;
    outputTags = window.findTag('-');
    inputTags = window.findTag('+');


    record: RecordItem = {
      type: '-', tag: '', amount: 0, note: '',
    };
    isShow!: string;

    @Watch('record.type', {immediate: true})
    onRecordTypeChange(value) {
      this.isShow = value;
    }


    deleteTag(id) {
      console.log(id);
      const result = window.removeTag(id);
      if (result) {
        window.alert('删除成功');
      } else {
        window.alert('没有找到该标签');
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

	.button-wrapper {
		text-align: center;
		margin-top: 10px;
	}

</style>