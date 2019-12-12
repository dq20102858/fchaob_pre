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
			isExchage: false, //是否替换已有产品
			openSwitch: {},
			customerPage: 1, //客户列表当前的分页
			selectPage: 1, //产品当前分页
			selectTotalPage: 1,
			cateId: "",
			index: -1, //系统当前鼠标点击的序号
			spaceIndex: 0,
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
			selectedAddSpace: [], //选择的产品空间
			curSysName: "", //当前选择的系统名称
			i: 0,
			canLoad: true, //分页是否可以继续请求加载
			productView: [], //产品视图
			exchangeProd: [], //替换的产品信息
			preProductId: 0, //替换前的产品id


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
				this.servicePriceLists[i]['serviceItemPrice'] = parseFloat(price * calculateTPrice).toFixed(2);
				let oneServicePrice = this.servicePriceLists[i]['serviceItemPrice'];
				this.servicePrice += oneServicePrice;
			}
			this.servicePrice = parseFloat(this.servicePrice).toFixed(2);
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
			this.$nextTick(function() {
				this.$refs.scroll.addEventListener("scroll", this.handleScroll, true)
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
					this.templateLists = data.spaces;
					let openSwitch = this.openSwitch;
					let that = this;
					this.templateLists.forEach(function(systems, index) {
						systems['systems'].forEach(function(prods, index) {
							prods['prods'].forEach(function(item, index) {
								item['totalPrice'] = item['productNum'] * item['productPrice'];
								let productId = item['productId'];
								that.$set(openSwitch, productId, {});
								that.$set(openSwitch[productId], "changePrice", false);
								that.$set(openSwitch[productId], "isOpenEdit", true);
								that.$set(openSwitch[productId], "isOpenEditV2", false);
								that.$set(openSwitch[productId], "isShowOriginPrice", false);
								that.$set(openSwitch[productId], "isRemark", false);
							})
						})
						let one = {
							class: "", //控制选中样式
							name: systems['spaceName']
						}
						spaces.push(one);
					});
					this.openSwitch = openSwitch;
					this.spaces = spaces;
					this.getCalculateTPrice();
					this.handelProductView();
					// console.log(this.templateLists);
				} else {

				}
			}).catch(err => {
				console.log(err)
			})
		},

		getPageProduct4Select() {
			getPageProduct4Select(this.selectPage, this.cateId, this.selectKeywords).then(response => {
				var data = response.data.data
				if (data.data.length > 0) {
					// this.selectedLists = data.data;
					this.selectedLists.push.apply(this.selectedLists, data.data);
					this.selectPage = parseInt(data['current_page']);
					this.selectTotalPage = parseInt(data['total']);
				} else {
					this.canLoad = false;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		chageProductInput() {
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
		handelProductView() {
			this.productView = [];
			let productListsTmp = [];
			let list = [];
			let templateLists = JSON.parse(JSON.stringify(this.templateLists));
			let that = this;
			templateLists.forEach(function(systems, index1) {
				systems['systems'].forEach(function(prods, index2) {
					prods['prods'].forEach(function(item, index3) {
						let productId = item["productId"];
						if (productListsTmp.hasOwnProperty(productId)) {
							that.$set(productListsTmp[productId], "productTotalNum", productListsTmp[productId]["productTotalNum"] +
								item['productNum']);
							productListsTmp[productId]["spaceNums"].push({
								spaceName: systems['spaceName'],
								num: item['productNum']
							});
							that.$set(productListsTmp[productId], "totalPrice", parseInt(productListsTmp[productId]["productTotalNum"]) *
								item['productPrice']);

						} else {
							that.$set(productListsTmp, productId, item);
							that.$set(productListsTmp[productId], "productTotalNum", item['productNum']);
							let one = [{
								spaceName: systems['spaceName'],
								num: item['productNum']
							}];
							that.$set(productListsTmp[productId], "spaceNums", one);
							that.$set(productListsTmp[productId], "systemId", prods['systemId']);
							that.$set(productListsTmp[productId], "totalPrice", parseInt(productListsTmp[productId]["productTotalNum"]) *
								item['productPrice']);
						}
					});

					let systemId = prods['systemId'];
					list[systemId] = {
						systemName: prods['systemName'],
						systemId: systemId,
						prods: []
					};
				})
			});
			productListsTmp.forEach(function(prod, index) {
				let systemId = prod['systemId'];
				list[systemId]['prods'].push(prod);
			});
			list = list.filter(function(e) {
				return e
			});
			this.productView = list;
		},
		//删除产品
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
			this.allPrice = parseFloat(this.discountPrice) + parseFloat(this.servicePrice);

			this.calculateTPrice = parseFloat(this.calculateTPrice).toFixed(2);
			this.discountPrice = parseFloat(this.discountPrice).toFixed(2);
			this.allPrice = parseFloat(this.allPrice).toFixed(2);
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
		selectSpace(key) {
			this.spaces.forEach(function(item, index) {
				if (index == key) {
					if (item['class'] == "") {
						item['class'] = "active";
					} else {
						item['class'] = "";
					}
				}
			});
		},
		addSpace(prod, key) {
			let selectedAdd = [];
			this.spaces.forEach(function(item, index) {
				if (item['class'] == "active") {
					selectedAdd.push(item['name']);
				}
			});
			this.selectedAddSpace = selectedAdd; //在所选空间里面新增产品
			this.addProd2Template(prod);
			this.closeSpace(key);
		},

		closeSpace(key) {
			//关闭产品空间面板
			this.spaces.forEach(function(space, index) {
				space['class'] = "";
			});
			this.selectedAddSpace = [];
			this.selectedLists[key]['isShow'] = false;
		},

		addProd2Template(prod) {
			//往所选空间里面新增产品
			let systemId = prod['topCatalogId'];
			let proId = prod['id'];
			let selectSpace = this.selectedAddSpace;
			let curSysName = this.curSysName;

			this.templateLists.forEach(function(systems, index) {
				var indexof = selectSpace.indexOf(systems['spaceName']);
				if (indexof != '-1') {
					let hasSys = false; //是否已经有此系统
					let hasProd = false; //是否已经有此产品
					systems['systems'].forEach(function(prods, index) {
						if (prods['systemId'] == systemId) {
							prods['prods'].forEach(function(item, index) {
								if (item['productId'] == proId) {
									hasProd = true;
									item['productNum'] += 1;
									item['totalPrice'] = item['productNum'] * item['productPrice'];
								}
							});
							hasSys = true;
							if (!hasProd) {
								let addProItem = {
									productId: prod['id'],
									productCode: prod['code'],
									productImageUrl: prod['imageUrl'],
									productName: prod['name'],
									productNum: 1,
									productPrice: prod['marketPrice'],
									productSn: "",
									totalPrice: prod['marketPrice'],
								}
								prods['prods'].push(addProItem);
							}
						}
					});
					if (!hasSys) {
						let addSysItem = {
							systemId: systemId,
							systemName: curSysName,
							prods: [{
								productId: prod['id'],
								productCode: prod['code'],
								productImageUrl: prod['imageUrl'],
								productName: prod['name'],
								productNum: 1,
								productPrice: prod['marketPrice'],
								productSn: "",
								totalPrice: prod['marketPrice'],
							}]
						};
						systems['systems'].push(addSysItem);
					}
				}
			});
			this.getCalculateTPrice();
			this.handelProductView();
		},

		handleScroll() {
			// 页面滚动距顶部距离
			let scrollTop = this.$refs.scroll.scrollTop;
			let clientHeight = this.$refs.scroll.clientHeight; // 获取可视区的高度
			let scrollHeight = this.$refs.scroll.scrollHeight; // 获取滚动条的总高
			var scroll = scrollTop - this.i;
			this.i = scrollTop;
			let reduce = scrollHeight - clientHeight;
			let gap = parseFloat(scrollTop / reduce).toFixed(2);
			if (scroll >= 0 && this.canLoad) {
				if (scrollTop + clientHeight >= scrollHeight) {
					this.selectPage++;
					this.getPageProduct4Select();
				}
			}


		},
		//返回首页
		goBack() {
			this.$confirm('返回无法保存已编辑的信息。确定返回？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$router.push({
					name: 'design'
				});
			}).catch(() => {

			});

		},
		//产品视图中删除产品
		delProductView(productId) {
			let templateLists = this.templateLists;
			templateLists.forEach(function(systems, index1) {
				systems['systems'].forEach(function(prods, index2) {
					prods['prods'].forEach(function(item, index3) {
						if (item['productId'] == productId) {
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
		//点击替换
		exchageProductView(productId) {
			this.isExchage = true;
			this.preProductId = productId;
		},
		//选择替换的产品
		selectionProduct(index, row) {
			this.exchangeProd = row;
		},
		//确认替换产品
		confirmExchange() {
			let exchageProd = this.exchangeProd;
			let preProductId = this.preProductId;
			let templateLists = this.templateLists;

			templateLists.forEach(function(systems, index) {
				systems['systems'].forEach(function(prods, key) {
					prods['prods'].forEach(function(item, k) {
						if (item['productId'] == preProductId) {
							let product = {
								productCode: exchageProd['code'],
								productId: exchageProd['id'],
								productImageUrl: exchageProd['imageUrl'],
								productName: exchageProd['name'],
								productPrice: exchageProd['marketPrice'],
								productSn: "",
								productSpecs: exchageProd['spec'],
								productNum: item['productNum'],
								totalPrice: item['productNum'] * exchageProd['marketPrice']
							};
							templateLists[index]['systems'][key]['prods'][k] = product;
						}
					})
				})
			});
			this.templateLists = templateLists;
			this.getCalculateTPrice();
			this.handelProductView();
			this.isExchage = false;
			this.exchangeProd = [];
		},
		//取消替换产品
		cancelExchange() {
			this.isExchage = false;
			this.preProductId = 0;
		},
		//确认选择的已有客户
		confirmPostCustomer() {
			this.isShowCustomers = false;
		},
		//取消选择客户
		cancelCustomer() {
			this.isShowCustomers = false;
			this.postCustomer = {};
		},
		editShowPrice(productId) {
			this.openSwitch[productId]['changePrice'] = true;
			let ref = "changePrice" + productId;
			let array = this.$refs;
			array[ref][0].focus()
			this.$nextTick(function() {
				array[ref][0].focus()
			});
		},
		//确认修改价格
		confirmChangePrice(key, k, productId) {
			this.openSwitch[productId]['changePrice'] = false;
			this.openSwitch[productId]['isShowOriginPrice'] = true
			this.openSwitch[productId]['isOpenEditV2'] = true
			this.openSwitch[productId]['isOpenEdit'] = false

			let templateLists = this.templateLists;
			let productView = this.productView;
			templateLists.forEach(function(systems, index1) {
				systems['systems'].forEach(function(prods, index2) {
					prods['prods'].forEach(function(item, index3) {
						if (item['productId'] == productId) {
							let price = productView[key]['prods'][k]['productPrice'];
							templateLists[index1]['systems'][index2]['prods'][index3]['productPrice'] = parseFloat(price);
							let totalPrice = parseFloat(price) * parseInt(item['productNum']);
							templateLists[index1]['systems'][index2]['prods'][index3]['totalPrice'] = totalPrice;
						}
					})
				})
			});
			this.templateLists = templateLists;
			this.handelProductView();
			this.getCalculateTPrice();

		},
		editShowPriceV2(productId) {
			this.openSwitch[productId]['changePrice'] = true;
			this.openSwitch[productId]['isOpenEditV2'] = false;
			let ref = "changePrice" + productId;
			let array = this.$refs;
			array[ref][0].focus()
			this.$nextTick(function() {
				array[ref][0].focus()
			});
		},
		//点击添加备注
		openRemark(productId) {
			this.openSwitch[productId]['isRemark'] = true;
			let ref = "remark" + productId;
			let array = this.$refs;
			array[ref][0].focus()
			this.$nextTick(function() {
				array[ref][0].focus()
			});
		},
		//添加备注内容
		addRemark(key, k, productId) {
			this.openSwitch[productId]['isRemark'] = false;
			let templateLists = this.templateLists;
			let productView = this.productView;
			templateLists.forEach(function(systems, index1) {
				systems['systems'].forEach(function(prods, index2) {
					prods['prods'].forEach(function(item, index3) {
						if (item['productId'] == productId) {
							item['remark'] = productView[key]['prods'][k]['remark'];
						}
					})
				})
			});
			this.templateLists = templateLists;
		}
	}
}
