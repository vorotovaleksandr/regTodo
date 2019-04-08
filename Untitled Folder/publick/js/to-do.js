const bgcolorlist = ['red', 'pinck', 'blue', 'lightBlue', 'yellow'];
const items = [];
let i = 0;

$('#Add').click(function () {
    const randB = Math.floor(Math.random() * bgcolorlist.length);
    const inputValue = $('input[name=text]').val();
    const userId1 = $("em").attr("title");
    if(inputValue !=0)
    {items.push({
        'title': inputValue,
        'id': i,
        'color': bgcolorlist[randB],
        'userId2': userId1
    });
    $('ol').empty();
    test();
    console.log(items)
    i++
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
                    { $('.checkbox:checked').parent().removeClass().addClass(currentColor); };
                })
            };
        });

$("#text").val('');
    });
    ;}else {alert("Input field is empty")}
})
const test = () => {
    items.map((item) => {
        $('ol').append('<li id="' + item.id + '" class="' + item.color + '" >' + '<input type="checkbox" class="checkbox" id="checkId_' + item.id + '"/>' + item.title + '</li>');
    });
console.log(items)}
