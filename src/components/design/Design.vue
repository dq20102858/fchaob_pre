<template>
	<div id="design_wapper">
	<el-container>
		<el-header class="main_header">纳新科技</el-header>
		<el-main class="main_contain">
			<el-main id="main_pic">
				<img src="../../assets/imgs/banner.a8036ca.jpg" class="image">
			</el-main>
			<el-main id="sys_pro">
				<h3>系统方案</h3>
				<el-row>
					<el-col v-for="(item, key) in sysLists" :key="key">
						<el-card shadow="hover" @click.native="goDescribe(item.id)">
							<img v-bind:src="item.img" class="image">
							<div class="sys_font">
								<span>{{item.title}}</span>
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
						<img  v-bind:src="item.img" class="image">
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
	import { getTempleteListsApi ,getSysList} from '@/api/design'
	export default {
		name: 'design',
		data() {
			return {
				templates:[],
        sysLists:[]
			}
		},
		created: function(){
				this.getTempleteList()
        this.getSysList()
		},
		methods:{
			goProduct(id){
				 this.$router.push({ name: 'designDetail' ,query:{id:id}});
			},
			goDescribe(id){
				let routerJump = this.$router.resolve({path:"/sysDetail",query:{id:id}});
				window.open(routerJump.href,"_blank");
			},
			getTempleteList(){
				getTempleteListsApi().then(response => {
				    var data = response.data
				    if(data){
				    	this.templates =data
				    }else{
				    	this.$message({
				    	  "type":"error",
				    	  "message":response.msg
				    	})
				    }
				}).catch(err => {
					console.log(err)
				})
			},
      getSysList(){
      		getSysList().then(response => {
      		    var data = response.data
      		    if(data){
      		    	this.sysLists =data
      		    }else{
                this.$message({
                  "type":"error",
                  "message":response.msg
                })
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
	@import '../../assets/css/design.css';
</style>
