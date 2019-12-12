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
						<!-- <li class="last">
							<div class="load" style=""></div> <span>加载中...</span>
						</li> -->
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
										<span class="line1" v-show="openSwitch[one['productId']]['isShowOriginPrice']"> ¥{{one.orginPrice}} </span>
										<span class="line2" v-show="openSwitch[one['productId']]['isOpenEdit']"> ¥{{one.orginPrice}} <i class="el-icon-edit" @click="editShowPrice(one.productId)"></i></span>
										<span class="line3" v-show="openSwitch[one['productId']]['isOpenEditV2']"> ¥{{one.productPrice}} <i class="el-icon-edit" @click="editShowPriceV2(one.productId)"></i></span>
										<div class="edit_input" v-show="openSwitch[one['productId']]['changePrice']">
											<el-input v-model="one.productPrice" placeholder="请输入内容" @blur="confirmChangePrice(key,k,one.productId)" :ref="'changePrice'+one.productId" autofocus></el-input>
										</div>
									</li>
									<li class="r_n"><span class="productPrice">{{one.productTotalNum}}</span></li>
									<li class="r_tp"><span class="totalPrice">¥{{one.totalPrice}}</span></li>
									<li class="r_r">
										<div class="remark_span" v-show="!openSwitch[one['productId']]['isRemark']" @click="openRemark(one.productId)">
											<span v-if="one.remark=='' || typeof(one.remark)=='undefined'">点击输入备注</span>
											<span v-else>{{one.remark}}</span>
										</div>
										
										<div class="remark_div" v-show="openSwitch[one['productId']]['isRemark']">
											<el-input type="text" v-model="one.remark" @blur="addRemark(key,k,one.productId)" :ref="'remark'+one.productId" autofocus></el-input>
										</div>
										
									</li>
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
								<div class="form-item col-2">
									<label class="label"><span class="required">*</span>客户名称</label> 
									<input type="text" placeholder="请输入客户名称" maxlength="50" v-model="postCustomer.name">
									<div class="tips" style="display: none;">请输入用户名</div>
								</div>
								<div class="form-item col-2">
									<label class="label"><span class="required">*</span>联系电话 </label> 
									<input type="text" placeholder="请输入手机号码" v-model="postCustomer.phone">
									<div class="tips" style="display: none;">请输入正确的手机号</div>
								</div>
								<div class="form-item act">
									<a href="javascript:void(0)" class="btn" @click="openCustomers">
										选择已有客户
									</a>
								</div>
								<div class="form-item col-2">
									<label class="label">户型</label>
									<input maxlength="10" type="text" placeholder="请输入户型" v-model="postCustomer.houseType">
								</div>
								<div class="form-item col-2">
									<label class="label">地址</label><input type="text" placeholder="请输入地址" maxlength="60" v-model="postCustomer.address">
								</div>
								<div class="form-item col-1">
									<label class="label">方案设计</label><input type="text" placeholder="" v-model="postCustomer.design">
								</div>
								<div class="form-item col-1">
									<label class="label">方案说明</label>
									<textarea type="text" placeholder="方案说明" v-model="postCustomer.description"></textarea>
								</div>
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
						<el-button size="small" @click="cancelCustomer">取消</el-button>
						<el-button type="primary" size="small" @click="confirmPostCustomer">确定</el-button>
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
								<el-radio :label="scope.row.id" v-model="exchangeProd.id" @change="selectionProduct(scope.$index,scope.row)">&nbsp</el-radio>
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
						<el-button size="small" @click="cancelExchange">取消</el-button>
						<el-button type="primary" size="small"  @click="confirmExchange">确定</el-button>
					</div>
				</el-dialog>
				
			</el-main>
			
		</el-container>
		<div class="block">
			<div class="content">
				<div class="fixed_btn">
					<el-button class="fixed_btn_left" @click="goBack">返回首页</el-button>
					<p class="fixed_total">总计</p>
					<p class="fixed_price">{{this.allPrice}}</p>
					<!-- <p class="fixed_space">调整空间</p> -->
					<el-button type="primary" class="fixed_btn_right">生成方案</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import DesignJs from './DesignDetail.js'
	export default DesignJs
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
	.edit_input .el-input__inner{
		height: 30px !important;
	}
	.remark_div .el-input__inner{
		height: 90px !important;
	}
</style>
<style scoped>
	@import '../../../static/css/design_detail.css';
</style>
