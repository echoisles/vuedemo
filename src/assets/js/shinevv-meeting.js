export default function Meeting(opts){
  let shinevv = null,
      self = this
  let default_opts = {
    roomId:0,
    localMemberId:parseInt(Math.random()*9999999+1).toString(),
    displayName:"亮眼云",
    server:'vvroom.shinevv.cn',
    port:3443,
    onJoinSuccess:function () {},
    onJoinFail:function(){},
    onNewMemberJoined:function(){},
    onMemberLeft:function(){}
  }

  opts = Object.assign(default_opts,opts);

  function startMeeting(){
    shinevv = new Shinevv(opts.localMemberId, opts.displayName, opts.server, opts.port);
    self.shinevv = shinevv
    shinevv.joinRoom(
        opts.roomId,
        true,
        function(){
          console.log('joinRoom onSuccess');
          opts.onJoinSuccess()
        },
        function(reason){
          console.log('joinRoom onFail reason = %s',reason);

          opts.onJoinFail(reason)

          shinevv.leaveRoom();

          shinevv = null;
        },
        function(){
          console.log('joinRoom onDisconnected');

          shinevv.leaveRoom();

          shinevv = null;
        },
        function(reason){
          console.log('joinRoom onClose reason = %s', reason);

          shinevv.leaveRoom();

          shinevv = null;
        },
        function(remote_memberId, displayName){
          console.log('joinRoom onNewMemberJoined remote_memberId = %s, displayName = %s',remote_memberId, displayName);

          opts.onNewMemberJoined(remote_memberId, displayName)
          //shinevv.setVideoLabel(remote_memberId,'video_remote');
        },
        function(remote_memberId, displayName){
          console.log('joinRoom onMemberLeft remote_memberId = %s, displayName = %s',remote_memberId, displayName);
          opts.onMemberLeft(remote_memberId,displayName)
        },
        function(memberId, kind, bOpen){
          console.log('joinRoom onMemberStatusChange memberId = %s, kind = %s bOpen = %s',memberId, kind, bOpen.toString());
        }
    );
  }

  function stopMeeting()
  {
    if (!shinevv)
      return;

    shinevv.leaveRoom();

    shinevv = null;
  }

  function muteAudio()
  {
    if (!shinevv)
      return;

    shinevv.muteMic();
  }

  function unMuteAudio()
  {
    if (!shinevv)
      return;

    shinevv.unmuteMic();
  }

  function disableVideo()
  {
    if (!shinevv)
      return;

    shinevv.disableWebcam();
  }

  function enableVideo()
  {
    if (!shinevv)
      return;

    shinevv.enableWebcam();
  }

  this.startMeeting = startMeeting
  this.stopMeeting = stopMeeting
  this.muteAudio = muteAudio
  this.unMuteAudio = unMuteAudio
  this.disableVideo = disableVideo
  this.enableVideo = enableVideo



}


