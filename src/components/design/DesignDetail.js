import {
	getProductCate,
	getTemplateDetail,
	getPageProduct4Select,
	getCustomersPages,
  createPlan,
  getPlanDetail
} from '@/api/design'
export default {
	name: 'designDetail',
	data() {
    var validatePhone = (rule, value, callback) => {
    	var MobileRegex = /^((13)|(14)|(15)|(16)|(17)|(18)|(19))[0-9]{9}$/;
    	if (!MobileRegex.test(value)) {
    		callback(new Error('请输入正确的手机号'))  // 这里错误的信息只要调用callback回调函数，然后在函数里newerror填写错误信息即可
    	} else {
    		callback();  // 一定要有，这是表单校验成功后的回调，会返回一个boolean值，即true
    	}
    }
		return {
			id: this.$route.query.id,
      planId:this.$route.query.planId,
      type:this.$route.query.type,
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
      originTotal:0,
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
      rules:{
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				],
				phone: [
					{ required: true, message: '请输入正确的手机号', trigger: 'blur' },
					{ validator: validatePhone, trigger: 'blur'}
				],
       }

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
	 //  destroyed() {
	 //   this.$nextTick(function() {
		// this.$refs.scroll.addEventListener("scroll", this.handleScroll, true)
	 //   });
	 //  },
	methods: {
		//计算初始服务费
		initServicePriceList() {
			this.servicePrice = 0;
			let discountPrice = this.discountPrice;
			for (let i = 0; i < this.servicePriceLists.length; i++) {
				let discount = parseFloat(this.servicePriceLists[i]['percent'] / 100);
				this.servicePriceLists[i]['serviceItemPrice'] = parseFloat(discount * discountPrice).toFixed(2);
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
				var data = response.data
				if (data) {
					this.productLists = data;
					this.curSysName = this.productLists[0]['name'];
				}
			}).catch(err => {
				console.log(err)
			})
		},
    getPlanDetail(callback){
      let id = this.planId
      getPlanDetail(id).then(response => {
      	if (response.status==1) {
          this.templateLists = response.data.spaces;
          let discount = parseFloat(response.data.finalProductPrice/response.data.productPrice).toFixed(2)*10;
          if(discount<10){
            this.discount = discount;
            this.discountPriceShow = true;
          }
          this.postCustomer = {
            name:response.data.customerName,
            phone:response.data.customerPhone,
            houseType:response.data.houseType,
            address:response.data.customerAddress,
            design:response.data.quoteCompanyName,
            description:response.data.note,
            id:response.data.customId,
          };
          callback(response.data.spaces,this)
      	}
      }).catch(err => {
      	console.log(err)
      })

    },

    getTmpDetailData(callback){
      getTemplateDetail(this.id).then(response => {
      	var data = response.data
      	if (data) {
      		this.templateLists = data.spaces;
          callback(data.spaces,this)
      	}
      }).catch(err => {
      	console.log(err)
      })
    },
    handelTemplates(templateLists,_this){
      let spaces = [];
      let openSwitch = _this.openSwitch;
      templateLists.forEach(function(systems, index) {
      	systems['systems'].forEach(function(prods, index) {
      		prods['prods'].forEach(function(item, index) {
      			item['totalPrice'] = item['productNum'] * item['productPrice'];
      			let productId = item['productId'];
      			_this.$set(openSwitch, productId, {});
      			_this.$set(openSwitch[productId], "changePrice", false);
      			_this.$set(openSwitch[productId], "isOpenEdit", true);
      			_this.$set(openSwitch[productId], "isOpenEditV2", false);
      			_this.$set(openSwitch[productId], "isShowOriginPrice", false);
      			_this.$set(openSwitch[productId], "isRemark", false);
      		})
      	})
      	let one = {
      		class: "", //控制选中样式
      		name: systems['spaceName']
      	}
      	spaces.push(one);
      });
      _this.openSwitch = openSwitch;
      _this.spaces = spaces;
      _this.getCalculateTPrice();
      _this.handelProductView();
    },
		//获取模板房间视图的数据
		getNxTemplateDetail() {
      if(this.type == "edit"){
        this.getPlanDetail(this.handelTemplates);
      }else{
        this.getTmpDetailData(this.handelTemplates);
      }
		},

		getPageProduct4Select() {
			getPageProduct4Select(this.selectPage, this.cateId, this.selectKeywords).then(response => {
				var data = response.data
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
              let str = systems['spaceName']+"X"+item['productNum'];
              productListsTmp[productId]["spaceNumsStr"].push(str);
							that.$set(productListsTmp[productId], "totalPrice", parseInt(productListsTmp[productId]["productTotalNum"]) *
								item['productPrice']);

						} else {
							that.$set(productListsTmp, productId, item);
							that.$set(productListsTmp[productId], "productTotalNum", item['productNum']);
							let one = [{
								spaceName: systems['spaceName'],
								num: item['productNum']
							}];
              let str = [systems['spaceName']+"X"+item['productNum']];
							that.$set(productListsTmp[productId], "spaceNumsStr", str);
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
        prod['spaceNumsStr'] = prod['spaceNumsStr'].join();
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
			let totalPrice  = 0;
      let originTotal = 0;
			this.templateLists.forEach(function(systems, index) {
				systems['systems'].forEach(function(prods, index) {
					prods['prods'].forEach(function(item, index) {
						totalPrice += item['productNum'] * item['productPrice'];
            // originTotal += item['productNum'] * item['orginPrice'];
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
				var data = response.data
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
								totalPrice: item['productNum'] * exchageProd['marketPrice'],
                orginPrice: exchageProd['orginPrice'],
							};
							templateLists[index]['systems'][key]['prods'][k] = product;
						}
					})
				})
			});
      let openSwitch = {
        isShowOriginPrice:false,
        isOpenEdit:true,
        isOpenEditV2:false,
        isShowOriginPrice:false,
        isRemark:false,
        changePrice:false
      }
      this.$set(this.openSwitch, exchageProd['id'],openSwitch);
			this.templateLists = templateLists;
			this.getCalculateTPrice();
			this.handelProductView();
			this.isExchage = false;
			this.exchangeProd = [];
      console.log(this.openSwitch)
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
		},
    delPoster(){
      this.postCustomer = {};
    },
    submit(){
      this.$refs["ruleForm"].validate((valid) => {
      	if (valid) {
          let data = {
            spaces:this.templateLists,
            templateId:this.id,
            fees:this.servicePriceLists,
            customerName:this.postCustomer.name,
            customerPhone:this.postCustomer.phone,
            customerAddress:this.postCustomer.address,
            templateName:this.postCustomer.houseType,
            customerId:this.postCustomer.id,
            note:this.postCustomer.description,
            productPrice:parseFloat(this.calculateTPrice),
            finalProductPrice:parseFloat(this.discountPrice),
            finalPrice:parseFloat(this.allPrice),
            price:parseFloat(this.calculateTPrice) + parseFloat(this.servicePrice),
            productSpecialPrice:parseFloat(this.calculateTPrice),
            quoteCompanyName:this.postCustomer.design,
          };
          createPlan(data).then(response => {
            if (response.status >0) {
              console.log(1)
              this.$router.push({path:"/transfer",query:{id:response.status}});
            } else {
              this.$message({
                type:"error",
                message:"方案生成失败"
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }

	}
}
