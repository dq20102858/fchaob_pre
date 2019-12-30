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
          <span style="cursor:pointer;" @click="openDownLoad">
            <span class="download_popper">
              下载清单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <div v-show="isDownLoad" class="down_container" style="z-index: 10; position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(143px, 216px, 0px);">
                <div class="download_list">
                  <div class="pdf_down">
                    <div class="dl_img">
                      <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzICg3MjUyMCkgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+aWNvbiAvIDQ4cHggLyBQREY8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0i5YWo5bGAaWNvbiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Imljb24tLy00OHB4LS8tUERGIj4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJTdHJva2UtNyIgc3Ryb2tlPSIjRDgyRTJFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgcG9pbnRzPSIzOCAyMSAzOCAyIDE4LjA2MjUgMiA5IDEyLjU1NTU1NTYgOSAyMSI+PC9wb2x5bGluZT4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJTdHJva2UtOSIgc3Ryb2tlPSIjRDgyRTJFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgcG9pbnRzPSIzOCA0MCAzOCA0NiA5IDQ2IDkgNDAiPjwvcG9seWxpbmU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJTdHJva2UtMTEiIHN0cm9rZT0iI0Q4MkUyRSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHBvaW50cz0iOSAxMyAxOCAxMyAxOCAyIj48L3BvbHlnb24+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJTdHJva2UtMTMiIGZpbGw9IiNEODJFMkUiIHBvaW50cz0iNCA0MCA0MyA0MCA0MyAyMSA0IDIxIj48L3BvbHlnb24+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOS4xNzcsMjguMTQgQzE5LjE3NywyOS44MzQgMTcuOTQ1LDMxLjI0OCAxNS44ODcsMzEuMjQ4IEwxMy45NjksMzEuMjQ4IEwxMy45NjksMzUgTDEyLjAyMywzNSBMMTIuMDIzLDI1LjAzMiBMMTUuODg3LDI1LjAzMiBDMTcuOTQ1LDI1LjAzMiAxOS4xNzcsMjYuNDQ2IDE5LjE3NywyOC4xNCBaIE0xNy4yMzEsMjguMTQgQzE3LjIzMSwyNy4zMjggMTYuNjcxLDI2Ljc2OCAxNS43ODksMjYuNzY4IEwxMy45NjksMjYuNzY4IEwxMy45NjksMjkuNDk4IEwxNS43ODksMjkuNDk4IEMxNi42NzEsMjkuNDk4IDE3LjIzMSwyOC45NTIgMTcuMjMxLDI4LjE0IFogTTI4LjA1MywyOS45NzQgQzI4LjA1MywzMS40NzIgMjguMTY1LDMyLjkyOCAyNy4wNDUsMzQuMDQ4IEMyNi4zODcsMzQuNzA2IDI1LjQ0OSwzNSAyNC40MTMsMzUgTDIwLjgxNSwzNSBMMjAuODE1LDI1LjAzMiBMMjQuNDEzLDI1LjAzMiBDMjUuNDQ5LDI1LjAzMiAyNi4zODcsMjUuMzI2IDI3LjA0NSwyNS45ODQgQzI4LjE2NSwyNy4xMDQgMjguMDUzLDI4LjQ3NiAyOC4wNTMsMjkuOTc0IFogTTI2LjEwNywyOS45NzQgQzI2LjEwNywyOC40NjIgMjYuMDUxLDI3LjgzMiAyNS42ODcsMjcuMzg0IEMyNS4zNTEsMjYuOTc4IDI0LjkwMywyNi43NjggMjQuMjMxLDI2Ljc2OCBMMjIuNzYxLDI2Ljc2OCBMMjIuNzYxLDMzLjI2NCBMMjQuMjMxLDMzLjI2NCBDMjQuOTAzLDMzLjI2NCAyNS4zNTEsMzMuMDU0IDI1LjY4NywzMi42NDggQzI2LjA1MSwzMi4yIDI2LjEwNywzMS40ODYgMjYuMTA3LDI5Ljk3NCBaIE0zNi42MDcsMjYuNzY4IEwzMS45ODcsMjYuNzY4IEwzMS45ODcsMjkuMjE4IEwzNS45MjEsMjkuMjE4IEwzNS45MjEsMzAuOTU0IEwzMS45ODcsMzAuOTU0IEwzMS45ODcsMzUgTDMwLjA0MSwzNSBMMzAuMDQxLDI1LjAzMiBMMzYuNjA3LDI1LjAzMiBMMzYuNjA3LDI2Ljc2OCBaIiBpZD0iUERGIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt="">
                    </div>
                    <ul>
                      <li>
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="down in downLoadPdfConf" :label="down.id" :key="down.id" class="check-box_pdf">{{down.name}}</el-checkbox>
                      </el-checkbox-group>
                      </li>
                    </ul>
                    <a href="javascript:void(0)" class="dl_btn" @click="downLoadPdf">下载</a>
                  </div>
                  <div class="lxs_down">
                    <div class="dl_img"><img src="//staticprm.orvibo.com/static/img/LXS.c99de82.svg" alt=""></div>
                    <ul>
                      <li>
                        <el-checkbox-group v-model="checkList">
                          <el-checkbox v-for="down in downLoadXlsConf" :label="down.id" :key="down.id" class="check-box_pdf">{{down.name}}</el-checkbox>
                        </el-checkbox-group>
                      </li>
                    </ul>
                    <a href="javascript:void(0)" class="dl_btn" @click="downLoadXls">下载</a>
                  </div>
                </div>
              </div>
              </span>
          <!-- <a href="javascript:void(0)">存为模板</a> -->
          <router-link :to="{name:'design'}">返回首页</router-link>
        </div>

      </div>
    </div>
    <div class="tabs">
      <ul class="tabs_nav">
        <li :class="index==1?'active':''" @click="changeShow(1)">产品配置</li>
        <li :class="index==2?'active':''" @click="changeShow(2)">汇总清单</li>
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
          <ul class="table_content_ul01">
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
          <div class="left">
            <p>产品分类</p>
          </div>
          <div class="right">
            <div class="block"></div>
            <div class="text">
              <p>产品</p>
              <p>规格</p>
              <p>数量</p>
              <p>单价</p>
              <p>金额</p>
            </div>
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
              <p class="item" v-for="(item, key) in this.detail.fees">{{item.name}}：<span>¥{{item.serviceItemPrice}}</span></p>
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
    -webkit-transform: translate(-50%, -50%) !important;
    transform: translate(-50%, -50%) !important;
    font-size: 37px !important;
    color: #23d368 !important;
  }
</style>
<style scoped>
  @import '../../assets/css/transfer.css';
</style>
