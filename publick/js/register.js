$('.registration-button').off('click').on('click', () => {
  const data = {}
  $('.object1').serializeArray().forEach((el) => {
    data[el.name] = el.value;
  });
  $.ajax({
    url: '/api/auth/register',
    type: 'POST',
    datatype: 'json',
    data
  }).then(() => {
    window.location = ('login')
  }).catch(() => {
    window.location = 'register'
  })
})