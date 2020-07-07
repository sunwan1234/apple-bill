<template>
	<Layout>
		<Types xxx="hi"></Types>

		<Tags></Tags>

		<NumberPad></NumberPad>

	</Layout>

</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';

  export default {
    name: 'Money',
    components: {Types, Tags, NumberPad}
  };
</script>

<style scoped lang="scss">

</style>