<template>
	<div id="login">
		<div class="header">
			<div class="header_wapper">
				<h1>纳新智能科技有限公司</h1>
			</div>
		</div>
		<div class="main">
			<div class="login_box">
				<h3>用户登录</h3>
				<el-form  :rules="loginRule"  :model="loginInfo" ref="login">
					<el-form-item  prop="phoneOrEmail">
						<el-input placeholder="手机号/邮箱"  prefix-icon="el-icon-user" v-model="loginInfo.phoneOrEmail"></el-input>
					</el-form-item>
					<el-form-item  prop="password">
						<el-input placeholder="请输入密码"  prefix-icon="el-icon-goods"   show-password v-model="loginInfo.password"></el-input>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" @click="login">登录</el-button>
						<span class="line forgetPassword" @click="forgetPassword">忘记密码?</span>
						<span class="line register" @click="goRegister">立即注册</span>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>

</template>

<script>
	// import {
	// 	login
	// } from '@/api/login'
	export default {
		name: 'login',
		data(){
			return{
				loginInfo:{
					phoneOrEmail:"",
					password:""
				},
				loginRule: {
					phoneOrEmail: [
						{ required: true , message: '请输入用户名', trigger: 'blur'},
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				},
				loading: false,
			}
		},
		
		methods: {
			login(){
				// login(this.loginInfo).then(response => {
					this.loading = true
					this.$refs['login'].validate((valid) => {
						if (valid) {
							this.$store.dispatch('user/login', this.loginInfo).then(() => {
								this.$router.push({path:"/home"});
								this.loading = false
							}).catch(() => {
								this.loading = false
						    })
						} else {
							return false;
						}
						});
				// }).catch(err => {
				// 	console.log(err)
				// })
			},
			goRegister() {
				//跳转到注册页
				this.$router.push({ name: 'register'});
			},
			forgetPassword(){
				this.$router.push({ name: 'forgetPassword'});
			}
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 14px;
	}
	body{
		background-color: #f0f2f5;
		background-repeat:no-repeat;
		background-size:100%;
	}
	#login .login_box .el-button{
		width: 100%;
		height: 40px;
	}
	#login .login_box .el-form-item{
		margin-bottom: 40px;
	}
	#login .line{
		cursor: pointer;
	}
	
</style>
<style scoped>
	@import '../../assets/css/login.css';
</style>
