function valid (form) {
    var email = form.email.value;
    var password = form.password.value;
    var anypassword = form.anypassword.value;
    var usersEmail = ["123@gmail.com", "var@gmail.com", "for@gmail.com"];
    if (password !== anypassword)
        alert('enter password again');
    (emailGet.indexOf(email) >= 0)? alert('this user already exists'):console.log(email, password, anypassword);
}

$('.login-button').off('click').on('click', () => {
    const data = {}
    $('#form').serializeArray().forEach((el)=>{
        data[el.name]= el.value;
    });

    $.ajax({
        url:'/login',
        type: 'POST',
        data
    }).catch(()=>{
        alert('Something wrong')
    }).done(()=>{

        window.location = 'to-do'
    })
    
})

