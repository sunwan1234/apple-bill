<template>
	<Layout>
		<Types class-prefix="type-statistics" :value.sync="type"></Types>
		<div class="chart-wrapper" ref="chartWrapper">
			<Chart class="chart" :options="x"/>
		</div>
		<div>

		</div>

	</Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Types from '@/components/Money/Types.vue';
  import clone from '@/lib/clone';
  import dayjs from 'dayjs';
  import Progress from '@/components/Progress.vue';
  import Chart from '@/components/Chart.vue';
  import _ from 'lodash';

  interface FigurePointArray {
    date: string;
    value: string;
  }

  @Component({
    components: {Chart, Progress, Types}
  })
  export default class Figure extends Vue {
    type = '-';

    mounted() {
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }

    get recordList() {
      return this.$store.state.recordList;
    }


    convertToLikelyFloat(value: string) {
      if (value) {
        const arr = value.split('');
        arr.splice(-2, 0, '.');
        return arr.join('');
      }
    }

    get y(){
      const copyRecordList = clone(this.recordList)
        .filter(record => record.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

      const today = new Date();
      const array: FigurePointArray[] = [];
      for (let i = 0; i <= 29; i++) {
        const dateString = dayjs(today)
          .subtract(i, 'day')
          .format('YYYY-MM-DD');
        const found: RecordItem[] | [] = copyRecordList.filter((record) => {
            const recordTime = dayjs(record.createdAt).format('YYYY-MM-DD');
            return recordTime === dateString;
          }
        );

        if (found.length <= 1) {
          array.push({
            'date': dateString,
            'value': found.length === 0 ? '0' : this.convertToLikelyFloat(found[0].amount) as string
          });
        } else {
          let totalAmount = 0;
          for (let j = 0; j < found.length; j++) {
            totalAmount += parseInt(found[j].amount);
          }
          array.push({'date': dateString, 'value': this.convertToLikelyFloat(totalAmount.toString()) as string});
        }
      }
      return  array.reverse()
		}

    get x() {
      const keys = this.y.map((item) => item.date);
      const values = this.y.map((item) => item.value);

      return {
        grid: {
          left: 0,
          right: 0,
        },

        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {alignWithLabel: true},
          axisLine: {lineStyle: {color: '#666'}}
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          symbol: 'circle',
          symbolSize: 12,
          itemStyle: {borderWidth: 1, color: '#fed058', borderColor: '#666'},
          // lineStyle: {width: 10},
          data: values,
          type: 'line'
        }],
        tooltip: {
          show: true, triggerOn: 'click',
          position: 'top',
          formatter: '{c}'
        }

      };
    }


  }
</script>

<style scoped lang="scss">


	.chart {
		width: 430%;
		height: 300px;

		&-wrapper {
			overflow: auto;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
</style>