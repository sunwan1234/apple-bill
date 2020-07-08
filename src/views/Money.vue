<template>
	<Layout>
		<Types :value.sync="account.type" @update:selectedTag="onUpdateTag">
		</Types>
		<Tags :is-show="account.type" @update:tag="onUpdateTag"
					:out-data-source.sync="outputTags"
					:in-data-source.sync="inputTags"
		></Tags>
		<NumberPad @update:value="onUpdateAmount" @submit="saveAccount"></NumberPad>

	</Layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';
  import eventBus from '@/bus.ts';
  import accountListModel from '@/models/accountListModel';

  const accountList = accountListModel.fetch();

  @Component({
    components: {Types, Tags, NumberPad}
  })
  export default class Money extends Vue {
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


    accountList: AccountItem[] = accountList;
    account: AccountItem = {
      type: '-', tag: '', amount: 0, note: '',
    };


    onUpdateTag(value: string) {
      this.account.tag = value;
    }

    onUpdateAmount(value: string) {
      this.account.amount = parseFloat(value);
    }

    onUpdateNote(value: string) {
      this.account.note = value;
    }

    saveAccount(account: AccountItem) {
      accountListModel.create(account)
    }


    @Watch('accountList')
    onAccountListChange() {
      accountListModel.save()
    }

    created() {
      eventBus.$on('update:note', (note: string) => {
        this.onUpdateNote(note);
      });
    }

    beforeDestroy() {
      eventBus.$off('update:note');
    }

  }


</script>

<style scoped lang="scss">

</style>