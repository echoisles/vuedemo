<template>
  <div class="bg-logo">
    <!--<header style="color:#fff">{{members}}</header>-->
    <div id="mediasoup-demo-app-container">
      <div data-component="Room" class="">
        <div data-component="Notifications"></div>
        <div class="room-link-wrapper">
          <div class="room-link">
            <a @click="local_member_left()" class="link" title="退出房间">
              <img width="20px" src="../../static/image/icon/leave2.svg" alt=""></a>
          </div>
        </div>
        <div data-component="Peers">
          <div class="peer-container active-speaker" v-for="(item,index) in members">
            <div data-component="Peer">
              <div class="indicators"></div>
              <div data-component="PeerView">
                <video class="" autoplay playsinline src=""
                       :id="item.video_id"
                ></video>
                <div class="volume-container">
                  <div class="bar level0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import '../assets/css/mediasoup-demo-app.css';
</style>
<style>
  .bg-logo {
    background-color:#3B3B3B;
    background-image: url(../../static/image/login.png);
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position:center;
    background-size:40%
  }
  #mediasoup-demo-app-container [data-component='Room'] > .room-link-wrapper{
    justify-content: flex-end !important;
  }
</style>
<script>
  import Cookie from 'js-cookie'
  import Meeting from '../assets/js/shinevv-meeting'

  export default {
    data() {
      return {
        members: [], //房间访客数据
        meet: {}, //存放shinevsdk
        IS_WAP: 721 > document.body.clientWidth //是否是手机端
      }
    },
    computed: {
      members_count() { //房间访客数
        return this.members.length
      },
      user_info() { //本地用户数据
        let user_info = JSON.parse(Cookie.get('user_info'))
        return user_info
      }
    },

    mounted() {
      let self = this
      if (!this.user_info.member_id) {//没有登陆信息跳转至登陆页
        this.$router.push({path: '/'})
        return
      }

      let room_id = this.user_info.room_id,
          opts = {
            roomId: room_id,
            localMemberId: this.user_info.member_id,
            // onBeforeJoinRoom() {
            //   self.local_member_join()
            // },
            onJoinSuccess() {
              self.local_member_join()
            },
            onNewMemberJoined(member_id, nickname) {
              self.remote_member_join(member_id, nickname)
            },
            onMemberLeft(member_id, nickname) {
              self.remote_member_left(member_id, nickname);
            }
          }

      this.meet = new Meeting(opts)
      this.meet.startMeeting()

    },
    methods: {
      //用户本人加入房间时
      local_member_join() {
        let member_id = this.user_info.member_id,
            member_info = {
              type: 'local',
              //video_id: 'video_' + this.members_count,
              video_id: 'video_local',
              nickname: this.user_info.nickname,
              member_id: member_id
            }
        this.members.unshift(member_info)
        this.meet.shinevv.setVideoLabel(member_info.member_id, member_info.video_id)
      },

      //远程用户加入房间
      remote_member_join(member_id, nickname) {
        let member_info = {
          type: 'remote',
          video_id: 'video_' + this.members_count,
          nickname: nickname,
          member_id: member_id
        }
        this.members.push(member_info)
        this.meet.shinevv.setVideoLabel(member_info.member_id, member_info.video_id)
      },

      //用户本人离开房间
      local_member_left() {
        this.meet.stopMeeting();
        this.$router.push({path: '/'})
      },

      //远程用户离开房间
      remote_member_left(member_id, nickname) {
        for (let i in this.members) {
          let row = this.members[i];
          if (row['member_id'] === member_id) {
            this.members.splice(i, 1);
            return
          }
        }
      },

      // test(){
      //   this.members.unshift({
      //     type: 'remote',
      //     video_id: 'video_' + this.members_count,
      //     nickname: "test" +this.members_count ,
      //     member_id: parseInt(Math.random()*9999999+1).toString()
      //   })
      // }
    },
    // watch:{
    //   members(){
    //     var self = this;
    //     this.$nextTick(()=>{
    //       this.members.forEach(function(member_info) {
    //         self.meet.shinevv.setVideoLabel(member_info.member_id, member_info.video_id)
    //       });
    //     });
    //   }
    // }
  }
</script>