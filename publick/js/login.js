$('.login-button').off('click').on('click', () => {
    const data = {}
    $('.object').serializeArray().forEach((el)=>{
        data[el.name]= el.value;
    });

    $.ajax({
        url:'/api/auth/login',
        type: 'POST',
        datatype: 'json',
        data
        
    })
    // $.get("../toDo", { Id: value.userId } ).redirect("../toDo")
    .then((value) => {       
        localStorage.setItem('user.id', value.userId )
        localStorage.setItem('Authorization', value.token )
        $.ajax({
            url: "http://localhost:5000/api/toDo",
            type: 'GET',            
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", value.token);
            },
          }); 
        setTimeout(function(){
            window.location = ("../toDo"); }
      , 100);
        
        
    }).catch((value) => {
        window.location = 'login'
    })
    
})

