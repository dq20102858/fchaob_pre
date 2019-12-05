<template>
	<div id="designDetail">
		<div class="fix_btn" @click="openDrawer">
			<i class="el-icon-plus icon"></i>
			<p>新增产品</p>
		</div>
		<div class="switch" @click="">
			<i class="el-icon-refresh icon"></i>
			<p>产品视图</p>
		</div>
		<el-drawer title="新增产品" :visible.sync="drawer" direction="ltr" class="design_drawer" :modal="isModal" size="463px">
			<div class="demo-drawer__content">
				<div class="demo-input-size">
					<el-input placeholder="请输入产品名称/规格/型号/编码" suffix-icon="el-icon-search" v-model="input1"> </el-input>
				</div>
				<div class="tab_container">
					<ul class="switch_block">
						<li class="catalog active">
							<a class="title">
								<div>
									<i class="icon el-icon-s-help"></i>
								</div>
								<p>产品库</p>
							</a>
							<ul>
								<li class="">
									中控网关
								</li>
								<li class="">
									开关面板
								</li>
								<li class="">
									智能照明
								</li>
								<li class="">
									门锁安防
								</li>
								<li class="">
									插座遥控
								</li>
								<li class="">
									遮阳晾晒
								</li>
								<li class="">
									智能暖通
								</li>
								<li class="">
									控制模块
								</li>
								<li class="">
									生活电器
								</li>
								<li class="">
									展示道具
								</li>
								<li class="">
									其他
								</li>
							</ul>
						</li>
					</ul>
					<ul class="tab_block" style="">
						<li class="item product"><img src="//staticprm.orvibo.com/upload/product/20191112/41728830693940762.png">
							<div class="center">
								<p class="name">MixPad S超级智能面板</p>
								<p class="spec">标准版</p>
								<p class="single">¥1,999.00</p>
							</div>
							<span>
								<span class="space_fixed">
									<div class="spaces">
										<div class="spa_content top">
											<p class="tips">请选择要安装该产品的空间</p>
											<ul class="items">
												<li class="item">客厅</li>
												<li class="item">厨房</li>
												<li class="item">阳台</li>
												<li class="item">主卧</li>
												<li class="item">客卫</li>
												<li class="last">
													<div class="show"><i class="icon icon-tianjia1"></i> <span>新增空间</span></div>
												</li>
											</ul>
											<div class="footer">
												<el-button size="mini">取消</el-button>
												<el-button type="primary" size="mini">确定</el-button>
											</div>
										</div>
									</div>
								</span>
								<a href="javascript:void(0)" class="right">
									<i class="icon el-icon-circle-plus"></i>
								</a>
							</span>
						</li>
						<li class="item product"><img src="//staticprm.orvibo.com/upload/product/20191112/41728830693940762.png">
							<div class="center">
								<p class="name">MixPad S超级智能面板</p>
								<p class="spec">标准版</p>
								<p class="single">¥1,999.00</p>
							</div>
							<span>
								<span class="space_fixed">
									<div class="spaces">
										<div class="spa_content top">
											<p class="tips">请选择要安装该产品的空间</p>
											<ul class="items">
												<li class="item">客厅</li>
												<li class="item">厨房</li>
												<li class="item">阳台</li>
												<li class="item">主卧</li>
												<li class="item">客卫</li>
												<li class="last">
													<div class="show"><i class="icon icon-tianjia1"></i> <span>新增空间</span></div>
												</li>
											</ul>
											<div class="footer">
												<el-button size="mini">取消</el-button>
												<el-button type="primary" size="mini">确定</el-button>
											</div>
										</div>
									</div>
								</span>
								<a href="javascript:void(0)" class="right">
									<i class="icon el-icon-circle-plus"></i>
								</a>
							</span>
						</li>
						<li class="last">
							<div class="load" style=""></div> <span>加载中...</span>
						</li>
					</ul>
				</div>
			</div>
		</el-drawer>
		<el-container>
			<el-header class="main_header">纳新科技</el-header>
			<el-main class="main_contain">
				<h3>方案设计&nbsp;&nbsp;&nbsp;&nbsp;<span>当前为房间视图</span> </h3>
				<div id="des_content">
					<div id="inner_wapper">
						<ul id="ul_header">
							<li class="d_type">产品分类 </li>
							<div class="control_width">
								<li class="d_p">产品 </li>
								<li class="d_n">数量 </li>
								<li class="d_ep">单价 </li>
								<li class="d_tp">金额 </li>
								<li class="d_o">操作 </li>
							</div>
						</ul>
						<!-- 循环各种类别产品开始-->
						<div class="product_detail">
							<p>客厅</p>
							<!-- 循环产品开始-->
							<ul>
								<li class="d_type">中控网关</li>
								<div class="control_width">
									<li class="d_p"><img src="../../static/imgs/index_home.a5a5a62.jpg"><span>MixPad</span></li>
									<li class="d_n">
										<template>
											<el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" size="mini"></el-input-number>
										</template>
									</li>
									<li class="d_ep">¥2,499.00</li>
									<li class="d_tp">¥2,499.00</li>
									<li class="d_o">删除</li>
								</div>
							</ul>
							<ul>
								<li class="d_type">中控网关</li>
								<div class="control_width">
									<li class="d_p"><img src="../../static/imgs/index_home.a5a5a62.jpg"><span>MixPad</span></li>
									<li class="d_n">
										<template>
											<el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" size="mini"></el-input-number>
										</template>
									</li>
									<li class="d_ep">¥2,499.00</li>
									<li class="d_tp">¥2,499.00</li>
									<li class="d_o">删除</li>
								</div>
							</ul>
							<ul>
								<li class="d_type">中控网关</li>
								<div class="control_width">
									<li class="d_p"><img src="../../static/imgs/index_home.a5a5a62.jpg"><span>MixPad</span></li>
									<li class="d_n">
										<template>
											<el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" size="mini"></el-input-number>
										</template>
									</li>
									<li class="d_ep">¥2,499.00</li>
									<li class="d_tp">¥2,499.00</li>
									<li class="d_o">删除</li>
								</div>
							</ul>
							<ul>
								<li class="d_type">中控网关</li>
								<div class="control_width">
									<li class="d_p"><img src="../../static/imgs/index_home.a5a5a62.jpg"><span>MixPad</span></li>
									<li class="d_n">
										<template>
											<el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" size="mini"></el-input-number>
										</template>
									</li>
									<li class="d_ep">¥2,499.00</li>
									<li class="d_tp">¥2,499.00</li>
									<li class="d_o">删除</li>
								</div>
							</ul>
							<!-- 循环产品结束-->
							<div style="clear: both;"></div>
						</div>


						<div class="product_detail">
							<p>客厅</p>
							<!-- 循环产品开始-->
							<ul>
								<li class="d_type">中控网关</li>
								<div class="control_width">
									<li class="d_p"><img src="../../static/imgs/index_home.a5a5a62.jpg"><span>MixPad</span></li>
									<li class="d_n">
										<template>
											<el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" size="mini"></el-input-number>
										</template>
									</li>
									<li class="d_ep">¥2,499.00</li>
									<li class="d_tp">¥2,499.00</li>
									<li class="d_o">删除</li>
								</div>
							</ul>
							<ul>
								<li class="d_type">中控网关</li>
								<div class="control_width">
									<li class="d_p"><img src="../../static/imgs/index_home.a5a5a62.jpg"><span>MixPad</span></li>
									<li class="d_n">
										<template>
											<el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" size="mini"></el-input-number>
										</template>
									</li>
									<li class="d_ep">¥2,499.00</li>
									<li class="d_tp">¥2,499.00</li>
									<li class="d_o">删除</li>
								</div>
							</ul>
							<!-- 循环产品结束-->
							<div style="clear: both;"></div>
						</div>
						<!-- 循环各种类别产品结束-->
						<!-- 价格计算开始-->
						<div class="price_container" style="">
							<div class="product_price">
								<div class="show">
									<div>
										<p>产品总计：<span class="del" style="display: none;">¥59,210.00</span><span>¥59,210.00</span></p>
										<p style="display: none;">产品折后价：<span>¥59,210.00</span></p>
									</div>
									<a href="javascript:void(0)">调整价格</a>
								</div>
								<div class="edit" style="display: none;">
									<div class="left">
										<p>产品总计<span class="del">¥59,210.00</span></p>
										<div class="edit_block">
											<span>打</span>
											<div class="input" style="width: 32px;">
												<input type="text" class="" style="line-height: 32px; text-align: center; padding-left: 0px;">
												<p class="error-text" style="display: none;"></p>
											</div>
											<span>折</span>
										</div>
										<p class="total">¥59,210.00</p>
									</div> <a href="javascript:void(0)" class="right">保存</a>
								</div>
							</div>
							<div class="other_price">
								<div class="show">
									<div class="left">
										<p class="price_item">
											服务费：<span>¥11,842.00</span></p>
									</div> <a href="javascript:void(0)" class="right">调整价格</a>
								</div>
								<ul class="edit" style="display: none;">
									<li>
										<div class="left">
											<div class="input name" style="width: 120px;">
												<input type="text" placeholder="费用名" class="" style="line-height: 32px;">
												<p class="error-text" style="display: none;"></p>
											</div>
											<div class="discount"><span>按产品总计的</span>
												<div class="input" style="width: 40px;"><input type="text" class="" style="line-height: 32px; text-align: center; padding-left: 0px;">
													<p class="error-text" style="display: none;"></p>
												</div> <span>%收取</span>
											</div>
											<div class="result">
												<div class="input" style="width: 120px;">
													<input type="text" class="" style="line-height: 32px; text-align: center; padding-left: 0px;">
													<p class="error-text" style="display: none;"></p>
												</div>
												<a href="javascript:void(0)"><i class="icon icon-shanchu"></i></a>
											</div>
										</div> <a href="javascript:void(0)" class="right">保存</a>
									</li>
									<li class="last"><i class="icon icon-tianjia1"></i> <span>新增附加费用</span></li>
								</ul>
							</div>
						</div>
						<!--价格计算结束-->
						<div id="setInfo" class="user_container">
							<div class="form">
								<div class="form-item col-2"><label class="label"><span class="required">*</span>客户名称</label> <input type="text"
									 placeholder="请输入客户名称" maxlength="50" class="">
									<div class="tips" style="display: none;">请输入用户名</div>
								</div>
								<div class="form-item col-2"><label class="label"><span class="required">*</span>联系电话 </label> <input type="text"
									 placeholder="请输入手机号码" class="">
									<div class="tips" style="display: none;">请输入正确的手机号</div>
								</div>
								<div class="form-item act">
									<a href="javascript:void(0)" class="btn">
										选择已有客户
									</a></div>
								<div class="form-item col-2"><label class="label">户型</label><input maxlength="10" type="text" placeholder="请输入户型"></div>
								<div class="form-item col-2"><label class="label">地址</label><input type="text" placeholder="请输入地址" maxlength="60"></div>
								<div class="form-item col-1"><label class="label">方案设计</label><input type="text" placeholder=""></div>
								<div class="form-item col-1"><label class="label">方案说明</label><textarea type="text" placeholder="方案说明"></textarea></div>
							</div>
						</div>
						<div style="clear: both;"></div>
					</div>
				</div>
			</el-main>
		</el-container>
		<div class="block">
			<div class="content">
				<div class="fixed_btn">
					<el-button class="fixed_btn_left">返回首页</el-button>
					<p class="fixed_total">总计</p>
					<p class="fixed_price">10.11</p>
					<!-- <p class="fixed_space">调整空间</p> -->
					<el-button type="primary" class="fixed_btn_right">生成方案</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'designDetail',
		data() {
			return {
				num: 1,
				drawer: false,
				input1: "",
				isModal: false,
				userInfo: {
					name: ""
				}

			}
		},
		methods: {
			handleDelete(index, row) {

			},
			handleChange() {

			},
			openDrawer() {
				this.drawer = true;
			}
		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
		outline: 0;
		list-style: none;
		text-decoration: none;
	}

	#designDetail .el-drawer {
		position: static !important;
	}
</style>
<style scoped>
	@import '../../static/css/design_detail.css';
</style>
