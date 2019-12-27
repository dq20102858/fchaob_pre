<template>
  <div id="transfer">
    <div class="logo">
      <svg class="logo-svg" aria-hidden="true">
        <use xlink:href="#iconzu10"></use>
      </svg>
    </div>
    <div class="transfer-wapper">
      <div class="info-box">
        <div class="info_icon"><i class="icon el-icon-circle-check icon-chenggong"></i></div>
        <div class="info_title">您已成功生成方案</div>
        <div class="info_desc">{{detail.customerName}}&nbsp;{{detail.customerPhone}}&nbsp;{{detail.houseType}}&nbsp;{{detail.note}}</div>
        <div class="info_price">
          共计
          <span class="price_num">{{detail.finalPrice}}</span> 元
        </div>
        <div class="info_action">
          <span class="desc">您可以</span>
          <router-link :to="{name:'designDetail',query:{id:this.detail.templateId,type:'edit',planId:this.planId}}">修改清单</router-link>
          <el-dropdown>
            <span class="download_popper">
              下载清单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
            <!-- <a href="javascript:void(0)">存为模板</a> -->
            <router-link :to="{name:'design'}">返回首页</router-link>
        </div>

      </div>
    </div>
    <div class="tabs">
      <ul class="tabs_nav">
        <li :class="index==1?'active':''"  @click="changeShow(1)">产品配置</li>
        <li :class="index==2?'active':''"  @click="changeShow(2)">汇总清单</li>
      </ul>
      <div class="pro_list" v-show="isShow">
        <div class="table_title">
          <div class="block"></div>
          <div class="title_right">
            <div class="text">
              <p class="name">产品</p>
              <p class="single">单价</p>
              <p class="number">数量</p>
              <!---->
              <p class="total">金额</p>
            </div>
            <p class="note">备注</p>
          </div>
        </div>
        <div class="table_content" v-for="(item,key) in this.productView">
          <h3>{{item.systemName}}</h3>
          <ul  class="table_content_ul01">
            <li v-for="(prod,k) in item.prods">
              <img v-bind:src="prod.productImageUrl" :alt="prod.productName">
              <div class="right">
                <div class="text">
                  <div class="line1">
                    <p class="name">{{prod.productName}}</p>
                    <p class="single"><span>¥{{prod.productPrice}}</span></p>
                    <p class="number">{{prod.productNum}}</p>
                    <!---->
                    <p class="total">¥{{prod.totalPrice}}</p>
                  </div>
                  <div class="line2">
                    <p class="spec">{{prod.productSpecs}}</p>
                    <p class="specia"></p>
                  </div>
                  <p class="line3"> {{prod.spaceNumsStr}} </p>
                </div>
                <div class="note">
                  <span class="note_content">{{prod.remark}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="pro_list" v-show="!isShow">
        <div class="table_title">
          <div class="left"> <p>产品分类</p></div>
          <div class="right">
            <div class="block"></div>
            <div class="text"><p>产品</p><p>规格</p><p>数量</p><p>单价</p><p>金额</p></div>
          </div>
        </div>
        <div class="table_content" v-for="(item, key) in this.detail.spaces">
          <h3>{{item.spaceName}}</h3>
          <div class="pro_content" v-for="(system, k) in item.systems">
            <div class="catalog">{{system.systemName}}</div>
            <ul class="table_content_ul02">
              <li v-for="(prod, kk) in system.prods">
                <img v-bind:src="prod.productImageUrl" :alt="prod.productName">
                <div class="right">
                  <p class="pro"><span class="name">{{prod.productName}}</span></p>
                  <p class="spec">{{prod.productSpecs}}</p>
                  <p class="number">{{prod.productNum}}</p>
                  <p class="single">
                    <!----> <span>¥{{prod.productPrice}}</span></p>
                  <p class="total">¥{{prod.totalPrice}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="price_container">
        <div class="product_price">
          <div class="show">
            <div>
              <p>产品总计 <span>¥{{detail.productPrice}}</span></p>
              <p style="">产品折后价： <span>¥{{detail.finalProductPrice}}</span></p>
            </div>
            <!---->
          </div>
         </div>
        <div class="other_price">
          <div class="show">
            <div class="left">
              <p class="item"v-for="(item, key) in this.detail.fees" >{{item.name}}：<span>¥{{item.serviceItemPrice}}</span></p>
            </div>
            <!---->
          </div>
        </div>
      </div>
      <div class="other_info">
        <p><span>{{detail.customerName}}</span> <span>{{detail.customerPhone}}</span>
        <span></span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import TransferJs from './Transfer.js'
  export default TransferJs
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }

  body {
    background: #f5f6f6
  }
  .icon-chenggong {
      position: absolute !important;
      left: 50% !important;
      top: 50% !important;
      -webkit-transform: translate(-50%,-50%) !important;
      transform: translate(-50%,-50%) !important;
      font-size: 37px!important;
      color: #23d368 !important;
  }

</style>
<style scoped>
	@import '../../assets/css/transfer.css';
</style>
