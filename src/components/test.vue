<template>
</template>

<script>
  import { compareTo } from '@/utils/compare'
  export default {
    data(){
      return {
        url1:"http://img.nething.com/uploads/crm/public/20191219/e551a13e9ab8af010777a49aca809b32.jpg",
        url2:"http://img.nething.com/uploads/crm/public/20191219/fca1f025ec4fac2ec5b363320c98b8cf.jpg",
        file1:null,
        file2:null,

      }
    },
    created: function() {
      this.testCompare();
    },
    methods: {
      setFiles(callback){
        let _this = this;
        this.convertImgToBase64(this.url1,function(base64Img){
          callback.call(_this, base64Img,1);
        })
        this.convertImgToBase64(this.url2,function(base64Img){
          callback.call(_this, base64Img,2);
        })
      },
      testCompare(){
        this.setFiles(function(base64Data,index){
            if(index==1){
              this.file1 = base64Data;
            }else{
              this.file2 = base64Data;
            }
            if(this.file1!=null && this.file2!=null){
              compareTo(this.file1 ,this.file2)
            }
            // console.log(this.file1  )
            // console.log(this.file2  )
        });
      },
      convertImgToBase64(url, callback, outputFormat){
        let _this = this;
        var canvas = document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          img = new Image();
          img.src = url;
          img.crossOrigin = '*';
          img.onload = function(){
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img,0,0,img.width, img.height);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(_this, dataURL);
            canvas = null;
          };

      }
    },

  }

</script>

<style>
</style>
