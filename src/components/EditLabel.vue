<template>
	<layout>
		{{this.tag}}
		<div class="edit-label-wrapper">
			<header>
				<span>设定自定义标签</span>
				<Types :value.sync="record.type" :is-new-tag="'1'"></Types>
			</header>
			<div class="input-new-label">
				<div class="title">新建标签名称</div>
				<FormItem isNewTag="+"
									placeholder="限3个汉字..."
									:value="tag.name"
									@update:tagName="onTagNameChange"
				></FormItem>
			</div>
			<div class="svgs">
				<div class="svg-title">选择图标</div>
				<Tags is-new-tag="+"
							@update:new:tag="onSelectedTagChange"
							:fuck-tags="selectedTags"
				></Tags>
			</div>
			<div class="button-wrapper">
				<Button @click="saveTag">保存新标签</Button>
			</div>

		</div>
	</layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';
  import initialRecord from '@/constants/initialRecord';
  import initialTag from '@/constants/initialTag';


  @Component({
    components: {Button, FormItem, Tags, Types},
  })
  export default class EditLabel extends Vue {
    record: RecordItem = initialRecord;
    tag: Tag = initialTag;
    selectedTags: string[] = [];


    @Watch('record.type', {immediate: true})
    onRecordTypeChange(value) {
      this.tag.type = value;
    }

    onTagNameChange(value: string) {
      this.tag.name = value;
    }

    onSelectedTagChange(value: string[]) {
      this.tag.svg = value[0];
    }

    saveTag() {
      this.$store.commit('createTag', this.tag);
      if (this.$store.state.createTagResult === 'success') {
        this.$router.replace('/labels');
      }
    }
  }
</script>

<style scoped lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 10px;

		> span {
			font-size: 21px;
			font-weight: 700;
		}


	}

	.types {
		background: white;
		font-size: 16px;
		align-items: center;
	}

	.types > li {
		font-size: 14px;
	}

	.input-new-label {
		border: 1px solid #333;
		margin: 20px;
		padding: 8px 10px;
		border-radius: 10px;

		> .title {
			font-weight: bold;
		}

		label {
			display: flex;
			justify-content: space-between;
			align-items: center;

			> input {
				height: 56px;
				flex-grow: 1;
				background: transparent;
				border: none;
				padding-right: 12px;
			}

			> svg {
				width: 30px;
				height: 30px;
			}
		}

	}

	.svgs {
		padding: 10px;

		.svg-title {
			font-weight: bold;
		}

	}

	.button-wrapper {
		text-align: center;
		margin-top: 10px;
	}

</style>