# Brief Api-Mairie

This API was developed with [NodeJs](https://nodejs.org/en/) [Express](http://expressjs.com/) [MongoDB](https://www.mongodb.com/)

## API Reference

https://floating-refuge-19511.herokuapp.com/

### Register a new user

```http
  POST /api/v1/auth/register
```

#### JSON

| Parameter   | Type     | Description                                      |
| :---------- | :------- | :----------------------------------------------- |
| `lastName`  | `string` | **Required**. Example : `Doe`                    |
| `firstName` | `string` | **Required**. Example : `John`                   |
| `email`     | `string` | **Required**. Example : `john.doe.pro@gmail.com` |
| `password`  | `string` | **Required**. Example : `123456`                 |

##### Response ( JSON )

```http
  Status: 201 CREATED
```

```json
{
	"_id": "61c58b03ed93f821157262c1",
	"lastName": "Doe",
	"firstName": "John",
	"email": "john.doe.pro@gmail.com",
	"password": "$2b$10$7Uzv8loWxNABeOWsGJRRJ.GhXC02rpuNt7qarpVyqtMuxUKSiKGNi",
	"role": "61c18b4239y4d66c327e6t2a",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z",
	"__v": 0
}
```

### Login a user

```http
  POST /api/v1/auth/login
```

#### JSON

| Parameter  | Type     | Description                                      |
| :--------- | :------- | :----------------------------------------------- |
| `email`    | `string` | **Required**. Example : `john.doe.pro@gmail.com` |
| `password` | `string` | **Required**. Example : `123456`                 |

##### Response ( Text who contains token auth)

```http
  Status: 200 OK
```

```txt
eyJhbGIUzI1NiIsInF5cC6IkpXVCB9.eyJfaWQiOiI2MWOGI2ZDM5ZjRkOdzk3ZTZhMzMiLCJpYXQiOjE2NDAzMzY4NzYsImV4cCI6MTY0MDU5NjA3Nn0.AbmdI74mT_Pn2oP3LbLkWETacluZGLs
```

### Logout **Authentication required**

```http
  GET /api/v1/auth/logout
```

##### Response ( String )

```http
  Status: 200 OK
```

```txt
Sign out success
```

### Fetch All Users **Authentication required and to be admin**

```http
  GET /api/v1/users
```

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
[
	{
		"_id": "61c58b03ed93f821157262c1",
		"lastName": "Doe",
		"firstName": "John",
		"email": "john.doe.pro@gmail.com",
		"role": "61c18b4239y4d66c327e6t2a",
		"createdAt": "2021-12-24T09:04:03.973Z",
		"updatedAt": "2021-12-24T09:04:03.973Z"
	}
]
```

### Get single user **Authentication required and to be admin**

```http
  GET /api/v1/users/61c58b03ed93f821157262c1
```

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
{
	"_id": "61c58b03ed93f821157262c1",
	"lastName": "Doe",
	"firstName": "John",
	"email": "john.doe.pro@gmail.com",
	"role": "61c18b4239y4d66c327e6t2a",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z"
}
```

### Update a user **Authentication required**

```http
  PUT /api/v1/users/61c58b03ed93f821157262c1
```

#### JSON (If no parameter(s) sent, then nothing will happen, but a response will always be return)

| Parameter   | Type     | Description                                        |
| :---------- | :------- | :------------------------------------------------- |
| `lastName`  | `string` | **Optional**. Example : `Doe`                      |
| `firstName` | `string` | **Optional**. Example : `John`                     |
| `email`     | `string` | **Optional**. Example : `john.doe.pro@gmail.com`   |
| `password`  | `string` | **Optional**. Example : `123456`                   |
| `role`      | `string` | **Optional**. Example : `61c18b4239y4d66c327e6t2a` |

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
{
	"_id": "61c58b03ed93f821157262c1",
	"lastName": "Doe",
	"firstName": "John",
	"email": "john.doe.pro@gmail.com",
	"role": "61c18b4239y4d66c327e6t2a",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z"
}
```

### Remove a user **Authentication required**

```http
  DELETE /api/v1/users/61c58b03ed93f821157262c1
```

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
{
	"_id": "61c58b03ed93f821157262c1",
	"lastName": "Doe",
	"firstName": "John",
	"email": "john.doe.pro@gmail.com",
	"role": "61c18b4239y4d66c327e6t2a",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z"
}
```

### Fetch All Roles **Authentication required and to be admin**

```http
  GET /api/v1/roles
```

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
[
	{
		"_id": "61c58b03ed93f821157262c1",
		"lastName": "Doe",
		"firstName": "John",
		"email": "john.doe.pro@gmail.com",
		"role": "61c18b4239y4d66c327e6t2a",
		"createdAt": "2021-12-24T09:04:03.973Z",
		"updatedAt": "2021-12-24T09:04:03.973Z"
	}
]
```

### Create a new role **Authentication required and to be admin**

```http
  POST /api/v1/roles
```

#### JSON (Prefix `ROLE_` is **required**)

| Parameter | Type     | Description                                                 |
| :-------- | :------- | :---------------------------------------------------------- |
| `name`    | `string` | **Required & Uppercase required**. Example : `ROLE_EXAMPLE` |

##### Response ( Text who contains token auth)

```http
  Status: 201 CREATED
```

```json
{
	"_id": "61c18b4239y4d66c327e6t2a",
	"name": "ROLE_EXAMPLE",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z",
	"__v": 0
}
```

### Update a role **Authentication required and to be admin**

```http
  PUT /api/v1/roles/61c18b4239y4d66c327e6t2a
```

#### JSON (Prefix `ROLE_` is **required**)

| Parameter | Type     | Description                                                 |
| :-------- | :------- | :---------------------------------------------------------- |
| `name`    | `string` | **Required & Uppercase required**. Example : `ROLE_EXAMPLE` |

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
{
	"_id": "61c18b4239y4d66c327e6t2a",
	"name": "ROLE_UPDATED",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z",
	"__v": 0
}
```

### Remove a role **Authentication required and to be admin**

```http
  DELETE /api/v1/roles/61c18b4239y4d66c327e6t2a
```

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
{
	"_id": "61c18b4239y4d66c327e6t2a",
	"name": "ROLE_EXAMPLE",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z",
	"__v": 0
}
```

### Get single role **Authentication required and to be admin**

```http
  GET /api/v1/users/61c18b4239y4d66c327e6t2a
```

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
{
	"_id": "61c18b4239y4d66c327e6t2a",
	"name": "ROLE_EXAMPLE",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z"
}
```

### Fetch All Category of Reports **Authentication required**

```http
  GET /api/v1/reports/category
```

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
[
	{
		"_id": "61c48c7c39f4d88c397e6a6f",
		"name": "category1",
		"role": "61c18b4239y4d66c327e6t2a",
		"createdAt": "2021-12-24T09:04:03.973Z",
		"updatedAt": "2021-12-24T09:04:03.973Z"
	},
	{
		"_id": "61c48c8739f4d88c397e6a69",
		"name": "category2",
		"role": "61c18b4239y4d66c327e6t2a",
		"createdAt": "2021-12-24T09:04:03.973Z",
		"updatedAt": "2021-12-24T09:04:03.973Z"
	}
]
```

### Get single category of reports **Authentication required**

```http
  GET /api/v1/reports/category/61c48c7c39f4d88c397e6a6f
```

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
{
	"_id": "61c48c7c39f4d88c397e6a6f",
	"name": "category1",
	"role": "61c18b4239y4d66c327e6t2a",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z"
}
```

### Create a new category of reports **Authentication required**

```http
  POST /api/v1/reports/category
```

#### JSON

| Parameter | Type     | Description                                        |
| :-------- | :------- | :------------------------------------------------- |
| `name`    | `string` | **Required**. Example : `highway`                  |
| `role`    | `string` | **Required**. Example : `61c18b4239y4d66c327e6t2a` |

##### Response ( JSON )

```http
  Status: 201 CREATED
```

```json
{
	"_id": "61c48c8e39f4d88c397e6a69",
	"name": "category1",
	"role": "61c18b4239y4d66c327e6t2a",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z",
	"__v": 0
}
```

### Update a category of reports **Authentication required**

```http
  PUT /api/v1/reports/category/61c48c8e39f4d88c397e6a69
```

#### JSON

| Parameter | Type     | Description                                        |
| :-------- | :------- | :------------------------------------------------- |
| `name`    | `string` | **Required**. Example : `highway`                  |
| `role`    | `string` | **Required**. Example : `61c18b4239y4d66c327e6t2a` |

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
{
	"_id": "61c48c8e39f4d88c397e6a69",
	"name": "category1",
	"role": "61c18b4239y4d66c327e6t2a",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z",
	"__v": 0
}
```

### Remove a category of reports **Authentication required**

```http
  DELETE /api/v1/reports/category/61c48c8e39f4d88c397e6a69
```

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
{
	"_id": "61c48c8e39f4d88c397e6a69",
	"name": "category1",
	"role": "61c18b4239y4d66c327e6t2a",
	"createdAt": "2021-12-24T09:04:03.973Z",
	"updatedAt": "2021-12-24T09:04:03.973Z",
	"__v": 0
}
```

### Post a new report **Authentication required**

```http
  POST /api/v1/reports
```

#### Multipart/Form-Data Parameter

| Parameter         | Type     | Description                                                                         |
| :---------------- | :------- | :---------------------------------------------------------------------------------- |
| `typeReport`      | `string` | **Required**. Value accepted : `highways, parking, works, animals, other`           |
| `descReport`      | `string` | **Required**. Example : `Renault Kadjar White model vehicle in awkward parking lot` |
| `dateReport`      | `string` | **Required**. Example : `1991-09-24`                                                |
| `timeReport`      | `string` | **Required**. Example : `16:20`                                                     |
| `addressReport`   | `string` | **Required**. Example : `Rue des Prés, 75001 Paris` OR `Rue des Prés, Paris, 75001` |
| `picture`         | `file`   | **Optional**. Extension accepted : `.jpg, .jpeg, .png`                              |
| `lastNameSender`  | `string` | **Required**. Example : `Dupont`                                                    |
| `firstNameSender` | `string` | **Required**. Example : `John`                                                      |
| `emailSender`     | `string` | **Required**. Example : `dupont.john@gmail.com`                                     |
| `addressSender`   | `string` | **Required**. Example : `33 Blvd du Général Leclerc`                                |
| `citySender`      | `string` | **Required**. Example : `Roubaix`                                                   |
| `postalSender`    | `string` | **Required**. Example : `59100`                                                     |
| `phoneSender`     | `string` | **Required**. Example : `0655555555` OR `06.55.55.55.55`                            |

##### Response ( JSON )

```http
  Status: 201 CREATED
```

```json
{
	"report": "61c48daa39f4d88c397e6a49",
	"mail": "<8974cad1-11w4-df3c-3209-8dbt21e64cf9@outlook.com>"
}
```

### Remove a report **Authentication required**

```http
  DELETE /api/v1/reports/61c48daa39f4d88c397e6a49
```

##### Response ( JSON )

```http
  Status: 200 OK
```

```json
{
	"report": "61c48daa39f4d88c397e6a49",
	"image_deleted": "ok"
}
```

## Project Structure

```txt
└── Brief--ApiMairie
	├── config
	│	├── db.js
	│	└── init.js
	├── controllers
	│	├── authController.js
	│	├── reportCategoryController.js
	│	├── reportController.js
	│	├── roleController.js
	│	└── userController.js
	├── middleware
	│	├── authMiddleware.js
	│	├── checkBodyReport.js
	│	├── checkBodyReportCategory.js
	│	├── checkBodyRole.js
	│	├── checkBodySignUp.js
	│	├── cloudinary.js
	│	├── index.js
	│	├── isAdmin.js
	│	└── isAuthenticated.js
	├── models
	│	├── categoryReportModel.js
	│	├── reportModel.js
	│	├── roleModel.js
	│	└── userModel.js
	├── node_modules
	├── routes
	│	├── authRoutes.js
	│	├── reportRoutes.js
	│	├── roleRoutes.js
	│	└── userRoutes.js
	├── utils
	│	├── isValid.js
	│	├── multer.js
	│	└── sendEmail.js
	├── .env
	├── .env.example
	├── .gitignore
	├── package-lock.json
	├── package.json
	├── Procfile
	├── README.md
	└── server.js
```

## Tech Stack

**Client:** Work in progress

**Server:** [NodeJs](https://nodejs.org/en/), [Express](http://expressjs.com/), [MongoDB](https://www.mongodb.com/)