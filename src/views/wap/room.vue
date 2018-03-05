<template>
  <div class="container">
    <div class="row">
      <div class="box-container" :class="col_xs_num" :style="{height:box_height}" v-for="(item,index) in members">
        <video class="box" autoplay playsinline src=""
               :id="item.video_id"
        ></video>
      </div>
    </div>
    <br>
    <br>
    <footer class="footer navbar-fixed-bottom ">
      <div>
        <img @click="local_member_left" src="../../../static/image/icon/hangup4.svg" alt="..."
             class="img-circle center-block hangup">
      </div>
      <br>
      <br>
      <br>
      <br>
    </footer>
  </div>
</template>
<style>
  .box-container {
    /*height: 150px;*/
    outline-style: none;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 0;
    position: relative;
    vertical-align: baseline;
    /*width: 448px;*/
    -webkit-box-flex: 100;
    -webkit-box-orient: vertical;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .box {
    box-sizing: border-box;
    display: block;
    height: 100%;
    line-height: 20px;
    object-fit: cover;
    vertical-align: baseline;
    width: 100%;
  }

  .hangup {
    height: 18vw;
    background: #E04446;
  }
</style>
<script>
  import Cookie from 'js-cookie'
  import Meeting from '@/assets/js/shinevv-meeting'

  export default {
    data() {
      return {
        members: [], //房间访客数据
        meet: {}, //存放shinevsdk
      }
    },
    computed: {
      members_count() { //房间访客数
        return this.members.length
      },
      user_info() { //本地用户数据
        let user_info = JSON.parse(Cookie.get('user_info'))
        return user_info
      },
      col_xs_num() {
        let num = 12 / Math.ceil(Math.sqrt(this.members_count)),
            val = 'col-xs-' + num.toString(),
            obj = {};
        obj[val] = 1;
        return obj;

      },
      box_height() {
        let num = 64 / Math.ceil(Math.sqrt(this.members_count));
        return num.toString() + 'vh';
      }
    },

    mounted() {
      console.log(this.col_xs_num);
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
      }
    }
  }
</script>