$(function(){
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                    追加
                  </div>
                </div>`
    return html;
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                   ${ msg }
                  </p>
                </div>`
    return html;
  }

  function appendGroupUser(id,name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>

                  <p class='chat-group-user__name'>
                    ${name}
                  </p>

                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                    削除
                  </div>
                </div>`
    return html;
  }

  $('#user-search-field').on('keyup',function(){
    var input = $("#user-search-field").val();
    var href =  '/users'
    $.ajax({
      type: 'GET',
      url: href,
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if(users.length !== 0){
        users.forEach(function(user){
          var html = appendUser(user);
          $('#user-search-result').append(html)
        });
      }
      else {
        var blankuser = appendErrMsgToHTML("一致するユーザーはいません");
        $('#user-search-result').append(blankuser);
      }
    })
    .fail(function(){
      alert('error');
    })
  });

  $(document).on('click','.chat-group-user__btn--add',function(){
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    var html = appendGroupUser(id,name);
    $('#chat-group-users').append(html);
    $(this).parent().remove();
  });  
  
  $(document).on('click','.user-search-remove',function(){
    $(this).parent().remove();
  });

});
