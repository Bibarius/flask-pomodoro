$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

var tasks_obj = {
    to_do: [],
    delete: [],
}


document.getElementsByClassName('btn-success')[0].addEventListener('click', function (event) {
    tasks = document.getElementsByClassName('form-check-label');
    array = Array.prototype.slice.call(tasks)
    array.forEach(function (item) {
        if (item.classList.contains('crossed')) {
            if (item.id) {
                tasks_obj['delete'].push(item.id)
            }

        }
        else {
            if (!item.id) {
                tasks_obj['to_do'].push(item.innerHTML)
                console.log('добавляем');
            }
        }
    })

    console.log(tasks_obj)
})




document.getElementById("inputTask").addEventListener('keydown', function (event) {
    if (event.keyCode == "13" && event.target.value != "") {

        var li = document.createElement("li");
        var div = document.createElement("div")
        var checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.setAttribute("onchange", "done(event)")
        var label = document.createElement("label")
        li.classList.add('list-group-item')
        div.classList.add('form-check')
        checkbox.classList.add('form-check-input')
        label.classList.add('form-check-label')
        label.innerHTML = event.target.value
        div.appendChild(checkbox)
        div.appendChild(label)
        li.appendChild(div)
        event.target.value = ""
        document.getElementById("todo").appendChild(li)
    };
})



function done(event) {
    var li = document.createElement("li");
    var div = document.createElement("div")
    var checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.setAttribute("onchange", "undone(event)")
    checkbox.checked = true
    var label = document.createElement("label")
    li.classList.add('list-group-item')
    div.classList.add('form-check')
    checkbox.classList.add('form-check-input')
    label.classList.add('form-check-label')
    label.classList.add('crossed')
    label.innerHTML = event.target.parentElement.children[1].innerHTML
    if (event.target.parentElement.children[1].id) {
        label.id = event.target.parentElement.children[1].id
    }
    div.appendChild(checkbox)
    div.appendChild(label)
    li.appendChild(div)
    event.target.parentElement.parentElement.remove()
    document.getElementById("done").appendChild(li)

    refresh_listeners()
}

function undone(event) {

    var li = document.createElement("li")
    var div = document.createElement("div")
    var checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = false
    checkbox.setAttribute("onchange", "done(event)")
    var label = document.createElement("label")
    li.classList.add('list-group-item')
    div.classList.add('form-check')
    checkbox.classList.add('form-check-input')
    label.classList.add('form-check-label')
    label.innerHTML = event.target.parentElement.children[1].innerHTML
    if (event.target.parentElement.children[1].id) {
        label.id = event.target.parentElement.children[1].id
    }
    div.appendChild(checkbox)
    div.appendChild(label)
    li.appendChild(div)
    document.getElementById("todo").appendChild(li)

    refresh_listeners()

    event.target.parentElement.parentElement.remove()

}



function refresh_listeners() {
    checkboxes = document.getElementsByClassName('form-check-input')
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function (event) {

        })

    }
    console.log(checkboxes)
}

window.onload = function () {
    refresh_listeners()
}
