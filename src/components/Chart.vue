<template>
	<div class="wrapper" ref="wrapper">

	</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Prop, Component} from 'vue-property-decorator';
  import eCharts, {EChartOption, ECharts} from 'echarts';

  @Component
  export default class Chart extends Vue {
    @Prop() options: EChartOption | undefined;
    chart?: ECharts;

    mounted() {
      if (this.options === undefined) {
        return console.error('options不能为空');
      }

      console.log(this.options);
      this.chart = eCharts.init(this.$refs.wrapper as HTMLDivElement);
      this.chart.setOption(this.options);
      console.log(this.chart)

    }


  }
</script>

<style scoped lang="scss">
	.wrapper {
		height: 400px;
	}
</style>