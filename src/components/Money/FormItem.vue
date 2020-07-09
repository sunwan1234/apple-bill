<template>
	<div class="notes-wrapper">
		<label class="notes">
			<span class="name">备注</span>
			<input v-model="value"
						 type="text"
						 :placeholder="placeholder">
			<span class="output" v-if="isNewTag === '+'">{{output}}</span>
			<Icon name="pencil"  v-if="isNewTag === '+'"></Icon>
		</label>
	</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import eventBus from '@/bus.ts';

  @Component
  export default class FormItem extends Vue {
    value = '';

    @Prop(String) output: string | undefined;
    @Prop(String) placeholder?: string;
    @Prop(String) isNewTag: string | undefined;

    @Watch('value')
    onValueChange(value: string) {
      eventBus.$emit('update:note', value);
    }

  }
</script>

<style scoped lang="scss">
	.notes {
		font-size: 14px;
		background: #f5f5f5;
		padding-left: 16px;
		padding-right: 10px;
		display: flex;
		align-items: center;
		border: 1px solid #333;
		border-radius: 16px;

		.name {
			padding-right: 16px;
		}

		input {
			height: 56px;
			flex-grow: 1;
			background: transparent;
			border: none;
			padding-right: 12px;
			width: 100px;
		}

		.output {
			font-size: 30px;
		}

		svg {
			width: 26px;
			height: 26px;
		}
	}

	.notes-wrapper {
		position: relative;
		margin: 4px;
	}
</style>