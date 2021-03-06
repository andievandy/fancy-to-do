# fancy-to-do
A simple to-do app created in node.js, express, postgres. It has following features:

- RESTful endpoint to do CRUD actions on to-do item and returns JSON formatted response.
- User system, separate to-dos by user
- Stateless authentication using JSONWebToken
- Uses [Bored API](https://www.boredapi.com/) to add new random activity to to-do list
- Uses Google Sign-In for Websites to log in with Google Account

The client is a Single Page App created in HTML, CSS, and JavaScript using Materialize and jQuery

# Available REST Endpoints
- [POST /register](#post-register)
- [POST /login](#post-login)
- [GET /todos](#get-todos)
- [GET /todos/[id]](#get-todosid)
- [POST /todos](#post-todos)
- [PUT /todos/[id]](#put-todosid)
- [DELETE /todos[id]](#delete-todosid)

## POST /register

Registers a new account

### Request Header
```
{
	"Content-Type": "application/json"
}
```

### Request Body

```json
{
	"email": "email@example.com",
	"password": "passwordhere"
}
```

### Responses

#### 201 CREATED

```json
{
    "id": 9,
    "email": "me@localhost.com",
    "password": "test"
}
```

#### 400 BAD REQUEST

Happens when the validation doesn't pass or the e-mail has been registered

```json
{
    "errors": [
        "This E-mail has been registered."
    ]
}
```

```json
{
    "errors": [
        "password is required.",
        "email is required.",
        "email is not valid."
    ]
}
```

## POST /login

Logs in to an account to access to-do item

### Request Header
```
{
	"Content-Type": "application/json"
}
```

### Request Body

```json
{
	"email": "email@example.com",
	"password": "passwordhere"
}
```

### Responses

#### 201 CREATED

Returns an access token that you can use to access the to-do item

```json
{
    "accessToken": "[ACCESS TOKEN HERE]"
}
```

#### 400 BAD REQUEST

Happens when the password or e-mail entered is not valid

```json
{
    "errors": "Invalid Username/Password"
}
```

## GET /todos

Get the list of all to-dos created by logged in user

### Request Header
```
{
	"accessToken": "ACCESS TOKEN HERE"
}
```

### Response

#### 200 OK

```json
[
    {
        "id": 1,
        "title": "Todo 1",
        "description": "Todo List 1",
        "status": "uncompleted",
        "due_date": "2020-04-10T17:00:00.000Z"
    },
    {
        "id": 2,
        "title": "Todo 2",
        "description": "Todo List 2",
        "status": "uncompleted",
        "due_date": "2020-04-14T17:00:00.000Z"
    },
    {
        "id": 3,
        "title": "Todo 3",
        "description": "Todo List 3",
        "status": "completed",
        "due_date": "2020-04-18T17:00:00.000Z"
    }
]
```

#### 401 UNAUTHORIZED

Happens if you haven't set "accessToken" request header or the token is invalid

```json
{
    "errors": "Invalid or missing token"
}
```

## GET /todos/[id]

Get the specific to-do item. Only can access todo item created by logged in user.

### Parameters
| Name |     Description      |
| :--: | :------------------: |
|  id  | ID of the to-do item |

### Request Header
```
{
	"accessToken": "ACCESS TOKEN HERE"
}
```

### Responses

#### 200 OK

Returns data of the to-dos

```json
{
    "id": 1,
    "title": "Todo 1",
    "description": "Todo List 1",
    "status": "uncompleted",
    "due_date": "2020-04-10T17:00:00.000Z"
}
```

#### 401 UNAUTHORIZED

Happens if you haven't set "accessToken" request header or the token is invalid

```json
{
    "errors": "Invalid or missing token"
}
```

#### 403 FORBIDDEN

Happens if you access other user to-do item

```json
{
    "errors": "You are not authorized to access this item"
}
```

#### 404 NOT FOUND

```json
{
    "errors": "Todo not found"
}
```

## POST /todos

Add new to-do item

### Request Header
```
{
	"Content-Type": "application/json",
	"accessToken": "ACCESS TOKEN HERE"
}
```

### Request Body

```json
{
	"title": "Todo Title",
	"description": "Descriptions here",
	"status": "uncompleted",
	"due_date": "2020-01-01"
}
```

### Responses

#### 201 CREATED

Returns data of the created to-do item

```json
{
    "id": 7,
    "title": "Todo Title",
    "description": "Descriptions here",
    "status": "uncompleted",
    "due_date": "2020-01-01T00:00:00.000Z"
}
```

#### 400 BAD REQUEST

Usually returns validation errors

```json
{
    "errors": [
        "title is empty",
        "description is empty",
        "status is empty",
        "due_date is empty",
        "due_date must be in date format: YYYY-MM-DD"
    ]
}
```

#### 401 UNAUTHORIZED

Happens if you haven't set "accessToken" request header or the token is invalid

```json
{
    "errors": "Invalid or missing token"
}
```

## POST /todos/random

Add new to-do item with random activity

### Request Header (Optional)

```
{
	"Content-Type": "application/json"
}
```

### Request Body (Optional)

If omitted, the due date will be calculated by how accessible/possible the activity is ranged from 3 to 30 days

```json
{
	"due_date": "2020-01-01"
}
```

### Responses

#### 201 CREATED

Returns data of the created to-do item

```json
{
    "id": 15,
    "title": "Random activity #4708863",
    "description": "Listen to a new music genre",
    "status": "uncompleted",
    "due_date": "2020-04-03T13:49:10.974Z"
}
```

#### 400 BAD REQUEST

Usually returns validation errors

```json
{
    "errors": [
        "due_date must be in date format: YYYY-MM-DD"
    ]
}
```

#### 401 UNAUTHORIZED

Happens if you haven't set "accessToken" request header or the token is invalid

```json
{
    "errors": "Invalid or missing token"
}
```

## PUT /todos/[id]

Edit specific to-do item. Only can access todo item created by logged in user.

### Parameters
| Name |     Description      |
| :--: | :------------------: |
|  id  | ID of the to-do item |

### Request Header
```
{
	"Content-Type": "application/json",
	"accessToken": "ACCESS TOKEN HERE"
}
```

### Request Body

```json
{
	"title": "Todo Title",
	"description": "Descriptions here",
	"status": "uncompleted",
	"due_date": "2020-01-01"
}
```

### Responses

#### 200 OK

Returns updated data of the edited to-do item

```json
{
    "id": 7,
    "title": "Todo Title",
    "description": "Descriptions here",
    "status": "uncompleted",
    "due_date": "2020-01-01T00:00:00.000Z"
}
```

#### 400 BAD REQUEST

Usually returns validation errors

```json
{
    "errors": [
        "title is empty",
        "description is empty",
        "status is empty",
        "due_date is empty",
        "due_date must be in date format: YYYY-MM-DD"
    ]
}
```

#### 401 UNAUTHORIZED

Happens if you haven't set "accessToken" request header or the token is invalid

```json
{
    "errors": "Invalid or missing token"
}
```

#### 403 FORBIDDEN

Happens if you access other user to-do item

```json
{
    "errors": "You are not authorized to access this item"
}
```

#### 404 NOT FOUND

```json
{
    "errors": "Todo not found"
}
```

## DELETE /todos/[id]

Delete specific to-do item. Only can access todo item created by logged in user.

### Parameters
| Name |     Description      |
| :--: | :------------------: |
|  id  | ID of the to-do item |

### Request Header
```
{
	"accessToken": "ACCESS TOKEN HERE"
}
```

### Responses

#### 200 OK

Returns data of the deleted to-do item

```json
{
    "id": 7,
    "title": "Todo Title",
    "description": "Descriptions here",
    "status": "uncompleted",
    "due_date": "2020-01-01T00:00:00.000Z"
}
```

#### 401 UNAUTHORIZED

Happens if you haven't set "accessToken" request header or the token is invalid

```json
{
    "errors": "Invalid or missing token"
}
```

#### 403 FORBIDDEN

Happens if you access other user to-do item

```json
{
    "errors": "You are not authorized to access this item"
}
```

#### 404 NOT FOUND

```json
{
    "errors": "Todo not found"
}
```

