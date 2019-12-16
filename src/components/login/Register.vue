<template>
	<div id="register">
		<div id="register-header"></div>
		<div id="register-main">
			<div id="register-form">
				<h3 class="form-label">用户注册</h3>
				<el-form ref="register" :rules="rules" :model="register" label-width="80px" class="register-form" >
				  <el-form-item label="姓名" prop="name">
				    <el-input v-model="register.name"  placeholder="请输入姓名" @blur="checkForm"></el-input>
				  </el-form-item>
				  <el-form-item label="手机号" prop="phone">
				    <el-input v-model="register.phone" placeholder="请输入手机号" @blur="checkForm"></el-input>
				  </el-form-item>
				  <el-form-item label="验证码" prop="sms">
				    <el-input v-model="register.sms" class="sms sms-left" placeholder="请输入验证码" @blur="checkForm"></el-input>
					<el-button type="info" plain  :disabled="isSmsDisabled"  @click="getSms" class="sms sms-right">获取验证码</el-button>
				  </el-form-item>
				  <el-form-item label="密码" prop="password">
				    <el-input v-model="register.password" placeholder="请输入密码" show-password @blur="checkForm"></el-input>
				  </el-form-item>
				  <el-form-item label="城市" prop="areaCode" ref="distpicker">
					<v-distpicker v-model="register.areaCode" @province="setProvince" @city="setCity" @area="setArea"  @selected="checkForm"></v-distpicker>
				  </el-form-item>
				  <el-form-item label="公司名称" prop="company_name">
				    <el-input v-model="register.company_name" placeholder="请输入公司名称" @blur="checkForm"></el-input>
				  </el-form-item>
				  <el-form-item label="公司类型" prop="company_type">
					   <el-select v-model="register.company_type" placeholder="请选择公司类型"  @change="checkForm">
					      <el-option  key="1" label="意向伙伴" value="1"></el-option>
					      <el-option  key="2" label="家装公司" value="2"></el-option>
					      <el-option  key="3" label="设计师" value="3"></el-option>
					    </el-select>
				  </el-form-item>
				   <el-form-item>
				      <el-button type="info" plain  :disabled="isDisabled"  @click="submitForm" class="register-btn">注册</el-button>
				    </el-form-item>
					<div class="finished">
						<span class="left">已有账号?</span>
						<span class="right" @click="goLogin">请登录</span>
					</div>
				</el-form>
			</div>
			
		</div>
		
	</div>
</template>

<script>
import {register} from '@/api/login'
export default {
	name: 'register',
	data(){
		var validatePhone = (rule, value, callback) => {
			var MobileRegex = /^((13)|(14)|(15)|(16)|(17)|(18)|(19))[0-9]{9}$/;
			if (!MobileRegex.test(value)) {
				callback(new Error('请输入正确的手机号'))  // 这里错误的信息只要调用callback回调函数，然后在函数里newerror填写错误信息即可
			} else {
				this.isSmsDisabled = false;
				callback();  // 一定要有，这是表单校验成功后的回调，会返回一个boolean值，即true
			}
		}
		return{
			register:{
				provinceCode:"",
				cityCode:"",
				areaCode:"",
				provinceName:"",
				cityName:"",
				areaName:"",
				name:"",
				phone:"",
				sms:"",
				password:"",
				company_type:"",
				company_name:""
			},
			rules:{
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				],
				phone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
					{ validator: validatePhone, trigger: 'blur'}
				],
				sms: [
					{ required: true, message: '请输入验证码', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ pattern: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/, message: '密码必须包含大写字母、小写字母和数字，长度在6-16位之间', trigger: 'blur'  } 
				],
				areaCode: [
					{ required: true, message: '请选择地区', trigger: 'blur' },
				],
				company_name: [
					{ required: true, message: '请输入公司名称', trigger: 'blur' },
				],
				company_type: [
					{ required: true, message: '请选择公司类型', trigger: 'change' },
				],
			},
			isDisabled :true,
			isSmsDisabled:true,
			noShow:false
		}
	},
	
	methods: {
		getSms(){
			
		},
		submitForm(){
			register(this.register).then(response => {
				if(response.status){
					this.$router.push({path:"/login"});
				}else{
					this.$message.error('注册失败，请稍后再试');
				}
			}).catch(err => {
				console.log(err)
			})
		},
		setProvince(data){
			if(typeof(data.code) == "undefined"){
				this.register.province = 0
				this.register.provinceName = ""
			}else{
				this.register.province = data.code
				this.register.provinceName = data.value
			}
		},
		setCity(data){
			if(typeof(data.code) == "undefined"){
				this.register.cityCode = 0
				this.register.cityName = ''
			}else{
				this.register.cityCode = data.code
				this.register.cityName = data.value
			}
		},
		setArea(data){
			if(typeof(data.code) == "undefined"){
				this.register.areaCode = 0
				this.register.areaName = ""
			}else{
				this.register.areaCode = data.code
				this.register.areaName = data.value
			}
			
		},
		goLogin(){
			this.$router.push({ name: 'login'});
		},
		checkForm(){
			this.$refs["register"].validate((valid) => {
				if (valid) {
					this.isDisabled = false;
				} else {
					return false;
				}
			});
		}
	},
}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
		font-size: 14px;
		list-style: none;
	}
	body{
		background-color: #f5f6f6;
	}
	#register-header{
		width: 100%;
		height: 200px;
	}
	#register-form{
		width: 500px;
		margin: 0 auto;
		background: #ffffff;
		position: relative;
	}
	#register-form .form-label{
		padding: 30px 0;
		margin: 0 30px;
		font-size: 16px;
		color: #18181c;
		line-height: 22px;
		font-weight: 500
	}
	#register-form .register-form{
		width: 90%;
	}
	#register-form .city{
		float: left;
		width: 32%;
	}
	#register-form .city1{
		margin-right: 7px;
	}
	#register-form .el-form-item{
		margin-bottom: 24px !important;
		margin-left: 20px;	
	}
	#register-form .sms{
		float: left;
	}
	#register-form  .sms-left{
		width: 65%;
		margin-right: 17px;
	}
	#register-form  .sms-right{
		width: 30% !important;
	}
	#register-form .el-form-item__label{
		color: rgba(24,24,28,.75)!important
	}
	#register-form .register-btn{
		width: 100% !important;
		margin-bottom: 50px;
	}
	#register-form .finished{
		position: absolute;
		left: 68%;
		top: 585px;
	}
	#register-form .finished span{
		font-size: 12px;
		line-height: 24px;
		vertical-align: middle;
	}
	#register-form .finished .left{
		color: rgba(24,24,28,.75);
	}

	#register-form .finished .right{
		color: #4c89fb;
		cursor: pointer;
	}
	#register-form .distpicker-address-wrapper select{
		width: 32%;
	}
	#register-form .distpicker-address-wrapper select:nth-child(1),
	#register-form .distpicker-address-wrapper select:nth-child(2){
		margin-right: 2px;
	}
	#register-form .el-select{
		width: 100%;
	}
</style>
