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

		<Tags :is-show="type"></Tags>
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
    type = '-';//'-' 表示支出， ‘+’表示收入

    @Prop(Number) xxx: number | undefined;
    // prop 告诉 vue ：xxx 不是 data, 是prop
    // Number 告诉 Vue : 运行时  xxx是个Number
    // xxx 是属性名
    // number | undefined 告诉 TS xxx的 编译时 类型

    @Prop(Number) xxxx = 0;

    selectType(type: string) { // type只能是'-' 或者 '+'
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      this.type = type;

    }

    mounted() {
      console.log(this.xxx);
    }

  }
  // export default {
  //     name: 'Types',
  // 		props:['xxx'],
  //     data() {
  //         return {
  //             type: '-' //'-' 表示支出， ‘+’表示收入
  //         }
  //     },
  // 		mounted(){
  //       console.log(this.xxx)
  // 		},
  //     methods: {
  //         selectType(type) { // type只能是'-' 或者 '+'
  //             if (type !== '-' && type !== '+') {
  //                 throw new Error('type is unknown')
  //             }
  //             this.type = type
  //
  //         }
  //     }
  // };
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
		/*background: url("~@/assets/1.png") center center no-repeat;*/
		/*background-size: 50% 100%;*/
		border-bottom: 1px solid #333333;
	}

</style>