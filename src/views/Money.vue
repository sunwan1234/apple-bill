<template>
	<Layout>
		{{this.recordItem}}
		<Types :value.sync="recordItem.type">
		</Types>
		<Tags :fuckTags="fuckTags" @update:fucktags="onFuckChange"
					:is-show="recordItem.type"
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
  import FormItem from '@/components/Money/FormItem.vue';
  import store from '@/store/index2';


  @Component({
    components: {Types, Tags, NumberPad, FormItem}
  })
  export default class Money extends Vue {
    tagList = store.tagList;
    outputTags = store.findTag('-');
    inputTags = store.findTag('+');

    fuckTags: string[] = [];


    recordList = store.recordList;
    recordItem: RecordItem = {
      type: '-', tag: '', amount: 0, note: '',
    };

    onFuckChange(value: string[]) {
      this.fuckTags = value;
      this.recordItem.tag = value[0];
    }

    onUpdateAmount(value: string) {
      this.recordItem.amount = parseFloat(value);
    }

    onUpdateNote(value: string) {
      this.recordItem.note = value;
    }

    saveRecord() {
      console.log(this.recordItem);
      store.createRecord(this.recordItem)
      this.recordItem = {
        type: '-', tag: '', amount: 0, note: '',
      };
      this.fuckTags = [];
    }


  }


</script>

<style scoped lang="scss">

</style>