# Brief Api-Mairie

This API was developed with [NodeJs](https://nodejs.org/en/) [Express](http://expressjs.com/) [MongoDB](https://www.mongodb.com/)

## API Reference

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

## Tech Stack

**Client:** Work in progress

**Server:** [NodeJs](https://nodejs.org/en/), [Express](http://expressjs.com/), [MongoDB](https://www.mongodb.com/)
