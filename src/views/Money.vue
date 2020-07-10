<template>
	<Layout>
		{{this.recordItem}}
		<Types :value.sync="recordItem.type" @update:selectedTag="onUpdateTag">
		</Types>
		<Tags :is-show="recordItem.type" @update:tag:money="onUpdateTag"
					:out-data-source.sync="outputTags"
					:in-data-source.sync="inputTags"
		></Tags>
		<FormItem :value="recordItem.note" @update:value="onUpdateNote" placeholder="写点备注吧..." is-number-pad="+"></FormItem>
		<NumberPad @update:value="onUpdateAmount" @submit="saveRecord"></NumberPad>

	</Layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';
  import eventBus from '@/bus.ts';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/Money/FormItem.vue';

  const recordList = recordListModel.fetch();
  const tagList = tagListModel.fetch();


  @Component({
    components: {Types, Tags, NumberPad, FormItem}
  })
  export default class Money extends Vue {
    // outputTags: Array<Record<string, string>> = [
    //   {	svg: 'meal',
    //     name: '餐饮',
    // 		type: '-'
    //   },
    //   {
    //     svg: 'shop',
    //     name: '购物',
    //     type: '-'
    //   },
    //   {
    //     svg: 'everyday',
    //     name: '日用',
    //     type: '-'
    //   },
    //   {svg: 'transport', name: '交通', type:'-'},
    //   {svg: 'sport2', name: '运动', type:'-'},
    //   {svg: 'fun', name: '娱乐', type:'-'},
    //   {svg: 'cloth', name: '服饰', type:'-'},
    //   {svg: 'pet', name: '宠物', type:'-'}
    // ];
    // inputTags: Array<Record<string, string>> = [
    //   {svg: 'in-redpocket', name: '红包', type:'+'},
    //   {svg: 'in-rent', name: '租金', type:'+'},
    //   {svg: 'in-gift', name: '礼金', type:'+'},
    //   {svg: 'in-get', name: '收款', type:'+'},
    //   {svg: 'in-manage', name: '理财', type:'+'},
    //   {svg: 'in-annual', name: '年终奖', type:'+'},
    //   {svg: 'in-other', name: '其他', type:'+'}
    // ];

    outputTags = tagList.filter((item) => item.type === '-');
    inputTags = tagList.filter((item) => item.type === '+');

    recordList: RecordItem[] = recordList;
    recordItem: RecordItem = {
      type: '-', tag: '', amount: 0, note: '',
    };


    onUpdateTag(value: string) {
      this.recordItem.tag = value;
    }

    onUpdateAmount(value: string) {
      this.recordItem.amount = parseFloat(value);
    }

    onUpdateNote(value: string) {
      this.recordItem.note = value;
    }

    saveRecord() {
      recordListModel.create(this.recordItem);
      this.recordItem = {
        type: '-', tag: '', amount: 0, note: '',
      };
    }


  }


</script>

<style scoped lang="scss">

</style>