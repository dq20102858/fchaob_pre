<template>
	<div id="forgetPassword">
		<div id="forget-header"></div>
		<div id="forget-main">
			<div class="step">
				<h3>找回密码</h3>
				<el-steps :active="active" align-center  finish-status="success">
				  <el-step title="手机"></el-step>
				  <el-step title="验证身份"></el-step>
				  <el-step title="设置新密码"></el-step>
				  <el-step title="完成"></el-step>
				</el-steps>
				<el-form ref="sendForm" :rules="rules" :model="sendForm" id="forgetForm">
					<div v-if="step==1">
						<el-form-item label="手机号" prop="phone">
						  <el-input v-model="sendForm.phone"  placeholder="请输入手机号"></el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="checkcode">
							<el-input v-model="sendForm.checkcode"  placeholder="请输入验证码" class="code-left"></el-input>
							<el-image :src="src" class="code-right" @click="getVerify" ref="codeImg"></el-image>
						</el-form-item>
						<el-form-item>
						   <el-button type="primary"  class="next-btn" @click="step1">下一步</el-button>
						 </el-form-item>
					 </div>
					 <div v-else-if="step==2">
						<el-form-item>
						  <el-input v-model="sendForm.checkcode"  placeholder="请输入验证码" class="step2-code"></el-input>
						  <el-button type="primary" class="resend-btn" @click="sendMsg" :disabled="isDisabled" >{{buttonName}}</el-button>
						</el-form-item>
						<el-form-item>
						   <el-button type="primary"  class="next-btn">下一步</el-button>
						 </el-form-item>
					</div>
					<div v-else-if="step==3">
						<el-form-item >
						  <el-input v-model="sendForm.password" placeholder="请输入新密码" show-password></el-input>
						</el-form-item>
						<el-form-item>
						   <el-button type="primary"  class="next-btn">下一步</el-button>
						 </el-form-item>
					</div>
					<div v-else style="text-align: center;font-size: 35px;color: #903030;">
						<span>重置密码成功</span>
					</div>
				</el-form>
			</div>
		</div>

	</div>
</template>

<script>
  import {getVerify ,checkCaptcha} from '@/api/login'
export default {
	name: 'forgetPassword',
	data(){
    var validatePhone = (rule, value, callback) => {
    	var MobileRegex = /^((13)|(14)|(15)|(16)|(17)|(18)|(19))[0-9]{9}$/;
    	if (!MobileRegex.test(value)) {
    		callback(new Error('请输入正确的手机号'))  // 这里错误的信息只要调用callback回调函数，然后在函数里newerror填写错误信息即可
    	} else {
    		callback();  // 一定要有，这是表单校验成功后的回调，会返回一个boolean值，即true
    	}
    }
		return{
			active: 0,
			step:2,
      src:"http://jj-back.com/common/verify",
      isDisabled:false,
      buttonName: "重新发送",
      time: 10,
			sendForm:{},
			rules:{
				phone:[
					{ required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur'}
				],
				checkcode:[
					{ required: true, message: '请输入验证码', trigger: 'blur' }
				]
			}
		}
	},

  methods: {
    getVerify(){
      this.src = this.src+"?time="+new Date().getTime();;
    },
    step1(){
          this.$refs["sendForm"].validate((valid) => {
          	if (valid) {
              checkCaptcha(this.sendForm).then(response => {
                if(response.status==1){
                  this.step = 2;
                  this.active = 1;
                  // this.sendMsg()
                }else{
                  this.getVerify();
                }
              }).catch(err => {
              })
          	} else {
          		return false;
          	}
          });
    },
    sendMsg() {
    					let me = this;
              console.log(me)
    					me.isDisabled = true;
    					let interval = window.setInterval(function() {
    						me.buttonName = '重新发送（' + me.time + '秒）';
    						--me.time;
                console.log(me.time)
    						if(me.time < 0) {
    							me.buttonName = "重新发送";
    							me.time = 10;
    							me.isDisabled = false;
    							window.clearInterval(interval);
    						}
    					}, 1000);

    				}
  },
}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	body{
		background: #f5f6f6;
	}
	#forget-main .step{
		width: 984px;
		background: #ffffff;
		height: 500px;
		margin: 0 auto;
		padding: 50px 90px;
		box-sizing: border-box
	}
	#forget-main .step h3{
		margin: 0 auto 50px;
		font-size: 20px;
		font-weight: 500;
		color: #18181c;
		line-height: 28px;
		text-align: center;
	}
	#forget-main .step .el-steps{
		width: 100%;
	}
	#forgetForm {
		width: 480px;
		margin: 80px auto
	}
	#forgetForm  .el-form-item .el-form-item__content{
		margin-left: 80px !important;
	}
	#forgetForm .next-btn{
		width: 100%;
	}
	#forgetForm .step2-code{
		width: 70%;
		margin-right: 3px;
	}
	#forgetForm .resend-btn{
		width: 28%;
    text-align: center;
    font-size: 12px;
    top: -1px;
    position: relative
	}
  #forgetForm .resend-btn span{
    display: block;
    position: relative;
    left: -5px;
  }
  #forgetForm .code-left{
    width: 70%;
    margin-right: 3px;
  }
  #forgetForm .code-right{
    width: 28%;
    vertical-align: middle;
    height: 40px;
  }
</style>
