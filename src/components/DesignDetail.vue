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
					<el-input placeholder="请输入产品名称/规格/型号/编码" suffix-icon="el-icon-search" v-model="selectKeywords" @input="chageProductInput">
					</el-input>

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
								<li :class="key==index?'active':''" v-for="(item, key) in this.productLists" :key="key" @click="selecCate(item,key)">
									{{item.name}}
								</li>
							</ul>
						</li>
					</ul>
					<ul  class="tab_block" ref="scroll">
						<li class="item product" v-for="(item, key) in this.selectedLists" :key="key">
							<img v-bind:src="item.imageUrl">
							<div class="center">
								<p class="name">{{item.name}}</p>
								<p class="spec">{{item.spec}}</p>
								<p class="single">¥{{item.marketPrice}}</p>
							</div>
							<span>
								<span class="space_fixed">
									<div class="spaces" v-show="item.isShow">
										<div class="spa_content top">
											<p class="tips">请选择要安装该产品的空间</p>
											<ul class="items">
												<li class="item" v-for="(item, spacekey) in spaces" :key="spacekey" :class="item.class" @click="selectSpace(spacekey)">{{item.name}}</li>
												<!-- <li class="last">
													<div class="show"><i class="icon icon-tianjia1"></i> <span>新增空间</span></div>
												</li> -->
											</ul>
											<div class="footer">
												<el-button size="mini" @click="closeSpace(key)">取消</el-button>
												<el-button type="primary" size="mini" @click="addSpace(item,key)">确定</el-button>
											</div>
										</div>
									</div>
								</span>
								<a href="javascript:void(0)" class="right" @click="changeOpen(key)">
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
											<li class="d_p">
												<img v-bind:src="onePro.productImageUrl">
												<span class="product_name">{{onePro.productName}}</span>
												<span class="specs">{{onePro.productSpecs}}</span>
											</li>
											<li class="d_n">
												<template>
													<el-input-number v-model="onePro.productNum" @change="handleChange(key,k,o)" :min="1" :max="1000" label="描述文字"
													 size="mini"></el-input-number>
												</template>
											</li>
											<li class="d_ep"><span class="productPrice">¥{{onePro.productPrice}}</span></li>
											<li class="d_tp"><span class="totalPrice">¥{{onePro.totalPrice}}</span> </li>
											<li class="d_o del_icon" @click="delProduct(key,k,o)"><span class="del">删除</span></li>
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
							<div class="product_detail" v-for="(item, key) in this.productView" :key="'product-'+key">
								<p>{{item.systemName}}</p>
								<!-- 循环产品开始-->
								<ul class="room_detail" v-for="(one, k) in item.prods" :key="k">
									<li class="r_p">
										<img v-bind:src="one.productImageUrl">
										<span class="product_name">{{one.productName}}</span>
										<span class="specs">{{one.productSpecs}}</span>
										<div class="spaceNums">
											<span v-for="(o, kk) in one.spaceNums" :key="kk" >{{o.spaceName}} * {{o.num}}</span> 
										</div>
										
									</li>
									<li class="r_ep">
										<!-- <span class="line1"> ¥{{one.productPrice}} </span> -->
										<span class="line2"> ¥{{one.productPrice}} <!-- <i class="el-icon-edit"></i> --></span>
										
									</li>
									<li class="r_n"><span class="productPrice">{{one.productTotalNum}}</span></li>
									<li class="r_tp"><span class="totalPrice">¥{{one.totalPrice}}</span></li>
									<li class="r_r"></li>
									<li class="r_o del_icon">
										<span class="del" @click="delProductView(one.productId)">删除</span>
										<span class="del" @click="exchageProductView(one.productId)">替换</span>
									</li>
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
										<p class="price_item" v-for="(item,key) in this. servicePriceLists" :key="'other_price_show_'+key" v-if="item.serviceItemPrice != 0">{{item.name}}：<span>¥{{item.serviceItemPrice}}</span></p>
									</div>
									<a href="javascript:void(0)" class="right" @click="openOtherEdit">调整价格</a>
								</div>
								<ul class="edit" style="" v-show="isEditOtherPrice">
									<li v-for="(item,key) in this. servicePriceLists" :key="'other_price_'+key">
										<div class="left">
											<div class="input name" style="width: 120px;">
												<input type="text" placeholder="费用名" v-model="item.name" class="" style="line-height: 32px;">
												<p class="error-text" style="display: none;"></p>
											</div>
											<div class="discount"><span>按产品总计的</span>
												<div class="input" style="width: 40px;">
													<input type="text" v-model="item.percent" @change="getCalculateTPrice" style="line-height: 32px; text-align: center; padding-left: 0px;">
													<p class="error-text" style="display: none;"></p>
												</div>
												<span>%收取</span>
											</div>
											<div class="result">
												<div class="input" style="width: 120px;display: inline-block">
													<input type="text" class="" v-model="item.serviceItemPrice" style="line-height: 32px; text-align: center; padding-left: 0px;">
													<p class="error-text" style="display: none;"></p>
												</div> <a href="javascript:void(0)" @click="deleteOtherPrice(key)"><i class="icon el-icon-error"></i></a>
											</div>
											<div style="clear: both;"></div>
										</div>

										<a href="javascript:void(0)" class="right" @click="openOtherEdit" v-if="key==0">保存</a>

									</li>
									<li class="last" @click="addOtherPrice"><i class="icon el-icon-plus"></i> <span>新增附加费用</span></li>
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
									<a href="javascript:void(0)" class="btn" @click="openCustomers">
										选择已有客户
									</a>
								</div>
								<div class="form-item col-2"><label class="label">户型</label><input maxlength="10" type="text" placeholder="请输入户型"></div>
								<div class="form-item col-2"><label class="label">地址</label><input type="text" placeholder="请输入地址" maxlength="60"></div>
								<div class="form-item col-1"><label class="label">方案设计</label><input type="text" placeholder=""></div>
								<div class="form-item col-1"><label class="label">方案说明</label><textarea type="text" placeholder="方案说明"></textarea></div>
							</div>
						</div>
						<div style="clear: both;"></div>
					</div>
				</div>
				<el-dialog title="选择客户" :visible.sync="isShowCustomers">
					<div class="customer_search">
						<el-input placeholder="请输入客户名称/手机号" suffix-icon="el-icon-search" v-model="customerKeywords" @input="getCustomersPages4User">
						</el-input>
					</div>
					<el-table :data="customersPages.data" header-align="center" highlight-current-row>
						<el-table-column label="" min-width="10%" align="center">
							<template scope="scope">
								<el-radio :label="scope.row.id" v-model="postCustomer.id" @change="selectionCustomer(scope.$index,scope.row)">&nbsp</el-radio>
							</template>
						</el-table-column>
						<el-table-column type="index" label="序号" min-width="10%" align="center"></el-table-column>
						<el-table-column property="name" label="客户名称" min-width="40%" align="center"></el-table-column>
						<el-table-column property="phone" label="联系电话" min-width="40%" align="center"></el-table-column>
					</el-table>
					<template>
						<el-pagination @current-change="handleCurrentChange" :current-page="customersPages.current_page" :page-size="5"
						 layout="total, prev, pager, next, jumper" :total="customersPages.total" small class="customer_page"></el-pagination>
					</template>
					<div class="customer_btn">
						<el-button size="small">取消</el-button>
						<el-button type="primary" size="small">确定</el-button>
					</div>
				</el-dialog>
				
				<el-dialog title="替换" :visible.sync="isExchage">
					<div class="exchange_search">
						<el-select v-model="cateId" placeholder="请选择" @change="chageProductInput">
							<el-option v-for="(item, key) in this.productLists" :key="'productLists'+key" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</div>
					<div class="exchange_search exchage_input">
						<el-input v-model="selectKeywords" suffix-icon="el-icon-search"  @input="chageProductInput"></el-input>
					</div>
					<el-table :data="this.selectedLists" header-align="center" highlight-current-row>
						<el-table-column label="" min-width="10%" align="center">
							<template scope="scope">
								<el-radio :label="scope.row.id" v-model="postCustomer.id" @change="selectionCustomer(scope.$index,scope.row)">&nbsp</el-radio>
							</template>
						</el-table-column>
						<el-table-column label="产品" min-width="40%" align="left">
							<template scope="scope">
								<img v-bind:src="scope.row.imageUrl" style="width: 80px; height: 80px;"/>
								<span style="position: relative;left: 20px;display: inline-block;top: -35px;">{{scope.row.name}}</span>
							</template>
						</el-table-column>
						<el-table-column property="spec" label="规格" min-width="20%" align="center"></el-table-column>
						<el-table-column property="catalogName" label="分类" min-width="10%" align="center"></el-table-column>
						<el-table-column property="marketPrice" label="单价" min-width="10%" align="center"></el-table-column>
					</el-table>
					<template>
						<el-pagination @current-change="handleCurrentChange" :current-page="selectPage" :page-size="5"
						 layout="total, prev, pager, next, jumper" :total="selectTotalPage" small class="customer_page"></el-pagination>
					</template>
					<div class="customer_btn">
						<el-button size="small">取消</el-button>
						<el-button type="primary" size="small">确定</el-button>
					</div>
				</el-dialog>
				
			</el-main>
			
		</el-container>
		<div class="block">
			<div class="content">
				<div class="fixed_btn">
					<el-button class="fixed_btn_left" @click="goBack">返回首页</el-button>
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
		getPageProduct4Select,
		getCustomersPages
	} from '@/api/design'
	export default {
		name: 'designDetail',
		data() {
			return {
				id: this.$route.query.id,
				drawer: false, //抽屉是否打开
				isModal: false, //抽屉是否需要遮罩层
				isEditPrice: false, //是否编辑价格
				showProduct: true, //是否显示产品页面
				discountPriceShow: false, //说否展示产品折后价
				isEditOtherPrice: false, //是否编辑其他价格
				isShowCustomers: false, //是否展示已有客户
				isExchage: false,//是否替换已有产品
				customerPage: 1, //客户列表当前的分页
				selectPage: 1, //产品当前分页
				selectTotalPage:1,
				cateId: "",
				index: -1,//系统当前鼠标点击的序号
				spaceIndex:0,
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
				servicePriceLists: [{
					name: "服务费",
					percent: 20,
					serviceItemPrice: 0
				}],
				customersPages: [], //已有的客户
				postCustomer: {
					id: 0
				}, //提交的客户数据
				customerKeywords: "",
				selectKeywords: "",
				spaces: [], //产品空间
				selectedAddSpace:[],//选择的产品空间
				curSysName:"",//当前选择的系统名称
				i : 0,
				canLoad:true,//分页是否可以继续请求加载
				productView:[],//产品视图
				

			}
		},
		created: function() {
			this.getListCompanyTopProductCatalog();
			this.getNxTemplateDetail();
			this.getPageProduct4Select();
			this.initServicePriceList();
		},
		// watch: {
		//     templateLists : 'handelProductView' // 值可以为methods的方法名
		// },
		methods: {
			//计算初始服务费
			initServicePriceList() {
				this.servicePrice = 0;
				let calculateTPrice = this.calculateTPrice;
				for (let i = 0; i < this.servicePriceLists.length; i++) {
					let price = parseFloat(this.servicePriceLists[i]['percent'] / 100);
					this.servicePriceLists[i]['serviceItemPrice'] = price * calculateTPrice;
					let oneServicePrice = this.servicePriceLists[i]['serviceItemPrice'];
					this.servicePrice += oneServicePrice;
				}
			},
			handleChange(key, k, o) {
				//数量改变时的操作
				let obj = this.templateLists[key]['systems'][k]['prods'][o];
				let num = obj['productNum'];
				obj['totalPrice'] = obj['productPrice'] * obj['productNum'];
				this.getCalculateTPrice();
				this.handelProductView();
			},
			openDrawer() {
				this.drawer = true;
				this.$nextTick(function(){
					this.$refs.scroll.addEventListener("scroll",this.handleScroll,true)
				});
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
						this.productLists = data;
						this.curSysName = this.productLists[0]['name'];
					} else {

					}
				}).catch(err => {
					console.log(err)
				})
			},
			//获取模板房间视图的数据
			getNxTemplateDetail() {
				getTemplateDetail(this.id).then(response => {
					var data = response.data.data
					let spaces = [];
					if (data) {
						this.templateLists = data.spaces
						this.templateLists.forEach(function(systems, index) {
							systems['systems'].forEach(function(prods, index) {
								prods['prods'].forEach(function(item, index) {
									item['totalPrice'] = item['productNum'] * item['productPrice'];
								})
							})
							let one = {
								class:"",//控制选中样式
								name : systems['spaceName']
							}
							spaces.push(one);
						});
						this.spaces = spaces;
						this.getCalculateTPrice();
						this.handelProductView();
					} else {

					}
				}).catch(err => {
					console.log(err)
				})
			},

			getPageProduct4Select() {
				getPageProduct4Select(this.selectPage, this.cateId, this.selectKeywords).then(response => {
					var data = response.data.data
					if (data.data.length>0) {
						// this.selectedLists = data.data;
						this.selectedLists.push.apply(this.selectedLists,data.data);
						this.selectPage = parseInt(data['current_page']);
						this.selectTotalPage = parseInt(data['total']);
					} else {
						this.canLoad = false;
					}
				}).catch(err => {
					console.log(err)
				})
			},
			chageProductInput(){
				this.selectPage = 1;
				this.selectedLists = [];
				this.getPageProduct4Select();
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
			//处理产品视图数据
			handelProductView(){
				let productLists = [];
				let list = [];
				let templateLists = this.templateLists
				templateLists.forEach(function(systems, index) {
					systems['systems'].forEach(function(prods, index) {
						prods['prods'].forEach(function(item, index) {
							item['systemId'] = prods['systemId'];
							let productId = item["productId"];
							if(productLists.hasOwnProperty(productId)){
								productLists[productId]["productTotalNum"]+=item['productNum'];
								productLists[productId]["spaceNums"].push({spaceName:systems['spaceName'],num:item['productNum']});
							}else{
								productLists[productId] = item;
								productLists[productId]["productTotalNum"] = item['productNum'];
								productLists[productId]["spaceNums"]=[{spaceName:systems['spaceName'],num:item['productNum']}];
							}
							productLists[productId]["totalPrice"] = productLists[productId]["productNum"] * item['productPrice'];
						});
						
						let systemId = prods['systemId'];
						list[systemId] = {
							systemName : prods['systemName'],
							systemId : systemId,
							prods:[]
						};
					})
				});
				productLists.forEach(function(prod,index){
					let systemId = prod['systemId'];
					list[systemId]['prods'].push(prod);
				});
				list = list.filter(function(e){return e});
				this.productView = list;
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
				this.handelProductView();
			},
			getCalculateTPrice() {
				//计算总价
				let totalPrice = 0;
				this.templateLists.forEach(function(systems, index) {
					systems['systems'].forEach(function(prods, index) {
						prods['prods'].forEach(function(item, index) {
							totalPrice += item['productNum'] * item['productPrice'];
						})
					})
				});

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

				this.initServicePriceList(); //计算服务费
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
			},
			addOtherPrice() {
				//新增其他费用
				var oneItem = {
					name: "",
					percent: 0,
					serviceItemPrice: 0
				}
				this.servicePriceLists.push(oneItem);
			},
			deleteOtherPrice(key) {
				//删除一个其他项价格
				this.servicePriceLists.splice(key, 1);
				this.getCalculateTPrice();
			},
			openCustomers() {
				//打开客人已有客户
				this.isShowCustomers = true;
				this.getCustomersPages4User();
			},
			getCustomersPages4User() {
				getCustomersPages(this.customerPage, this.customerKeywords).then(response => {
					var data = response.data.data
					if (data) {
						this.customersPages = data;
						this.customersPages['current_page'] = parseInt(data.current_page);
					} else {

					}
				}).catch(err => {
					console.log(err)
				})
			},
			handleCurrentChange(val) {
				//翻页
				this.customerPage = val;
				this.getCustomersPages4User();
			},
			selectionCustomer(index, row) {
				//选中的已有客户
				this.postCustomer = row;

			},
			selecCate(item, key) {
				this.cateId = item['id'];
				this.index = key;
				this.curSysName = item['name']
				this.selectPage = 1;
				this.selectedLists = [];
				this.getPageProduct4Select();
			},
			selectSpace(key){
				this.spaces.forEach(function(item, index) {
					if(index == key){
						if(item['class'] == ""){
							item['class'] = "active";
						}else{
							item['class'] = "";
						}
					}	
				});
			},
			addSpace(prod,key){
				let selectedAdd = [];
				this.spaces.forEach(function(item, index) {
					if(item['class'] == "active"){
						selectedAdd.push(item['name']);
					}
				});
				this.selectedAddSpace = selectedAdd;//在所选空间里面新增产品
				this.addProd2Template(prod);
				this.closeSpace(key);
			},
			
			closeSpace(key){
				//关闭产品空间面板
				this.spaces.forEach(function(space, index) {
					space['class'] = "";
				});
				this.selectedAddSpace = [];
				this.selectedLists[key]['isShow'] = false;
			},
			
			addProd2Template(prod){
			//往所选空间里面新增产品
				let systemId = prod['topCatalogId'];
				let proId = prod['id'];
				let selectSpace = this.selectedAddSpace;
				let curSysName = this.curSysName;
				
				this.templateLists.forEach(function(systems, index) {
					var indexof = selectSpace.indexOf(systems['spaceName']);
					if(indexof != '-1'){
						let hasSys = false;//是否已经有此系统
						let hasProd = false;//是否已经有此产品
						systems['systems'].forEach(function(prods, index) {
							if(prods['systemId'] == systemId){
								prods['prods'].forEach(function(item, index) {
									if(item['productId'] == proId){
										hasProd = true;
										item['productNum'] += 1;
										item['totalPrice'] = item['productNum'] * item['productPrice'];
									}
								});
								hasSys = true;
								if(!hasProd){
									let addProItem = {
										productId:prod['id'],
										productCode :prod['code'],
										productImageUrl:prod['imageUrl'],
										productName:prod['name'],
										productNum:1,
										productPrice:prod['marketPrice'],
										productSn:"",
										totalPrice:prod['marketPrice'],
									}
									prods['prods'].push(addProItem);
								}
							}		
						});
						if(!hasSys){
							let addSysItem = {
								systemId:systemId,
								systemName:curSysName,
								prods:[{
									productId:prod['id'],
									productCode :prod['code'],
									productImageUrl:prod['imageUrl'],
									productName:prod['name'],
									productNum:1,
									productPrice:prod['marketPrice'],
									productSn:"",
									totalPrice:prod['marketPrice'],
								}]
							};
							systems['systems'].push(addSysItem);
						}
					}
				});
				this.getCalculateTPrice();
				this.handelProductView();
			},
		
			handleScroll(){
				// 页面滚动距顶部距离
				let scrollTop = this.$refs.scroll.scrollTop;
				let clientHeight = this.$refs.scroll.clientHeight;// 获取可视区的高度
				let scrollHeight = this.$refs.scroll.scrollHeight;// 获取滚动条的总高
				var scroll = scrollTop - this.i;
				this.i = scrollTop;
				let reduce = scrollHeight-clientHeight;
				let gap = parseFloat(scrollTop/reduce).toFixed(2);
				if(scroll>=0 && this.canLoad){
					if( scrollTop + clientHeight >= scrollHeight){
						this.selectPage++;
						this.getPageProduct4Select();
					}
				}

				
			},
			goBack(){
				//返回首页
				this.$confirm('返回无法保存已编辑的信息。确定返回？', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          this.$router.push({ name: 'design'});
				        }).catch(() => {
				                   
				        });
				      
			},
			delProductView(productId){
				let templateLists = this.templateLists;
				templateLists.forEach(function(systems, index1) {
					systems['systems'].forEach(function(prods, index2) {
						prods['prods'].forEach(function(item, index3) {
							if(item['productId'] == productId){
								if (prods['prods'].length > 1) {
									prods['prods'].splice(index3, 1);
								} else {
									if (systems['systems'].length > 1) {
										systems['systems'].splice(index2, 1);
									} else {
										templateLists.splice(index1, 1);
									}
								}
							}
						})
					})
				});
				this.handelProductView();
				this.getCalculateTPrice();
			},
			exchageProductView(productId){
				this.isExchage = true;
				
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

	#designDetail .has-gutter .el-table-column--selection .cell {
		display: none;
	}
</style>
<style scoped>
	@import '../../static/css/design_detail.css';
</style>
