<template>
	<div class="layout-wrapper" :style="{height: scrollerHeight}">
		<div class="content" :style="{'max-height': contentHeight}">
			<slot></slot>
		</div>
		<Nav></Nav>
	</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  @Component
  export  default class App extends Vue {
    get scrollerHeight(){
      return document.documentElement.clientHeight + 'px'
    }
    get contentHeight (){
      const contentHeight = document.documentElement.clientHeight - 54
      return contentHeight + 'px'
		}

  }
</script>

<style scoped lang="scss">
	.layout-wrapper {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.layout-wrapper::-webkit-scrollbar {
		display: none;
	}

	.content {
		flex-grow: 1; // 让内容尽量占满
		overflow: auto;
		display: flex;
		flex-direction: column;
	}
</style>