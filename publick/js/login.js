$('.login-button').off('click').on('click', () => {
    const data = {}
    $('#form').serializeArray().forEach((el)=>{
        data[el.name]= el.value;
    });

    $.ajax({
        url:'/api/auth/login',
        type: 'POST',
        data
    })
    .then(() => {
        

        window.location = '../toDo'
    }).catch(() => {
        window.location = 'login'
    })
    
})

