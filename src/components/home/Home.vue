<template>
	<el-container>
		<el-header class="main_header">
			<div class="user_info">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
					<el-avatar size="small" :src="circleUrl"></el-avatar>
					</span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
			
		</el-header>
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
	data(){
		return {
			circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",				
		}
	},
	methods: {
		goDesign(index, row) {
			//跳转到模板选择页
			let routerJump = this.$router.resolve({path:"/design"});
			window.open(routerJump.href,"_blank");
		},
		logout(){
			console.log(121)
			this.$store.dispatch('user/logout').then(() => {
				console.log(11)
			  location.reload()// In order to re-instantiate the vue-router object to avoid bugs
			})
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
 
.popper__arrow{
	  /* left:30px !important; */
  }
.el-popper{
	  margin-top: -10px !important;
  }
  .sub_header{
	  background-color: #fff;
	  color: #333;
	  text-align: center;
	  line-height: 48px;
	  height: 48px !important;
  }
  .user_info{
	width: 50px;
	float: right;
	margin-top: 10px
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
