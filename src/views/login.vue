<template>
 <div class="container">
   <img class="img-responsive center-block" src="/static/image/login.png" alt="">
   <div class="blank"></div>
   <form>
     <div class="form-group row">
       <div class="col-lg-offset-3 col-lg-6">
         <input type="text" class="form-control" id="nickname" placeholder="昵称" v-model="form.nickname">
       </div>
     </div>
     <div class="form-group row">
       <div class="col-lg-offset-3 col-lg-6">
         <input type="text" class="form-control" id="room_id"  placeholder="房间号"  v-model="form.room_id">
       </div>
     </div>
     <div class="form-group">
       <div>
         <button type="button" class="btn btn-radius center-block"  @click="submit()">登 录</button>
       </div>
     </div>
   </form>
 </div>
</template>
<style>
  .blank{height:12vh}
  .form-control {
    background-color:rgba(0, 0, 0, 0);
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
    border-top:none;
    border-left:none;
    border-right:none;
  }
  .btn-radius{
    background: black;
    color:#ffffff;
    border-radius: 50%;
    font-size: 1.5em;
    width:4em;
    height:4em;
  }
</style>
<script>
  import Cookie from 'js-cookie'
  export default {
    data(){
      return {
        form:{
          nickname:"",
          room_id:""
        }
      }
    },
    methods:{
      submit(){
        //TODO::表单验证
        let form = this.form
        form.member_id = parseInt(Math.random()*9999999+1).toString()
        Cookie.set('user_info',form)
        //跳转
        this.$router.push({path:'room',query:{room_id:form.room_id}})
      }
    }
  }
</script>