let selectedTodoId = null;
let inputEditMode = false;

$(document).ready(function() {
    checkLoginState();
    getTodoList();
    $('.sidenav').sidenav();
    $('.datepicker').datepicker();
    $('.modal').modal();
    $('.fixed-action-btn').floatingActionButton();
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
    $.ajax({
        url: `http://localhost:3000/todos/${todoId}`,
        method: 'GET',
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    }).done(function(data) {
        selectedTodoId = todoId;
        inputEditMode = true;
        $('#inputTodoTitle').val(data.title);
        $('#inputTodoDescription').val(data.description);
        $('#inputTodoStatus').val(data.status);
        let dueDate = M.Datepicker.getInstance($('#inputTodoDueDate'));
        dueDate.setDate(new Date(data.due_date));
        $('#inputTodoDueDate').val(dueDate.toString());
        M.updateTextFields();
        showSection('todoinput');
    }).fail(function(err) {
        showMessage(`Get Todo List failed: ${err.responseJSON.errors}`);
    });
});

$('#btnAddTodo').click(function() {
    inputEditMode = false;
    showSection('todoinput');
});

$('#todoInputForm').submit(function(e) {
    e.preventDefault();
    let title = $('#inputTodoTitle').val();
    let description = $('#inputTodoDescription').val();
    let status = $('#inputTodoStatus').val();
    let due_date = $('#inputTodoDueDate').val();
    if(inputEditMode === true) {
        $.ajax({
            url: `http://localhost:3000/todos/${selectedTodoId}`,
            method: 'PUT',
            headers: {
                accessToken: localStorage.getItem('accessToken')
            },
            data: {
                title,
                description,
                status,
                due_date
            }
        }).done(function() {
            getTodoList();
            showSection('todolist');
            showMessage('Edit to-do successful');
        }).fail(function(data) {
            showMessage(`Edit to-do failed: ${data.responseJSON.errors}`);
        });
    } else {
        $.ajax({
            url: `http://localhost:3000/todos`,
            method: 'POST',
            headers: {
                accessToken: localStorage.getItem('accessToken')
            },
            data: {
                title,
                description,
                status,
                due_date
            }
        }).done(function() {
            getTodoList();
            showSection('todolist');
            showMessage('Add to-do successful');
        }).fail(function(data) {
            showMessage(`Add to-do failed: ${data.responseJSON.errors}`);
        });
    }
});

$(document).on('click', '.btnTodoDelete', function(e) {
    e.preventDefault();
    selectedTodoId = $(this).parent().parent().data('id');
    M.Modal.getInstance($('#modalDelete')).open();
});

$('#modalDeleteYes').click(function(e) {
    e.preventDefault();
    M.Modal.getInstance($('#modalDelete')).close();
    $.ajax({
        url: `http://localhost:3000/todos/${selectedTodoId}`,
        method: 'DELETE',
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    }).done(function() {
        getTodoList();
        showMessage(`Delete to-do successful`);
    }).fail(function(err) {
        showMessage(`Delete to-do failed: ${err.responseJSON.errors}`);
    });
});

$('#modalDeleteNo').click(function(e) {
    e.preventDefault();
    M.Modal.getInstance($('#modalDelete')).close();
});

$('#btnTodoInputCancel').click(function(e) {
    e.preventDefault();
    resetTodoInputForm();
    showSection('todolist');
});

function resetTodoInputForm() {
    $('#inputTodoTitle').val('');
    $('#inputTodoDescription').val('');
    $('#inputTodoStatus').val('');
    $('#inputTodoDueDate').val('');
    M.updateTextFields();
    selectedTodoId = null;
    inputEditMode = false;
}

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
            data.forEach((todo, i) => {
                let date = new Date(todo.due_date);
                let $html = $(`
                        <div class="card todo-item scale-transition scale-out" data-id="${todo.id}">
                            <div class="card-content">
                                <span class="card-title">${todo.title}</span>
                                <p>${todo.description}</p>
                                <div class="card-info">
                                    <div class=" grey-text text-darken-1">
                                        ${todo.status}
                                    </div>
                                    <div class="valign-wrapper grey-text">
                                        <i class="material-icons">today</i>${date.toDateString()}
                                    </div>
                                </div>
                            </div>
                            <div class="card-action">
                                <a href="#" class="btnTodoEdit">Edit</a>
                                <a href="#" class="btnTodoDelete">Delete</a>
                            </div>
                        </div>
                `);
                $('#todoList').append($html);
                setTimeout(function (target) {
                    target.removeClass('scale-out');
                }, (i * 100), $html);
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
        $('.fixed-action-btn').show();
    } else {
        showSection('login');
        $('.navRegister').show();
        $('.navLogin').show();
        $('.navLogout').hide();
        $('.fixed-action-btn').hide();
    }
}

function showSection(page) {
    $('#sectionLogin').hide();
    $('#sectionRegister').hide();
    $('#sectionTodoList').hide();
    $('#sectionTodoInput').hide();
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
        case 'todoinput':
            if(inputEditMode === true) {
                $('#sectionTodoInput > h1').text('Edit Todo');
            } else {
                $('#sectionTodoInput > h1').text('Add Todo');
            }
            $('#sectionTodoInput').show();
            break;
    }
}

function showMessage(str) {
    M.toast({html: str});
}