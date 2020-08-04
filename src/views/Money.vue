<template>
	<Layout>
		<Types :value.sync="recordItem.type">
		</Types>
		<Tags :fuckTags="fuckTags" @update:fucktags="onFuckChange"
					:is-show="recordItem.type"></Tags>
		<div class="createdAt">
			<FormItem field-name="日期" placeholder="在这里输入日期"
								:value.sync="recordItem.createdAt"
								type="date"
			></FormItem>
		</div>
		<div class="moneyNotes">
			<FormItem field-name="备注"
								:value="recordItem.note"
								@update:value="onUpdateNote"
								placeholder="写点备注吧..."
								is-number-pad="+"></FormItem>
		</div>

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
    fuckTags: Tag[] = [{id: '1', svg: 'meal', name: '餐饮', type: '-'}];
    recordItem: RecordItem = clone(initialRecord);

    created() {
      this.$store.commit('fetchRecords');
    }


    onFuckChange(value: Tag[]) {
      this.fuckTags = value;
      this.recordItem.tag = value[0];
    }

    onUpdateAmount(value: string) {
      this.recordItem.amount = value;
    }

    onUpdateNote(value: string) {
      this.recordItem.note = value;
    }

    saveRecord() {


      console.log(this.recordItem);
      if (this.recordItem.amount === '000') {
        window.alert('请填写金额');
        return;
      }
      this.$store.commit('createRecord', this.recordItem);
      this.clearData();
    }

    clearData() {
      this.recordItem = {
        type: this.recordItem.type, tag: this.recordItem.tag, amount: '0.00', note: '',
      };

    }


  }


</script>

<style scoped lang="scss">
	.moneyNotes {
		::v-deep .notes-wrapper {
			position: relative;

			.notes {
				position: absolute;
				margin: 0;
				background: transparent;
				border: none;
				border-radius: 0;
				top: 6px;
				left: 4px;

				input[type=text] {
					width: 150px;
				}
			}
		}

	}

	.createdAt {
		::v-deep .notes-wrapper {
			& input[type="date"] {
				position: relative;
			}

			& input[type="date"]::-webkit-datetime-edit {
				position: absolute;
				left: 30px
			}

			& input[type="date"]::-webkit-calendar-picker-indicator {
				position: absolute;
				width: 100%;
				left: -24px;
				top: 6px;

			}
		}
	}
</style>