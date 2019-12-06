<template>
	<div id="designDetail">
		<div class="fix_btn" @click="openDrawer">
			<i class="el-icon-plus icon"></i>
			<p>新增产品</p>
		</div>
		<div class="switch" @click="changeView">
			<i class="el-icon-refresh icon"></i>
			<p>{{viewName}}</p>
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
								<li class="" v-for="(item, key) in this.productLists" :key="key">
									{{item.name}}
								</li>

							</ul>
						</li>
					</ul>
					<ul class="tab_block" style="">
						<li class="item product" v-for="(item, key) in this.selectedLists" :key="key">
							<img v-bind:src="item.imageUrl">
							<div class="center">
								<p class="name">{{item.name}}</p>
								<p class="spec">{{item.spec}}</p>
								<p class="single">¥{{item.marketPrice}}</p>
							</div>
							<span @click="changeOpen(key)">
								<span class="space_fixed">
									<div class="spaces" v-show="item.isShow">
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
				<h3>方案设计&nbsp;&nbsp;&nbsp;&nbsp;<span>{{nowView}}</span> </h3>
				<div id="des_content">
					<div id="inner_wapper">
						<div v-show="showProduct">
							<ul class="ul_header">
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
							<div class="product_detail" v-for="(item, key) in this.templateLists" :key="key">
								<p>{{item.spaceName}}</p>
								<!-- 循环产品开始-->
								<ul v-for="(one, k) in item.systems" :key="k" class="pro_url">
									<div class="d_type pro_left">
										<span class="pro_left_name">{{one.systemName}}</span>
									</div>
									<div class="pro_right">
										<div v-for="(onePro, o) in one.prods" :key="o">
											<li class="d_p"><img v-bind:src="onePro.productImageUrl"><span>{{onePro.productName}}</span></li>
											<li class="d_n">
												<template>
													<el-input-number v-model="onePro.productNum" @change="handleChange(key,k,o)" :min="1" :max="1000" label="描述文字"
													 size="mini"></el-input-number>
												</template>
											</li>
											<li class="d_ep">¥{{onePro.productPrice}}</li>
											<li class="d_tp">¥{{onePro.totalPrice}} </li>
											<li class="d_o del_icon" @click="delProduct(key,k,o)">删除</li>
										</div>
									</div>
								</ul>
								<!-- 循环产品结束-->
								<div style="clear: both;"></div>
							</div>
							<!-- 循环各种类别产品结束-->
						</div>

						<div v-show="!showProduct">
							<ul class="ul_header">
								<li class="r_p">产品 </li>
								<li class="r_ep">单价 </li>
								<li class="r_n">数量 </li>
								<li class="r_tp">金额 </li>
								<li class="r_r">备注 </li>
								<li class="r_o">操作 </li>
							</ul>
							<div class="product_detail" v-for="(item, key) in this.templateLists" :key="'product-'+key">
								<p>{{item.spaceName}}</p>
								<!-- 循环产品开始-->
								<ul class="room_detail">
									<li class="r_p"><img><span></span></li>
									<li class="r_ep">¥28888</li>
									<li class="r_n"></li>
									<li class="r_tp">¥28888</li>
									<li class="r_r">¥28888</li>
									<li class="r_o del_icon">删除</li>
								</ul>
								<!-- 循环产品结束-->
								<div style="clear: both;"></div>
							</div>
						</div>

						<!-- 价格计算开始-->
						<div class="price_container" style="">
							<div class="product_price">
								<div class="show" v-show="!isEditPrice">
									<div>
										<p>产品总计：<span class="del" style="display: none;">¥{{calculateTPrice}}</span>
											<span>¥{{calculateTPrice}}</span></p>
										<p v-show="discountPriceShow">产品折后价：<span>¥{{discountPrice}}</span></p>
									</div>
									<a href="javascript:void(0)" @click="openEdit">调整价格</a>
								</div>
								<div class="edit" v-show="isEditPrice">
									<div class="left">
										<p>产品总计：<span class="del">¥{{calculateTPrice}}</span></p>
										<div class="edit_block">
											<span>打</span>
											<div class="input" style="width: 32px;">
												<input type="text" v-model="discount" @input="checkValue" @change="getCalculateTPrice" style="line-height: 32px; text-align: center; padding-left: 0px;">
												<p class="error-text" style="display: none;"></p>
											</div>
											<span>折</span>
										</div>
										<p class="total">¥{{discountPrice}}</p>
									</div> <a href="javascript:void(0)" class="right" @click="saveCalculateTPrice">保存</a>
								</div>
								<div style="clear: both;"></div>
							</div>
							<div class="other_price">
								<div class="show" v-show="!isEditOtherPrice">
									<div class="left">
										<p class="price_item">
											服务费：<span>¥{{servicePrice}}</span></p>
									</div> <a href="javascript:void(0)" class="right" @click="openOtherEdit">调整价格</a>
								</div>
								<ul class="edit" style="" v-show="isEditOtherPrice">
									<li v-for="(item,key) in this. servicePriceLists" :key="'other_price_'+key">
										<div class="left">
											<div class="input name" style="width: 120px;">
												<input type="text" placeholder="费用名" v-bind:value="item.name" class="" style="line-height: 32px;">
												<p class="error-text" style="display: none;"></p>
											</div>
											<div class="discount"><span>按产品总计的</span>
												<div class="input" style="width: 40px;">
													<input type="text" v-model="item.percent"  @change="getCalculateTPrice" style="line-height: 32px; text-align: center; padding-left: 0px;">
													<p class="error-text" style="display: none;"></p>
												</div> 
												<span>%收取</span>
											</div>
											<div class="result">
												<div class="input" style="width: 120px;display: inline-block">
													<input type="text" class="" v-bind:value="item.serviceItemPrice"  style="line-height: 32px; text-align: center; padding-left: 0px;">
													<p class="error-text" style="display: none;"></p>
												</div> <a href="javascript:void(0)"><i class="icon el-icon-error"></i></a>
											</div>
											<div style="clear: both;"></div>
										</div> <a href="javascript:void(0)" class="right" @click="openOtherEdit">保存</a>
									</li>
									<li class="last"><i class="icon icon-tianjia1"></i> <span
										>新增附加费用</span></li>
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
					<p class="fixed_price">{{allPrice}}</p>
					<!-- <p class="fixed_space">调整空间</p> -->
					<el-button type="primary" class="fixed_btn_right">生成方案</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getProductCate,
		getTemplateDetail,
		getPageProduct4Select
	} from '@/api/design'
	export default {
		name: 'designDetail',
		data() {
			return {
				num: 1,
				drawer: false, //抽屉是否打开
				isModal: false, //抽屉是否需要遮罩层
				isEditPrice: false, //是否编辑价格
				showProduct: true, //是否显示产品页面
				discountPriceShow: false, //说否展示产品折后价
				isEditOtherPrice: false, //是否编辑其他价格
				input1: "",
				userInfo: {
					name: ""
				},
				productLists: [],
				templateLists: [],
				selectedLists: [],
				showLists: [],
				viewName: "产品视图",
				nowView: "当前为房间视图",
				calculateTPrice: 0, //所有产品计算下来的总价格
				servicePrice: 0, //服务费
				allPrice: 0,
				discount: "", //折扣
				discountPrice: 0,
				servicePriceLists:[
					{
						name:"服务费",
						percent:20,
						serviceItemPrice:0
					}
				]

			}
		},
		created: function() {
			this.getListCompanyTopProductCatalog();
			this.getNxTemplateDetail();
			this.getPageProduct4Select();
		},
		methods: {
			//计算初始服务费
			initServicePriceList(){
				this.servicePrice = 0;
				var calculateTPrice = this.calculateTPrice;	
				for (let i = 0 ; i<this.servicePriceLists.length;i++) {
					this.servicePriceLists[i]['serviceItemPrice'] = parseFloat(this.servicePriceLists[i]['percent'] / 100).toFixed(2) * calculateTPrice;
					let oneServicePrice = this.servicePriceLists[i]['serviceItemPrice'] ;
					this.servicePrice +=oneServicePrice;
				}
			},
			handleChange(key, k, o) {
				//数量改变时的操作
				let obj = this.templateLists[key]['systems'][k]['prods'][o];
				let num = obj['productNum'];
				obj['totalPrice'] = obj['productPrice'] * obj['productNum'];
				this.getCalculateTPrice();
			},
			openDrawer() {
				this.drawer = true;
			},
			openSpace() {

			},
			changeOpen(key) {
				this.selectedLists.forEach(function(item, index) {
					if (index != key) {
						item['isShow'] = false;
					}
				})
				this.selectedLists[key]['isShow'] = !this.selectedLists[key]['isShow'];
			},

			getListCompanyTopProductCatalog() {
				getProductCate().then(response => {
					var data = response.data.data
					if (data) {
						this.productLists = data
					} else {
						alert(response.data.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getNxTemplateDetail() {
				getTemplateDetail().then(response => {
					var data = response.data.data
					if (data) {
						this.templateLists = data.spaces
						this.templateLists.forEach(function(systems, index) {
							systems['systems'].forEach(function(prods, index) {
								prods['prods'].forEach(function(item, index) {
									item['totalPrice'] = item['productNum'] * item['productPrice'];
								})
							})
						});
						this.getCalculateTPrice();
					} else {
						alert(response.data.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getPageProduct4Select() {
				getPageProduct4Select().then(response => {
					var data = response.data.data
					if (data) {
						this.selectedLists = data
					} else {
						alert(response.data.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			changeView() {
				if (this.viewName == "产品视图") {
					this.viewName = "房间视图"
				} else {
					this.viewName = "产品视图"
				}

				if (this.nowView == "当前为房间视图") {
					this.nowView = "当前为产品视图"
				} else {
					this.nowView = "当前为房间视图"
				}
				this.showProduct = !this.showProduct;
			},
			delProduct(key, k, o) {
				var sysems = this.templateLists[key]['systems'];
				var prods = sysems[k]['prods'];
				if (prods.length > 1) {
					prods.splice(o, 1);
				} else {
					if (sysems.length > 1) {
						sysems.splice(k, 1);
					} else {
						this.templateLists.splice(key, 1);
					}
				}
				this.getCalculateTPrice();
			},
			getCalculateTPrice() {
				//计算总价
				let totalPrice = 0;
				this.templateLists.forEach(function(systems, index) {
					systems['systems'].forEach(function(prods, index) {
						prods['prods'].forEach(function(item, index) {
							totalPrice += item['productNum'] * item['productPrice'];
						}, totalPrice)
					}, totalPrice)
				}, totalPrice);

				//计算折扣
				this.calculateTPrice = totalPrice;
				if (typeof(this.discount) == "string" && this.discount == "") {
					this.discountPrice = this.calculateTPrice;
				} else {
					if (parseInt(this.discount) < 0) {
						this.discount = Math.abs(this.discount);
					}
					if (parseInt(this.discount) > 10) {
						this.discount = 10;
					}
					this.discountPrice = this.calculateTPrice * parseFloat(this.discount / 10).toFixed(2);
				}
				
				this.initServicePriceList();//计算服务费
				this.allPrice = this.discountPrice + this.servicePrice;

				this.calculateTPrice = this.calculateTPrice.toFixed(2);
				this.discountPrice = this.discountPrice.toFixed(2);
				this.allPrice = this.allPrice.toFixed(2);
			},
			//打开调价
			openEdit() {
				this.isEditPrice = !this.isEditPrice;
			},
			//打开其他调价
			openOtherEdit() {
				this.isEditOtherPrice = !this.isEditOtherPrice;
				this.initServicePriceList();
			},
			checkValue() {
				//检查输入值
				if (parseInt(this.discount) < 0) {
					this.discount = Math.abs(this.discount);
				}
				if (parseInt(this.discount) > 10) {
					this.discount = 10;
				}
			},
			saveCalculateTPrice() {
				//保存折扣价
				this.openEdit();
				this.discountPriceShow = !this.discountPriceShow;
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
