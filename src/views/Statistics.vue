<template>
	<Layout>
		<Types class-prefix="type" :value.sync="type"></Types>
	</Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Types from '@/components/Money/Types.vue';

  @Component({
    components: {Types}
  })
  export default class Statistics extends Vue {
    type = '-';
  }
</script>

<style scoped lang="scss">
	::v-deep .type-item {
		background: white;

		&.selected {
			background: #fed058;
		}
	}
</style>