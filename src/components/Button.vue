<template>
	<button class="button" @click="$emit('click', $event)">
		<slot></slot>
	</button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {

  }
</script>

<style scoped lang="scss">
	.button {
		background: #fed058;
		color: #333;
		border-radius: 4px;
		border: none;
		height: 40px;
		padding: 0 16px;
	}
</style>