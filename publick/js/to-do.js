const bgcolorlist = ['red', 'pinck', 'blue', 'lightBlue', 'yellow'];
const items = [];
let i = 0;
const userId = localStorage.getItem('user.id')


$(document).ready(function () {
    $.ajax({
            url: 'toDo',
            type: 'PATCH',
        })
        .then((value) => {
            console.log('todo', value)
            // value.splice(0,items.leght)
            // console.log('todos', value)
            value.forEach(function (item) {


                items.splice(0, items.length);
                items.push({
                    'title': item.title,
                    'id': item.id,
                    'color': item.color,
                    'userId': item.userId
                });
                itemsMap();

            })

        }).catch(() => {

        })
});

$('#Add').click(function () {
    const randB = Math.floor(Math.random() * bgcolorlist.length);
    const inputValue = $('input[name=text]').val();
    if (inputValue != 0) {
        items.splice(0, items.length);
        items.push({
            'title': inputValue,
            'id': i,
            'color': bgcolorlist[randB],
            'userId': userId
        });
        i++
        const data = items[0]
        $.ajax({
                url: 'toDo',
                type: 'POST',
                datatype: 'application/json; charset=utf-8',
                data
            })
            .then(() => {
                $('ol').empty();
                // itemsMap();
                // itemsEdit();
            }).catch(() => {

            })
        $("#text").val('');;
    } else {
        alert("Input field is empty")
    }
})
const itemsMap = () => {
    items.map((item) => {
        $('ol').append('<li id="' + item.id + '" class="' + item.color + '" >' + '<input type="checkbox" class="checkbox" id="checkId_' + item.id + '"/>' + item.title + '</li>');
    });
}
const itemsEdit = () => {
    $(function () {
        $(".checkbox").on("click", function (e) {
            const currentId = $(e.currentTarget).attr('id').replace('checkId_', '');
            if ($(this).is(":checked")) {
                $('.change-color').on("click", function (a) {
                    const currentColor = $(a.currentTarget).attr('id');
                    items.map((item) => {
                        if (item.id == currentId) {
                            item.color = currentColor
                        }
                    }) 
                    {
                        $('.checkbox:checked').parent().removeClass().addClass(currentColor);
                    };
                })
            };
        });
    })
}