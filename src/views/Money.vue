<template>
	<Layout>
		<Types :output-data-source="outputTags" :input-data-source="inputTags"></Types>


		<NumberPad></NumberPad>

	</Layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';


  @Component({
    components: {Types, Tags, NumberPad}
  })
  export default class Money extends Vue {
    outputTags: Record<string, string> = {
      'meal': '餐饮',
			'shop':'购物',
      'everyday': '日用',
      'transport': '交通',
      'sport2': '运动',
      'fun': '娱乐',
      'cloth': '服饰',
      'pet': '宠物',
		};

    inputTags: Record<string, string> = {
      'in-redpocket': '红包',
      'in-rent': '租金',
      'in-gift': '礼金',
      'in-get': '收款',
      'in-manage': '理财',
      'in-annual': '年终奖',
      'in-other': '其他',

    }

  }
</script>

<style scoped lang="scss">

</style>