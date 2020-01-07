<template>
<div id="sys">
  <table align="center">
    <tr v-for="(item, key) in detail.file" align="center">
      <td align="center" class="img-td"><img v-bind:src="item" class="img"/></td>
    </tr>
  </table>
</div>
</template>

<script>
  import { getSysDetail } from '@/api/design'
  export default {
  	name: 'sysDetail',
  	data() {
  		return {
        id: this.$route.query.id,
        detail:{
          file:[]
        }
  		}
  	},
  	created: function() {
      this.getSys();
  	},
  	methods:{
      getSys(){
        let id = this.id
        getSysDetail(id).then(response => {
        	if (response.status==1) {
            this.detail = response.data;
        	}
        }).catch(err => {
        	console.log(err)
        })

      },
    },
  }
</script>

<style scoped="scoped">
  #sys {
    width: 100%;
    min-width: 1080px;
    margin: 0 auto;
  }
  #sys table{
    margin: 0 auto;
  }
  .img-td{
    text-align: center;
  }
  .img{
    margin: 0 auto;
    width: 100%;
  }
</style>
