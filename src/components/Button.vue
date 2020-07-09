<template>
	<button class="createTag">新建收入标签</button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {
    name: 'Button';
  }
</script>

<style scoped lang="scss">

</style>