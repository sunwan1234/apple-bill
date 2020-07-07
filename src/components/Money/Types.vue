<template>
	<div>
		<ol class="types">
			<li :class=" type === '-' && 'selected' " @click="selectType('-')">
				<span>支出</span>
			</li>
			<li :class=" type === '+' && 'selected' "  @click="selectType('+')">
				<span>收入</span>
			</li>
		</ol>
	</div>
</template>

<script lang="js">
    export default {
        name: 'Types',
				props:['xxx'],
        data() {
            return {
                type: '-' //'-' 表示支出， ‘+’表示收入
            }
        },
				mounted(){
          console.log(this.xxx)
				},
        methods: {
            selectType(type) { // type只能是'-' 或者 '+'
                if (type !== '-' && type !== '+') {
                    throw new Error('type is unknown')
                }
                this.type = type

            }
        }
    };
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