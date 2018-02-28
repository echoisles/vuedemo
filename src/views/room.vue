<template>
  <div>
    <header>{{members_count}}</header>
    <div v-bind:style="{width:wraper_width+'px',height:wraper_height+'px',margin:'0 auto'}">
      <div v-for="(item,index) in members"
           :style="{width:box_width+'px',height:box_height+'px',display:'inline-block'}"
      >
        <video :id="item.video_id"
               autoplay playsinline controls="true" src=""></video>
      </div>
    </div>
  </div>

</template>
<style>
  video {
    width: 100%;
    height: 100%
  }
</style>
<script>
  import Cookie from 'js-cookie'
  import Meeting from '../assets/js/shinevv-meeting'

  export default {
    data() {
      return {
        members: [],
        wraper_width: document.body.clientWidth - 15,
        meet: {}
      }
    },
    computed: {
      members_count() {
        return this.members.length
      },
      wraper_height() {
        return this.wraper_width
      },
      box_width() {
        let members_count = this.members_count,
            x = Math.ceil(Math.sqrt(members_count))
        return x ? this.wraper_width / x : 0
      },
      box_height() {
        let members_count = this.members_count,
            y = Math.ceil(Math.sqrt(members_count))
        return y ? this.wraper_width / y : 0
      },
      user_info() {
        let user_info = JSON.parse(Cookie.get('user_info'))
        return user_info
      }
    },

    mounted() {
      let self = this

      if (!this.user_info) {//没有登陆信息跳转至登陆页
        this.$router.push({path: '/'})
        return
      }

      let room_id = this.user_info.room_id,
          opts = {
            roomId: room_id,
            localMemberId: this.user_info.member_id,
            onJoinSuccess() {
              self.add_local()
            },
            onNewMemberJoined(member_id, nickname) {
              self.add_remote(member_id, nickname)
            }
          }

      this.meet = new Meeting(opts)
      this.meet.startMeeting()

    },
    methods: {
      add_local() {
        let member_id = this.user_info.member_id,
            member_info = {
              type: 'local',
              //video_id: 'video_' + this.members_count,
              video_id: 'video_local',
              nickname: this.user_info.nickname,
              member_id: member_id
            }
        this.members.push(member_info)
        this.meet.shinevv.setVideoLabel(member_id, member_info.video_id)
      },

      add_remote(member_id, nickname) {
        let member_info = {
          type: 'remote',
          video_id: 'video_' + this.members_count,
          nickname: nickname,
          member_id: member_id
        }
        this.members.push(member_info)
        this.meet.shinevv.setVideoLabel(member_id, member_info.video_id)
      },
    }

  }
</script>