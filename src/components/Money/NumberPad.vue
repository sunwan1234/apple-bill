<template>
	<div class="numberPad">
		<div class="output">{{output}}</div>
		<div class="buttons">
			<button @click="inputContent">1</button>
			<button @click="inputContent">2</button>
			<button @click="inputContent">3</button>
			<button @click="remove">删除</button>
			<button @click="inputContent">4</button>
			<button @click="inputContent">5</button>
			<button @click="inputContent">6</button>
			<button @click="clear">清空</button>
			<button @click="inputContent">7</button>
			<button @click="inputContent">8</button>
			<button @click="inputContent">9</button>
			<button @click="inputContent">.</button>
			<button @click="inputContent" class="zero">0</button>
			<button @click="ok" class="ok">OK</button>


		</div>
	</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';

  @Component({
    components: {FormItem}
  })

  export default class NumberPad extends Vue {
    output = '0';

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent as string; // 强制让input不会为空
      if (this.output.length === 11) {return;}
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }

      if (this.output.indexOf('.') >= 0 && input === '.') {
        return;
      }

      this.output += input;

    }

    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
    }

    clear() {
      this.output = '0';
    }

    ok() {
      this.$emit('update:value', this.output);
      this.$emit('submit', this.output);
      this.output = '0';
    }

  }
</script>

<style scoped lang="scss">
	@import "~@/assets/styles/helper.scss";

	.numberPad {
		background: rgb(254, 208, 88);
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		flex-grow: 1;


		.output {
			@extend %clearFix;
			font-size: 34px;
			font-family: Consolas, monospace;
			text-align: right;
			border: 1px solid #333;
			border-radius: 10px;
			background: white;
			padding: 0;
			padding-right: 5px;
			margin: 3px;
		}

		.buttons {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			flex-grow: 1;
			padding: 2px;
			margin: 1px 3px;


			> button {
				width: 21%;
				border: 1px solid #333;
				border-radius: 10px;
				background: white;
				flex-grow: 1;
				padding: 10px;
				margin: 3px;
				font-size: 16px;

			}
		}
	}


</style>