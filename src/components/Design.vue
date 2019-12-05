<template>
	<div id="design_wapper">
	<el-container>
		<el-header class="main_header">纳新科技</el-header>
		<el-main class="main_contain">
			<el-main id="main_pic">
				<img src="../../static/imgs/banner.a8036ca.jpg" class="image">
			</el-main>
			<el-main id="sys_pro">
				<h3>系统方案</h3>
				<el-row>
					<el-col v-for="(o, index) in 4" :key="o">
						<el-card shadow="hover" @click.native="goDescribe">
							<img src="../../static/imgs/index_home.a5a5a62.jpg" class="image">
							<div class="sys_font">
								<span>好吃的汉堡</span>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</el-main>
			<el-main id="design">
				<h3>设计模板</h3>
				<el-row>
					<el-col v-for="(item, key) in this.templates" class="design_col" :key="key">
						<el-card shadow="hover" @click.native="goProduct(item.id)">
						<img  v-bind:src="item.img"class="image">
						<div class="design_font">
							<span>{{item.title}}</span>
						</div>
						</el-card>
					</el-col>
				</el-row>
			</el-main>

		</el-main>
	</el-container>
	</div>
</template>

<script>
	import { getTempleteListsApi } from '@/api/design'
	export default {
		name: 'design',
		data() {
			return {
				templates:[]
			}		
		},
		created: function(){
				this.getTempleteList()
		},
		methods:{
			goProduct(id){
				 this.$router.push({ name: 'designDetail' ,query:{id:id}});
			},
			goDescribe(){
				
			},
			getTempleteList(){
				getTempleteListsApi().then(response => {
				    var data = response.data.data
				    if(data){		        		        	
				    	this.templates =data
				    }else{
				    	alert(response.data.msg)
				    }
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
	}
</style>
<style scoped>
	@import '../../static/css/design.css';
</style> 
