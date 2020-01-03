<template>
  <div id="home">
    <el-container>
      <el-header class="main_header">
        <div id="header_left">
          <i class="iconfont iconzu16"></i>
          <svg class="logo_1" aria-hidden="true"> <use xlink:href="#iconzu11"></use> </svg>
        </div>
        <div id="header-right">
          <div class="right-line">
            <i class="iconfont iconzu12"></i>
            <i class="iconfont iconzu15"></i>
            <i class="user-name">{{this.name}}</i>
            <i class="iconfont iconzu14"></i>
            <div class="company">
              <el-dropdown trigger="click" class="company-sub-menu" placement="top">
                <span class="el-dropdown-link">
                  <img src="../../assets/imgs/company.png" /><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <i class="iconfont iconzu13"></i>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="261px" class="left-side">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="iconfont iconzu menu-icon"></i><span class="main_menu_title">销售与服务</span></template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="goDesign">方案设计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="iconfont iconzu1 menu-icon"></i><span class="main_menu_title">产品管理</span></template>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="iconfont iconzu2 menu-icon"></i><span class="main_menu_title">渠道与项目</span></template>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="iconfont iconzu3 menu-icon"></i><span class="main_menu_title">资料与学习</span></template>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="iconfont iconzu4 menu-icon"></i><span class="main_menu_title">售后与支持</span></template>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="iconfont iconzu5 menu-icon"></i><span class="main_menu_title">蜂巢服务</span></template>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title"><i class="iconfont iconzu6 menu-icon"></i><span class="main_menu_title">小程序管理</span></template>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-header class="sub-header">
            <span class="sub-breadcrumb">首页</span>
          </el-header>
          <div class="main_div">
            <div class="main_background">欢迎光临</div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        name:this.$store.state.user.name
      }
    },
    methods: {
      goDesign(index, row) {
        //跳转到模板选择页
        let routerJump = this.$router.resolve({
          path: "/design"
        });
        window.open(routerJump.href, "_blank");
      },
      logout() {
        this.$store.dispatch('user/logout').then(() => {
          location.reload() // In order to re-instantiate the vue-router object to avoid bugs
        })
      }

    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #home .main_header {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 60px !important;
    padding: 0;
  }
  #home .logo_1{
    width: 130px;
    height: 40px;
    margin-top: 26px;
  }
  #header_left {
    width: 260px;
    height: 100%;
    background: #000000 !important;
    float: left;
    position: relative;
  }
  #header-right{
    float: left;
    width: calc(100% - 260px);
    height: 100%;
    background: url(../../assets/imgs/bg-01.png) repeat-x;
}
  #home .sub_header {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 48px;
    height: 48px !important;
  }

  #home .right-line{
    width: 350px;
    float: right;
    position: relative;
  }
  #home .el-aside {
    height: calc(100vh - 60px);
  }

  #home .el-main {
    background-color: #f0f2f5;
    padding: 0 !important;
  }

  #home .el-container:nth-child(5) .el-aside,
  #home .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  #home .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  #home .main_menu_title {
    display: inline-block;
    margin-left: 13px;
    font-size: 16px;

  }

  #home .el-menu {
    text-align: left;
    height: 100%;
    background: #000000;
  }

  #home .el-submenu__title:hover {
    background: #000000;
  }

  #home .el-submenu__title {
    color: #FCC98C;
  }

  #home .el-menu-item {
    color: #FCC98C;
  }
  #home .menu-icon{
    color: #FCC98C;
    font-size: 20px;
  }
  #home .iconzu16{
    position: absolute;
    left: 21px;
    top: 20px;
  }
  #home .iconzu12,.iconzu15,.iconzu14,.iconzu13,.iconzu16{
    font-size: 20px;
    position: absolute;
  }
  .iconzu13{
    right: 55px;
  }
  .company{
    right: 123px;
    position: absolute;
    top: 5px;
  }
  .company .company-sub-menu{
    height: 50px;
  }
  .company .el-icon--right{
    position: absolute;
    top: 20px;
  }
  .iconzu14{
    right: 339px;
  }
  .iconzu15{
    right: 374px;
  }
  .iconzu12{
    right: 408px;
  }
 #home .user-name{
   position: absolute;
   right: 298px;
   font-style: normal;
   font-size: 16px;
 }
  #home .iconzu14{
    color: #FCC98C;
  }
  #home .el-submenu__title i {
    color: #FCC98C;
  }

  #home .el-menu-item:focus,
  .el-menu-item:hover {
    color: #FCC98C;
    background: #000000;
  }

  #home .el-submenu .el-menu-item {
    font-size: 14px;
    padding: 0 !important;
    margin-left: 57px;
  }

  #home .el-menu-item {
    min-width: 190px !important;
    margin-left: 11px;
  }

  #home .left-side .el-icon-arrow-down {
    margin-right: 18px;
  }

  #home .el-menu-item-group__title {
    padding: 0;
  }

  #home .breadcrumb {
    display: block;
    width: 50px;
    font-weight: 999;
  }

  #home .main_div {
    width: 100%;
    height: calc(100vh - 140px);
    position: relative;

  }

  #home .main_div .main_background {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 40%;
    font-size: 60px;
    color: #cccccc;
  }
  #home .sub-header{
    margin: 0;
    padding: 0;
    height: 70px !important;
    background: #FFFFFF;
    line-height: 70px;
  }
  #home .sub-breadcrumb{
    margin-left: 28px;
    font-size: 20px;
  }
</style>
