<template>
	<Layout>
		<Types class-prefix="type" :value.sync="type"></Types>
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


  @Component({
    components: {Types}
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
        console.log('hi');
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
      const arr = value.split('')
			arr.splice(-2, 0, '.');
      return arr.join('');
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
  }
</script>

<style scoped lang="scss">
	::v-deep .type-item {

		&.selected {
			background: #fed058;
		}
	}

	.everyday-li-wrapper {
		margin-top: 10px;
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
</style>