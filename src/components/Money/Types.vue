<template>
	<div>
		<ol class="types">
			<li :class=" type === '-' && 'selected' " @click="selectType('-')">
				<span>支出</span>
			</li>
			<li :class=" type === '+' && 'selected' " @click="selectType('+')">
				<span>收入</span>
			</li>
		</ol>

		<Tags :is-show="type" :out-data-source="outputDataSource" :in-data-source="inputDataSource"></Tags>
	</div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Tags from '@/components/Money/Tags.vue';

  @Component({
    components: {Tags}
  })
  export default class Types extends Vue {
    @Prop(Object) outputDataSource: Record<string, string> | undefined;
    @Prop(Object) inputDataSource: Record<string, string> | undefined;
    type = '-';//'-' 表示支出， ‘+’表示收入

    selectType(type: string) { // type只能是'-' 或者 '+'
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      this.type = type;

    }

  }

</script>

<style scoped lang="scss">
	.types {
		display: flex;
		flex-direction: row;
		background: #fed058;
	}

	.types > li {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		padding: 5px 0;
		position: relative;
	}

	.types > li.selected {
		border-bottom: 1px solid #333333;
	}

</style>