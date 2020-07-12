<template>
	<nav>
		<router-link to="/money" class="item" active-class="selected">
			<Icon name="money"></Icon>
			记账
		</router-link>
		<router-link to="/labels" class="item" active-class="selected">
			<Icon name="label"></Icon>
			标签
		</router-link>
		<router-link to="/statistics" class="item" active-class="selected">
			<Icon name="nav-3"></Icon>
			明细
		</router-link>
	</nav>
</template>

<script lang="ts">
  import Icon from '@/components/Icon.vue';

  export default {
    name: 'Nav',
    components: {Icon}
  };
</script>

<style scoped lang="scss">
	nav {
		display: flex;
		flex-direction: row;
		box-shadow: 0 0 3px rgba(0,0,0,0.5);
		font-size: 12px;
		> .item {
			padding: 2px 0;
			width: 33.333%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			filter: grayscale(100%);
		}

		.icon {
			width: 32px;
			height: 32px;
		}

		.item.selected {
			filter: grayscale(0);
		}
	}

</style>