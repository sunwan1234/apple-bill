<template>
	<div class="progressContainer">
		<div class="progressItem" :style="{width:barWidth + '%'}"></div>
	</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Progress extends Vue {
    @Prop(String) barWidth: string | undefined;

  }
</script>

<style scoped lang="scss">
	.progressContainer {
		position: relative;
		height: 10px;
		width: 200px;
		background-color: #fff;
		border-radius: 5px;
		margin-right: auto;

		> .progressItem:first-child {
			position: absolute;
			height: 10px;
			width: 50px;

			border-radius: 5px;

		}


		> .progressItem:last-child {
			position: absolute;
			height: 10px;
			width: 50px;

			border-radius: 5px;

		}
	}

	.progress-0 > .progressItem {
		background: #fed058;
	}

	.progress-1 > .progressItem {
		background: rgb(244,100,123);
	}


</style>