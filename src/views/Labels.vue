<template>
	<Layout>
		{{account.type}}
		{{isShow}}
		<Types :value.sync="account.type">
		</Types>
		<div class="labels-wrapper">

			<ol class="labels" v-if=" isShow === '-'">
				<li v-for="(item, index) in this.outputTags"
						:key="index">
				<span class="iconItem">
					<Icon :name="item.svg"></Icon>
					<span>{{ item.name }}</span>
				</span>
					<Icon :name="'delete2'"></Icon>
				</li>
				<li>i</li>
				<li>i</li>
				<li>i</li>
				<li>i</li>
				<li>i</li>
				<li>i</li>
				<li>i</li>
				<li>i</li>
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
			<div class="createTag-wrapper">
				<button class="createTag" >新建标签</button>
			</div>

		</div>

	</Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import recordListModel from '@/models/recordListModel';
  import Types from '@/components/Money/Types.vue';


  const accountList = recordListModel.fetch();

  @Component({
    components: {Types}
  })
  export default class Labels extends Vue {
    outputTags: Array<Record<string, string>> = [
      {
        svg: 'meal',
        name: '餐饮'
      },
      {
        svg: 'shop',
        name: '购物'
      },
      {
        svg: 'everyday',
        name: '日用'
      },
      {svg: 'transport', name: '交通'},
      {svg: 'sport2', name: '运动'},
      {svg: 'fun', name: '娱乐'},
      {svg: 'cloth', name: '服饰'},
      {svg: 'pet', name: '宠物'}
    ];
    inputTags: Array<Record<string, string>> = [
      {svg: 'in-redpocket', name: '红包'},
      {svg: 'in-rent', name: '租金'},
      {svg: 'in-gift', name: '礼金'},
      {svg: 'in-get', name: '收款'},
      {svg: 'in-manage', name: '理财'},
      {svg: 'in-annual', name: '年终奖'},
      {svg: 'in-other', name: '其他'}
    ];

    accountList: RecordItem[] = accountList;
    account: RecordItem = {
      type: '-', tag: '', amount: 0, note: '',
    };
    isShow!: string | undefined;

    @Watch('account.type', {immediate: true})
    onAccountTypeChange(value) {
      this.isShow = value;
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