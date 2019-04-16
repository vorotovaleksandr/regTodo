const bgcolorlist = ['red', 'pinck', 'blue', 'lightBlue', 'yellow'];
const items = [];
let i = 0;
const userId = localStorage.getItem('user.id')

$(document).ready(function () {
    $.ajax({
            url: 'toDo',
            type: 'PUT',
        })
        .then((value) => {
            value.forEach(function (item) {
                items.splice(0, items.length);
                items.push({
                    'title': item.title,
                    'color': item.color,
                    'userId': item.userId,
                    'number': value.length
                });
                itemsMap();
                i++
                itemsEdit();
            })
        }).catch(() => {

        })
});
$('#Add').off('click').on('click', () => {
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
        const data = items[0]
        $.ajax({
                url: 'toDo',
                type: 'POST',
                datatype: 'application/json; charset=utf-8',
                data
            })
            .then(() => {
                window.setTimeout("location = ''", 50)
            }).catch(() => {

            })
        $("#text").val('');
    } else {
        alert("Input field is empty")
    }
})
const itemsMap = () => {
    items.map((item) => {
        $('ol').append('<li id="' + item.id + '" class="' + item.color + '" >' + '<input type="checkbox" class="checkbox" id="checkId_' + i + '"/>' + item.title + '</li>');
    });
}
const itemsEdit = () => {
    $(function () {
        $(".checkbox").off('click').on('click', (e) => {
            const currentId = $(e.currentTarget).attr('id').replace('checkId_', '');
            $('.change-color').off('click').on('click', (a) => {
                const currentColor = $(a.currentTarget).attr('id');

                items.map((item) => {
                    if (item.id = currentId) {
                        item.color = currentColor
                    }
                }) {
                    const data = items[0]
                    $.ajax({
                            url: 'toDo',
                            type: 'PATCH',
                            datatype: 'application/json; charset=utf-8',
                            data
                        })
                        .then(() => {
                            window.setTimeout("location = ''", 50)
                        }).catch(() => {

                        })
                };
            })

        });
    })
}