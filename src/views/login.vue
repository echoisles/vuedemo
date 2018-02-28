<template>
    <header>
        <section>
            <div class="banner"></div>
            <ul class="form">
                <li>
                    <input type="text" v-model="form.nickname" placeholder="昵称">
                    <div></div>
                </li>
                <li>
                    <input type="text" v-model="form.room_id" placeholder="房间号">
                    <div></div>
                </li>
            </ul>
        </section>
        <div class="login">
            <div class="btn" @click="submit()">登录</div>
        </div>
    </header>
</template>
<style scoped>
    @import '../assets/css/index.css';
</style>
<script>
  import $ from 'jquery'
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