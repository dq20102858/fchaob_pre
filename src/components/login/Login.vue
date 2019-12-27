<template>
	<div id="login">
		<div class="main">
			<div class="login_box">
        <svg class="logo" aria-hidden="true"> <use xlink:href="#iconzu10"></use> </svg>
				<el-form  :rules="loginRule"  :model="loginInfo" ref="login">
          <input type="type"  style="width: 0; height: 0; border: 0;"/>
          <input type="password" style="width: 0; height: 0; border: 0;"/>
          <el-form-item  prop="phoneOrEmail">
            <el-input placeholder="手机号"  prefix-icon="iconfont iconIcon-001" v-model="loginInfo.phoneOrEmail" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item  prop="password">
						<el-input placeholder="请输入密码"  prefix-icon="iconfont iconIcon-1"  :show-password="showPass" v-model="loginInfo.password" autocomplete="off" @input="changeType"></el-input>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;陆</el-button>
						<span class="line forgetPassword" @click="forgetPassword">忘记密码?</span>
						<span class="line register" @click="goRegister">立即注册</span>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>

</template>

<script>
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
        showPass:false
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
			},
      changeType(){
        this.showPass = true;
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
    height: 60px;
    line-height: 60px;
    background: rgba(252,201,140,1);
    outline: none;
    border: none;
    margin-top: 30px;
	}
  #login .login_box .el-button span{
  	font-size: 37px;
    color: #000000;
  }
	#login .login_box .el-form-item{
		margin-bottom: 30px;
	}
	#login .line{
		cursor: pointer;
	}
#login .el-input__inner{
  background-color: #000000;
  border:none;
  border-bottom:3px #a9a490  dotted;
  outline: none;
  height: 60px;
  border-radius:0;
  padding-left: 70px;
  color: #ffffff;
  font-size: 16px;
}
#login .iconfont{
  font-size: 50px;
  color: rgba(252,201,140,1);
}
#login input::-webkit-input-placeholder {
  width:132px;
  height:33px;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:400;
  line-height:33px;
  color:rgba(255,255,255,1);
  opacity:0.5;

}
</style>
<style scoped>
	@import '../../assets/css/login.css';
</style>
