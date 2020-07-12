<template>
	<Layout>
		<div class="title">
			<span>收支明细</span>
		</div>
		<div class="progress-lists">
			<div class="final-title-number">
				<span class="final-title">累计结余</span>
				<span class="final-number">￥{{minusTotalData}}</span>

			</div>
			<div class="out" v-for="(item, index) in totalData" :key="item.name">
				<span>共{{item.name}}</span>
				<Progress :class="'progress-' + index"
									:bar-width="Math.round(item.value / totalDataSum *100).toString()"></Progress>
				<span>￥{{item.origin}}</span>
			</div>
		</div>

		<Types class-prefix="type-statistics" :value.sync="type"></Types>
		<ol class="everyday-li-wrapper">
			<li class="everyday-li" v-for="(group, index) in groupedList" :key="index">
				<span class="title">{{beautify(group.title)}}</span>
				<ol>
					<li v-for="item in group.items" :key="item.id"
							class="record">
						<span class="icon-wrapper">
							<Icon :name="item.tag.svg"></Icon>
						</span>
						<span class="text">
								<span class="name">{{item.tag.name}}</span>
							<span class="time-and-notes">
								  <span class="time">{{toTime(item.createdAt)}}</span>
									<span class="notes">{{item.note}}</span>
							</span>

						</span>

						<span>￥{{convertToLikelyFloat(item.amount)}} </span>
					</li>
				</ol>
				<div class="total-wrapper">
					<span>总计：&nbsp; {{type}}￥{{group.total}}</span>
				</div>

			</li>
		</ol>
	</Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Types from '@/components/Money/Types.vue';
  import clone from '@/lib/clone';
  import dayjs from 'dayjs';
  import Progress from '@/components/Progress.vue';


  @Component({
    components: {Progress, Types}
  })
  export default class Statistics extends Vue {
    type = '-';


    get recordList() {
      return this.$store.state.recordList;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {

        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    toTime(string: string) {
      const day = dayjs(string);
      return day.format('HH:mm');
    }

    getTotal(itemArray: RecordItem[]) {
      const intResultOfTotal = itemArray.reduce((sum, item) => {
        return sum + parseInt(item.amount);
      }, 0);
      return this.convertToLikelyFloat(intResultOfTotal.toString());
    }

    convertToLikelyFloat(value: string) {
      if (value) {
        const arr = value.split('');
        arr.splice(-2, 0, '.');
        return arr.join('');
      }
    }

    get groupedList() {
      const copyRecordList = clone(this.recordList)
        .filter(record => record.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

      if (copyRecordList.length === 0) {
        return [] as Result[];
      }

      type Result = { title: string; total?: string; items: RecordItem[] }[]
      const result: Result = [{
        title: dayjs(copyRecordList[0].createdAt).format(),
        items: [copyRecordList[0]]
      }];

      for (let i = 1; i < copyRecordList.length; i++) {
        const current = copyRecordList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }

      result.map(group => {
        group.total = this.getTotal(group.items);
      });


      return result;
    }

    get totalAmount() {
      const copyRecordList = clone(this.recordList);
      const allOutRecords = copyRecordList.filter(item => item.type === '-');
      const allInRecords = copyRecordList.filter(item => item.type === '+');

      const outAmount = allOutRecords.reduce((sum, item) => {
        return sum + parseInt(item.amount);
      }, 0);

      const inAmount = allInRecords.reduce((sum, item) => {
        return sum + parseInt(item.amount);
      }, 0);

      const resultOut = this.convertToLikelyFloat(outAmount.toString());
      const resultIn = this.convertToLikelyFloat(inAmount.toString());

      return [resultOut, resultIn];
    }

    get totalData() {
      return [
        {value: parseFloat(this.totalAmount[0]!), name: '支出', origin: this.totalAmount[0]},
        {value: parseFloat(this.totalAmount[1]!), name: '收入', origin: this.totalAmount[1]},
      ];
    }

    get totalDataSum() {
      return this.totalData[0].value + this.totalData[1].value;
    }

    get minusTotalData() {
      const inNumber = this.totalData[1].origin;
      const outNumber = this.totalData[0].origin;
      let finalResult = '' ;
      if (inNumber && outNumber) {
        const inNumberString = inNumber.toString();
        const outNumberString = outNumber.toString();
        const arr1 = inNumberString.split('');
        const arr2 = outNumberString.split('');
        arr1.splice(arr1.indexOf('.'), 1);
        arr2.splice(arr2.indexOf('.'), 1);
        const arr1Combined = arr1.join('');
        const arr2Combined = arr2.join('');
        if (arr1Combined && arr2Combined) {
          const result = parseInt(arr1Combined) - parseInt(arr2Combined);
          finalResult = this.convertToLikelyFloat(result.toString())!;

        }
      }

      return finalResult;
    }
  }
</script>

<style scoped lang="scss">
	.title {
		margin: 10px;

		> span {
			font-size: 18px;
			border-bottom: 2px solid #fed058;
		}
	}

	::v-deep .type-statistics {
		background: #fff;
		display: flex;
		justify-content: flex-end;
	}

	::v-deep .type-statistics li.type-statistics-item {
		font-size: 16px;
		margin-right: 10px;
		background: #fff;
		width: 45px;

		&.selected {
			border: none;
			color: #fd9b09;
		}
	}

	.everyday-li-wrapper {
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.everyday-li {
		margin-left: 10px;
		margin-right: 10px;

		.title {
			border-bottom: 2px solid #fed058;
		}

		li.record {
			display: flex;
			justify-content: space-between;
			margin: 10px 0;
			align-items: center;
			padding-left: 10px;

			&:last-child {
				border-bottom: 1px solid #e6e6e6;
				padding-bottom: 10px;
			}

			> .icon-wrapper {
				display: flex;
				align-items: center;
				margin-right: 10px;

				& > svg.icon {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					border: 1px solid #333;
					margin-right: 10px;
					padding: 5px;

				}

			}

			> .text {
				margin-right: auto;
				display: flex;
				flex-direction: column;

				& > .name {
					font-weight: bold;
					font-size: 16px;
				}

				& > .time-and-notes {
					font-size: 14px;
					color: gray;

					> .time {
						margin-right: 10px;
					}

				}
			}

		}

		.total-wrapper {
			text-align: right;
		}

	}

	.progress-lists {
		display: flex;
		flex-direction: column;
		margin: 10px;
		border: 1px solid #333;
		border-radius: 18px;
		padding: 20px 30px;

		& > .out {
			display: flex;
			align-items: center;
			justify-content: space-between;

			& > span {
				margin-right: 10px;
				font-size: 12px;
				color: gray;
				width: 40px;
			}
		}
	}

	.final-title-number {
		display: flex;
		justify-content: space-between;

		> .final-title {
			font-weight: bold;
			font-size: 16px;
		}

		> .final-number {
			font-size: 20px;
			color: rgb(244, 100, 123);;
		}
	}
</style>