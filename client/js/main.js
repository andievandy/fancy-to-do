$(document).ready(function() {
    checkLoginState();
    getTodoList();
    $('.sidenav').sidenav();
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
        getTodoList();
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

$('.navLogout').click(function() {
    localStorage.removeItem('accessToken');
    $('#todoList').empty();
    checkLoginState();
});

$('#btnGetTodoList').click(function() {
    getTodoList(true);
});

$('.navRegister').click(function() {
    showSection('register');
});

$('.navLogin').click(function() {
    showSection('login');
});

$(document).on('click', '.btnTodoEdit', function(e) {
    let todoId = $(this).parent().parent().data('id');
});

function getTodoList(force = false) {
    if(localStorage.getItem('accessToken') || force) {
        $('#todoList').empty();
        $.ajax({
            url: 'http://localhost:3000/todos',
            method: 'GET',
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).done(function(data) {
            data.forEach(todo => {
                let html = `
                    <div class="col s12 m4">
                        <div class="card todo-item" data-id="${todo.id}">
                            <div class="card-content">
                                <span class="card-title">${todo.title}</span>
                                <p>${todo.description}</p>
                            </div>
                            <div class="card-action">
                                <a href="#" class="btnTodoEdit">Edit</a>
                                <a href="#" class="btnTodoDelete">Delete</a>
                            </div>
                        </div>
                    </div>
                `;
                $('#todoList').append(html);
            })
        }).fail(function(data) {
            showMessage(`Get Todo List failed: ${data.responseJSON.errors}`);
        });
    }
}

function checkLoginState() {
    if(localStorage.getItem('accessToken')) {
        showSection('todolist');
        $('.navRegister').hide();
        $('.navLogin').hide();
        $('.navLogout').show();
    } else {
        showSection('login');
        $('.navRegister').show();
        $('.navLogin').show();
        $('.navLogout').hide();
    }
}

function showSection(page) {
    $('#sectionLogin').hide();
    $('#sectionRegister').hide();
    $('#sectionTodoList').hide();
    switch(page.toLowerCase()) {
        case 'login':
            $('#sectionLogin').show();
            break;
        case 'register':
            $('#sectionRegister').show();
            break;
        case 'todolist':
            $('#sectionTodoList').show();
            break;
    }
}

function showMessage(str) {
    M.toast({html: str});
}