<template>
	<div class="nav">
		<router-link to="/money">
			<svg>
				<use xlink:href="#label"></use>
			</svg>
			记账
		</router-link>
		<router-link to="/labels">标签</router-link>
		<router-link to="/statistics">统计</router-link>
	</div>
</template>

<script lang="ts">
  const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {
    importAll(require.context('../assets/icons', true, /\.svg$/));
	} catch(error){
    console.log(error)
	}


  import x from '@/assets/icons/label.svg';

  console.log(x);
  export default {
    name: 'Nav'
  };
</script>

<style scoped lang="scss">
	.nav {
		border: 1px solid red;
	}
</style>