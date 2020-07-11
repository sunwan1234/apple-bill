<template>
	<Layout>
		{{this.recordItem}}
		<Types :value.sync="recordItem.type">
		</Types>
		<Tags :fuckTags="fuckTags" @update:fucktags="onFuckChange"
					:is-show="recordItem.type"></Tags>
		<FormItem :value="recordItem.note" @update:value="onUpdateNote" placeholder="写点备注吧..." is-number-pad="+"></FormItem>
		<NumberPad @update:value="onUpdateAmount" @submit="saveRecord"></NumberPad>

	</Layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import initialRecord from '@/constants/initialRecord';
  import clone from '@/lib/clone';


  @Component({
    components: {Types, Tags, NumberPad, FormItem},
    computed: {
      recordList() {
        return this.$store.state.recordList;
      },
      tagList() {
        return this.$store.state.tagList;
      }
    }
  })
  export default class Money extends Vue {
    fuckTags: Tag[] = [];
    recordItem: RecordItem = clone(initialRecord)

    created() {
      this.$store.commit('fetchRecords');
    }


    onFuckChange(value: Tag[]) {
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
      if (!this.recordItem.tag) {
        this.clearData();
        return window.alert('请选择一个标签');
      }
      this.$store.commit('createRecord', this.recordItem);
      this.clearData();
    }

    clearData() {
      this.recordItem = {
        type: this.recordItem.type, tag: {'id': '', 'svg': '', 'name': '', 'type': ''}, amount: 0, note: '',
      };
      this.fuckTags = [];
    }


  }


</script>

<style scoped lang="scss">

</style>