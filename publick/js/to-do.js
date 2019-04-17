const bgcolorlist = ['red', 'pinck', 'blue', 'lightBlue', 'yellow'];
const items = [];
const userId = localStorage.getItem('user.id');
const min = -100000;
const max = 250000;
const myRandomValue = min + (max - min) * Math.random()
let i = myRandomValue

$(document).ready(() => {
  $.ajax({
      url: 'to-do/all',
      type: 'GET',
    })
    .then((value) => {
      value.forEach((item) => {
        items.splice(0, items.length);
        items.push({
          'title': item.title,
          'color': item.color,
          'userId': item.userId,
          'number': value.length,
          'id': item.id
        });
        itemsMap();
        itemsEdit();
        itemsDelete();
        allItemsDelete();
      })
    }).catch((err) => {
      console.log('err', err)
    })
});
$('#Add').off('click').on('click', () => {
  const randB = Math.floor(Math.random() * bgcolorlist.length);
  const inputValue = $('input[name=text]').val();
  if (inputValue) {
    items.splice(0, items.length);
    items.push({
      'title': inputValue,
      'id': i,
      'color': bgcolorlist[randB],
      'userId': userId
    });
    const data = items[0]
    $.ajax({
        url: 'to-do',
        type: 'POST',
        datatype: 'application/json; charset=utf-8',
        data
      })
      .then(() => {
        window.setTimeout("location = ''", 10)
      }).catch((err) => {
        console.log('err', err)
      })
    $("#text").val('');
  } else {
    alert("Input field is empty")
  }
})
const itemsMap = () => {
  items.map((item) => {
    $('ol').append(`<li id="${item.id}" class=${item.color}><input type="checkbox" class="checkbox" id="checkId_${item.id}"/>${item.title}<button class="check btn btn-outline-danger" id="checkBtn_${item.id}" ><i class="fa fa-trash-o" aria-hidden="true"></i></button><button class="edit btn btn-outline-success" id="editBtn_${item.id}"><i class="fa fa-pencil"></i></button></li>`);
  });
}
const itemsEdit = () => {
  $(".checkbox").off('click').on('click', (e) => {
    const currentId = $(e.currentTarget).attr('id').replace('checkId_', '');
    $('.change-color').off('click').on('click', (a) => {
      const currentColor = $(a.currentTarget).attr('id');
      items.map((item) => {
        item.id = currentId
        item.color = currentColor
      }) 
      { const data = items[0]
        $.ajax({
          url: 'to-do',
          type: 'PATCH',
          datatype: 'application/json; charset=utf-8',
          data
        }).then(() => {
          window.setTimeout("location = ''", 10)
        }).catch((err) => {
          console.log('err', err)
        })
      };
    })
  });
}
const itemsDelete = () => {
  $(".check").off('click').on('click', (c) => {
    const currentId = $(c.currentTarget).attr('id').replace('checkBtn_', '');
    items.map((item) => {
      item.id = currentId
    }) 
    { const data = items[0]
      $.ajax({
        url: 'to-do/remove',
        type: 'PUT',
        datatype: 'application/json; charset=utf-8',
        data
      }).then(() => {
        window.setTimeout("location = ''", 10)
      }).catch((err) => {
        console.log('err', err)
      })
    };
  });
}
const allItemsDelete = () => {
  $(".dlt").off('click').on('click', (c) => {
    {
      $.ajax({
        url: 'to-do/remove',
        type: 'PUT',
        datatype: 'application/json; charset=utf-8'
      }).then(() => {
        window.setTimeout("location = ''", 10)
      }).catch((err) => {
        console.log('err', err)
      })
    };
  });
}