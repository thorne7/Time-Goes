# E-commerce Back-End

[![Node.js](https://img.shields.io/badge/Node.js-v14.17.3-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.17.1-blue)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-v6.6.5-red)](https://sequelize.org/)
[![MySQL](https://img.shields.io/badge/MySQL-v8.0.27-orange)](https://www.mysql.com/)
[![Insomnia](https://img.shields.io/badge/Insomnia-v2021.5.3-purple)](https://insomnia.rest/)

## Description

This is the back-end for an e-commerce site. It provides an Express.js API integrated with Sequelize to interact with a MySQL database. The API allows for creating, reading, updating, and deleting products, categories, and tags.

## Screenshots

![Screenshot 1](./assets/E-commerce%20screenshot%201.JPG)
* Get All Route *

![Screenshot 2](./assets/E-commerce%20screenshot%202.JPG)
* Create Route *



## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Set up your MySQL database and update the connection details in the `.env` file.
4. Run the database schema script using `mysql -u <username> -p < schema.sql` to create the database.
5. Seed the database with sample data using `npm run seed`.
6. Start the server with `npm start`.

## Usage

- Use a tool like Insomnia to test the API endpoints.
- Make `GET` requests to retrieve data.
- Make `POST`, `PUT`, and `DELETE` requests to create, update, and delete data.
- See the API routes in the respective route files (`product-routes.js`, `category-routes.js`, `tag-routes.js`) for available endpoints and request/response formats.

## Video Link

[Link Text](https://drive.google.com/file/d/1AoQPq-lztsLQQXCYUXOai4k7MzPclTK2/view)

## License

This project is licensed under the [MIT](LICENSE) license.

