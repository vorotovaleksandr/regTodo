$('.login-button').off('click').on('click', () => {
  const data = {}
  $('.object').serializeArray().forEach((el) => {
    data[el.name] = el.value;
  });
  $.ajax({
      url: '/api/auth/login',
      type: 'POST',
      datatype: 'json',
      data
    }).then((value) => {
      localStorage.setItem('user.id', value)
      window.location = ("../toDo")
    }).catch(() => {
      window.location = 'login'
    })
})