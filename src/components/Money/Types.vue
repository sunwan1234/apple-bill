<template>
	<div>
		<ol :class=" IsNewTag === '1' ? `types new-tag ${this.classPrefix}` :
		 `types ${this.classPrefix}` ">
			<li :class="liClass('-')"
					@click="selectType('-')">
				<span>支出</span>
			</li>
			<li :class="liClass('+')"
					@click="selectType('+')">
				<span>收入</span>
			</li>
		</ol>

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
    @Prop(String) readonly value!: string;
    @Prop(String) readonly 'IsNewTag';
    @Prop(String) classPrefix?: string;

    selectType(type: string) { // type只能是'-' 或者 '+'
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      this.$emit('update:value', type);
      this.$emit('update:selectedTag', '');
    }

    liClass(type: string) {
      return {
        [this.classPrefix + '-item']: this.classPrefix,
        selected: this.value === type
      };
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
		font-size: 20px;
		padding: 5px 0;
		position: relative;
	}

	.types > li.selected {
		border-bottom: 1px solid #333333;
	}

	.new-tag {
		background-color: #fff;
	}

	.new-tag > li {
		font-size: 16px;
		margin-right: 10px;
	}

	.new-tag > li.selected {
		border: none;
		color: #fd9b09;
	}

</style>