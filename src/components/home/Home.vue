<template>
	<div id="home">
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
				<span class="breadcrumb">首页</span>
			</el-header>
			<div class="main_div">
				<div class="main_background">欢迎光临</div>
			</div>
			
		</el-main>
		</el-container>
	</el-container>
	</div>
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
			this.$store.dispatch('user/logout').then(() => {
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
#home .main_header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 48px;
	height: 48px !important;
	box-shadow: 0 2px 4px 0 rgba(24,24,28,.2);
	z-index: 9
  }
 
#home .popper__arrow{
	  /* left:30px !important; */
  }
#home .el-popper{
	  margin-top: -10px !important;
  }
 #home .sub_header{
	  background-color: #fff;
	  color: #333;
	  text-align: center;
	  line-height: 48px;
	  height: 48px !important;
  }
 #home .user_info{
	width: 50px;
	float: right;
	margin-top: 10px
  }
 #home .el-aside {
    background-color: #f0f2f5;
    color: #333;
    text-align: center;
    line-height: 200px;
	box-shadow: 0 2px 4px 0 rgba(24,24,28,.2);
	height: calc(100vh - 48px);
	
  }
#home  .el-main {
    background-color: #f0f2f5;
	padding: 0 !important;
  }

 #home .el-container:nth-child(5) .el-aside,
 #home .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
 #home .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
#home  .el-menu{
	  text-align: left;
	  height: 100%;
  }
 #home .el-menu-item{
  	min-width: 190px !important;
  	margin-left: 10px;
  }
 #home .el-menu-item-group__title{
	  padding: 0;
  }
  #home .breadcrumb{
	  display: block;
	  width: 50px;
	  font-weight: 999;
  }
  #home .main_div{
	width: 100%;
	height: calc(100vh - 96px);
	position: relative;
  }
  #home .main_div .main_background{
	  width: 100%;
	  text-align: center;
	  position: absolute;
	  top: 40%;
	  font-size: 60px;
	  color: #cccccc;
  }
  
</style>
