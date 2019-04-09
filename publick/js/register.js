$('.registration-button').off('click').on('click', () => {
    const data = {}
    $('#form').serializeArray().forEach((el)=>{
        data[el.name]= el.value;
    });

    $.ajax({
        url:'/api/auth/regiser',
        type: 'POST',
        data        
     }).then(() => {
        window.location = 'login'
    }).catch(() => {
        window.location = 'register'        
    })          
})