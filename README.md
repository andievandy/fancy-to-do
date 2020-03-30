# fancy-to-do
A simple to-do API created in node.js, express, postgres.

# Available Endpoints
- [GET /todos](#get-todos)
- [GET /todos/[id]](#get-todosid)
- [POST /todos](#post-todos)
- [PUT /todos/[id]](#put-todosid)
- [DELETE /todos[id]](#delete-todosid)

## GET /todos 

Get the list of all to-dos

### Response
```json
[
    {
        "id": 1,
        "title": "Todo 1",
        "description": "Todo List 1",
        "status": "uncompleted",
        "due_date": "2020-04-10T17:00:00.000Z",
        "createdAt": "2020-03-30T06:27:59.739Z",
        "updatedAt": "2020-03-30T07:48:47.349Z"
    },
    {
        "id": 2,
        "title": "Todo 2",
        "description": "Todo List 2",
        "status": "uncompleted",
        "due_date": "2020-04-14T17:00:00.000Z",
        "createdAt": "2020-03-30T06:28:34.382Z",
        "updatedAt": "2020-03-30T06:28:34.382Z"
    },
    {
        "id": 3,
        "title": "Todo 3",
        "description": "Todo List 3",
        "status": "completed",
        "due_date": "2020-04-18T17:00:00.000Z",
        "createdAt": "2020-03-30T06:45:37.418Z",
        "updatedAt": "2020-03-30T06:45:37.418Z"
    }
]
```

## GET /todos/[id]

Get the specific to-do item

### Parameters
| Name |     Description      |
| :--: | :------------------: |
|  id  | ID of the to-do item |

### Response

Returns data of the to-dos

```json
{
    "id": 1,
    "title": "Todo 1",
    "description": "Todo List 1",
    "status": "uncompleted",
    "due_date": "2020-04-10T17:00:00.000Z",
    "createdAt": "2020-03-30T06:27:59.739Z",
    "updatedAt": "2020-03-30T07:48:47.349Z"
}
```

## POST /todos

Add new to-do item

### Request Header
```
{
	"Content-Type": "application/json"
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

### Response

Returns data of the created to-do item

```json
{
    "id": 7,
    "title": "Todo Title",
    "description": "Descriptions here",
    "status": "uncompleted",
    "due_date": "2020-01-01T00:00:00.000Z",
    "updatedAt": "2020-03-30T08:50:56.721Z",
    "createdAt": "2020-03-30T08:50:56.721Z"
}
```


## PUT /todos/[id]

Edit specific to-do item

### Parameters
| Name |     Description      |
| :--: | :------------------: |
|  id  | ID of the to-do item |

### Request Header
```
{
	"Content-Type": "application/json"
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

### Response

Returns updated data of the edited to-do item

```json
{
    "id": 7,
    "title": "Todo Title",
    "description": "Descriptions here",
    "status": "uncompleted",
    "due_date": "2020-01-01T00:00:00.000Z",
    "updatedAt": "2020-03-30T08:50:56.721Z",
    "createdAt": "2020-03-30T08:50:56.721Z"
}
```

## DELETE /todos/[id]

Delete specific to-do item

### Parameters
| Name |     Description      |
| :--: | :------------------: |
|  id  | ID of the to-do item |

### Response

Returns data of the deleted to-do item

```json
{
    "id": 7,
    "title": "Todo Title",
    "description": "Descriptions here",
    "status": "uncompleted",
    "due_date": "2020-01-01T00:00:00.000Z",
    "updatedAt": "2020-03-30T08:50:56.721Z",
    "createdAt": "2020-03-30T08:50:56.721Z"
}
```
