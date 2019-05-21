$(function(){
  function buildHTML(message){
    var html = `<div class="main-msgs__box">
                  <div class="main-msgs__user-name">${message.user_name}</div>
                  <div class="main-msgs__msg-time">${message.created_at}</div>
                  <div class="main-msgs__a-msg">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    <img class="main-msgs__a-msg__image" src="${message.image.url}" onerror='this.style.display = "none"'>
                  </div>
                </div>`
    return html;
  }
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
      $('.form__message').reset();
      $('.form__submit').prop('disabled',false);
      $('html, body').animate({
        scrollTop: $(document).height()
      },1500);
    })
    .fail(function(){
      alert('error');
      $('.form__submit').prop('disabled',false);
    })
  })
});