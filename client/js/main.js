$(document).ready(function() {
    checkLoginState();
});

$('#loginForm').submit(function(e) {
    e.preventDefault();
    let email = $('#loginEmail').val();
    let password = $('#loginPassword').val();
    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
            email,
            password
        }
    }).done(function(data) {
        localStorage.setItem('accessToken', data.accessToken);
        $('#registerEmail').val('');
        $('#registerPassword').val('');
        checkLoginState();
        showMessage('Login successful');
    }).fail(function(data) {
        showMessage(`Login failed: ${data.responseJSON.errors}`);
    });
});

$('#registerForm').submit(function(e) {
    e.preventDefault();
    let email = $('#registerEmail').val();
    let password = $('#registerPassword').val();
    $.ajax({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: {
            email,
            password
        }
    }).done(function(data) {
        $('#registerEmail').val('');
        $('#registerPassword').val('');
        checkLoginState();
        showMessage('Register successful, you can login now');
    }).fail(function(data) {
        showMessage(`Register failed: ${data.responseJSON.errors}`);
    });
});

$('#btnLogout').click(function() {
    localStorage.removeItem('accessToken');
    checkLoginState();
});

$('#btnGetTodoList').click(function() {
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'GET',
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    }).done(function(data) {
        console.log(data);
        data.forEach(todo => {
            $('#todoList').append(`<div class="todo"><b>${todo.title}</b><br>${todo.description}</div>`);
        })
    }).fail(function(data) {
        showMessage(`Get Todo List failed: ${data.responseJSON.errors}`);
    });
});

function checkLoginState(str) {
    if(localStorage.getItem('accessToken')) {
        $('#loginForm').hide();
        $('#registerForm').hide();
        $('#btnLogout').show();
    } else {
        $('#loginForm').show();
        $('#registerForm').show();
        $('#btnLogout').hide();
    }
}

function appendMessage(str) {
    let previousText = $('.message').text();
    $('.message').text(`${previousText}<br>${str}`);
    $('.message').show();
}

function showMessage(str) {
    $('.message').text(str);
    $('.message').show();
}