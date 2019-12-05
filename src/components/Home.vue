<template>
	<el-container>
		<el-header class="main_header"></el-header>
		<el-container>
        <el-aside width="200px">
			<el-menu :default-openeds="['1', '3']">
				<el-submenu index="1">
					<template slot="title"><i class="el-icon-shopping-cart-full"></i>销售与服务</template>
					<el-menu-item-group>
						<el-menu-item index="1-1" @click="goDesign">方案设计</el-menu-item>
					</el-menu-item-group>
				</el-submenu>     
			</el-menu>
		</el-aside>
		<el-main>
			<el-header class="sub_header">
				
			</el-header>
		</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	name: 'home',
	methods: {
		goDesign(index, row) {
			//跳转到模板选择页
			let routerJump = this.$router.resolve({path:"/design"});
			window.open(routerJump.href,"_blank");
		}
		
	}
}
</script>

<style>

*{
	margin: 0;
	padding: 0;
}
.main_header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 48px;
	height: 48px !important;
	box-shadow: 0 2px 4px 0 rgba(24,24,28,.2);
	z-index: 9
  }
  .sub_header{
	  background-color: #fff;
	  color: #333;
	  text-align: center;
	  line-height: 48px;
	  height: 48px !important;
  }
  .el-aside {
    background-color: #f0f2f5;
    color: #333;
    text-align: center;
    line-height: 200px;
	box-shadow: 0 2px 4px 0 rgba(24,24,28,.2);
	height: calc(100vh - 48px);
	
  }
  .el-main {
    background-color: #f0f2f5;
	padding: 0;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-menu{
	  text-align: left;
	  height: 100%;
  }
  .el-menu-item{
  	min-width: 190px !important;
  	margin-left: 10px;
  }
  .el-menu-item-group__title{
	  padding: 0;
  }
  
</style>
