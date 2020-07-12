<template>
	<div class="layout-wrapper" :style="{height: scrollerHeight}">
		<div class="content">
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

    mounted() {
      // window.onresize监听页面高度的变化
      window.onresize = function()  {
        console.log(document.querySelector('#app')?.clientHeight)
      }
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