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

