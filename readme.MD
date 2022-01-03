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
  Status: 201 Created
```

```json
{
	"lastName": "Doe",
	"firstName": "John",
	"email": "john.doe.pro@gmail.com",
	"password": "$2b$10$7Uzv8loWxNABeOWsGJRRJ.GhXC02rpuNt7qarpVyqtMuxUKSiKGNi",
	"role": "61c18b4239y4d66c327e6t2a",
	"_id": "61c58b03ed93f821157262c1",
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

### Logout

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

### Fetch All Users **Cookie token required**

```http
  GET /api/v1/users/
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

### Get single user

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

### Post a new report

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
