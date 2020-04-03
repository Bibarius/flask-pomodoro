$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

document.getElementById("inputTask").addEventListener('keydown', function(event){
    if(event.keyCode == "13" && event.target.value != ""){
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
    }   
})


function done(event){
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
    div.appendChild(checkbox)
    div.appendChild(label)
    li.appendChild(div)
    event.target.parentElement.parentElement.remove()
    document.getElementById("done").appendChild(li)
}

function undone(event){
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
    div.appendChild(checkbox)
    div.appendChild(label)
    li.appendChild(div)
    document.getElementById("todo").appendChild(li)
    event.target.parentElement.parentElement.remove()

}