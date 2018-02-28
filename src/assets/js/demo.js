window.onload = function (){

  document.getElementById("btnJoinRoom").onclick = function(){//开始会议
    var txt = document.getElementById("txt").value;
    startMeeting(txt);
  }

  document.getElementById("btnLeaveRoom").onclick = function(){//停止会议
    stopMeeting();
  }

  document.getElementById("btnMute").onclick = function(){//本地静音
    muteAudio();
  }

  document.getElementById("btnUnMute").onclick = function(){//本地解禁音频
    unMuteAudio();
  }

  document.getElementById("btnDisableVideo").onclick = function(){//本地禁视
    disableVideo();
  }

  document.getElementById("btnEnableVideo").onclick = function(){//本地解禁视频
    enableVideo();
  }

  const localMemberId = parseInt(Math.random()*9999999+1).toString();

  const displayName = '亮眼云';

  var shinevv = {};

  function startMeeting(roomId)
  {
    shinevv = new Shinevv(localMemberId, displayName, 'vvroom.shinevv.cn', 3443);
    //shinevv = new Shinevv(localMemberId, displayName, 'rooms.shinevv.cn', 3443);

    shinevv.setVideoLabel(localMemberId, 'video_local');

    shinevv.joinRoom(
        roomId,
        true,
        function(){
          console.log('joinRoom onSuccess');
        },
        function(reason){
          console.log('joinRoom onFail reason = %s',reason);

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

          shinevv.setVideoLabel(remote_memberId,'video_remote');
        },
        function(remote_memberId, displayName){
          console.log('joinRoom onMemberLeft remote_memberId = %s, displayName = %s',remote_memberId, displayName);
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
}
