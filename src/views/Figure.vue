<template>
	<Layout>
		<div class="chart-wrapper" ref="chartWrapper">
			<Chart class="chart" :options="x"/>
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


  @Component({
    components: {Chart, Progress, Types}
  })
  export default class Figure extends Vue {
    type = '-';

    mounted() {

      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }

    get x() {
      return {
        grid: {
          left: 0,
          right: 0,
        },

        xAxis: {
          type: 'category',
          data: [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
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
          data: [
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320, 900, 876,
          ],
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