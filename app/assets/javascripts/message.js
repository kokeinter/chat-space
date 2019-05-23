$(function(){
  function buildHTML(message){
      //data-idが反映されるようにしている
    if(message.image.url){
      var msg_url = '<img src="' + message.image.url + '" class="main-msgs__a-msg__image" >'
    }else{
      var msg_url = ""
    };
      var html = '<div class="main-msgs__box" data-id=' + message.id + '>' +
          '<div class="main-msgs__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="main-msgs__msg-time">' +
            message.created_at +
          '</div>' +
          '<div class="main-msgs__a-msg">' +
            '<p class="lower-message__content">' +
              message.content +
            '</p>' +
            msg_url +
          '</div>'
      '</div>'
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-msgs').append(html);
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled',false);
      $('html, body').animate({
        scrollTop: $(document).height()
      },1500);
    })
    .fail(function(){
      alert('error');
      $('.form__submit').prop('disabled',false);
    });
  });
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.main-msgs__box:last').data('id');
    console.log(last_message_id)
    var url =location.href
    url = url.replace("/messages","/api/messages")
    console.log(url)
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: url,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message){
        //メッセージが入ったHTMLを取得
        var html = buildHTML(message);
        //メッセージを追加
        $('.main-msgs').append(html);
        $('html, body').animate({
          scrollTop: $(document).height()
        },1500);
      });
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});