import {
  getPlanDetail
} from '@/api/design'

export default {
	name: 'transfer',
	data() {
    return {
      planId:this.$route.query.id,
      detail:{},
      isShow:false,
      index:1,
      productView:[],
      downLoadPdfConf:[
        {id:1,name:'方案报价'},
        {id:2,name:'房间产品配置'},
        {id:3,name:'方案描述'},
      ],
      downLoadXlsConf:[
        {id:4,name:'方案报价'},
        {id:5,name:'房间产品配置'}
      ],
      checkList:[1,2],
      isDownLoad:false
    }
  },
  created: function() {
    this.getDetail();
  },
  methods: {

    getDetail(){
      let id = this.planId
      getPlanDetail(id).then(response => {
      	if (response.status==1) {
          this.detail = response.data;
          this.handelProductView()
      	}
      }).catch(err => {
      	console.log(err)
      })
    },
    changeShow(type){
      if(type==1){
        this.index = 1;
        this.isShow = false;
      }else{
        this.index = 2;
        this.isShow = true;
      }
    },
    handelProductView() {
    	this.productView = [];
    	let productListsTmp = [];
    	let list = [];
    	let templateLists = JSON.parse(JSON.stringify(this.detail.spaces));
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
    openDownLoad(){
      this.isDownLoad = !this.isDownLoad;
    },
    downLoadPdf(){
      console.log(111)
    },
    downLoadXls(){
      console.log(222)
    }
  }

}
