<template>
	<Layout>
		<Types class-prefix="type-statistics" :value.sync="type"></Types>
		<div class="chart-wrapper" ref="chartWrapper">
			<Chart class="chart" :options="chartOptions"/>
		</div>
		<h2 v-if="type==='-'">
			<span class="title">支出分布</span></h2>
		<h2 v-else>
			<span class="title">收入分布</span></h2>
		<div class="pieChartWrapper" ref="pieChartWrapper">
			<Chart class="pie-chart" :options="pieChartOptions"/>
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

  interface FigurePointArray {
    date: string;
    value: string;
  }

  interface CategoryArray {
    name: string;
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

    get keyValueList() {
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
      return array.reverse();
    }

    get chartOptions() {
      const keys = this.keyValueList.map((item) => item.date);
      const values = this.keyValueList.map((item) => item.value);

      return {
        grid: {
          left: 0,
          right: 0,
          top: 0

        },

        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {alignWithLabel: true},
          axisLine: {lineStyle: {color: '#666'}},
          axisLabel: {
            formatter: function (value: string) {
              return value.substr(5);
            }
          },
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
          show: true,
          position: 'top',
          formatter: '{c}'
        }

      };
    }

    get categoryList() {
      const copyRecordList = clone(this.recordList)
        .filter(record => record.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

      console.log(copyRecordList);

      const map = new Map();
      for (let i = 0; i < copyRecordList.length; i++) {
        const category: string = copyRecordList[i].tag.name;
        const value: string = copyRecordList[i].amount;
        console.log(category);
        console.log(map);
        if (map.has(category)) {
          const prevValue = parseInt(map.get(category));
          const currentValue = prevValue + parseInt(value);
          map.set(category, currentValue.toString());
        } else {
          map.set(category, value);
        }

      }


      return [...map].sort((a, b) => {
        const valueForA = parseInt(a[1]);
        const valueForB = parseInt(b[1]);
        if (valueForA > valueForB) {
          return -1;
        } else if (valueForA === valueForB) {
          return 0;
        } else {
          return 1;
        }
      });


    }

    get pieChartOptions() {
      console.log(this.categoryList);

      const names = this.categoryList.map((item) => item[0]);

      const pieOptions = this.categoryList.reduce((results, item) => {
        results.push({'name': item[0] as string, 'value': this.convertToLikelyFloat(item[1]) as string});
        return results;
      }, [] as CategoryArray[]);

      return {
        grid: {
          left: 0,
          right: 0,
          top: 10,
          bottom: 10
        },

        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: names
        },

        series: [
          {
            type: 'pie',
            radius: [20, 100],
            roseType: 'radius',
            label: {
              show: true,
              position: 'outside',
							color:'#333'
            },
            labelLine: {
              length: 5,
              length2: 5,
            },
            color: ['#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea', '#37a2da', '#32c5e9'],
            emphasis: {
              label: {
                show: true
              }
            },
            data: pieOptions,
            center: ['50%', '50%']
          },

        ]
      };

    }


  }
</script>

<style scoped lang="scss">


	.chart {
		width: 430%;

		&-wrapper {
			overflow: auto;
			flex-shrink: 0;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}

	.pie-chart {
		width: 300px;
		height: 300px;
		margin: 0 auto;
	}

	h2 {
		margin-left: 10px;
		> .title {
			border-bottom: 2px solid #fed058;
		}

	}
</style>