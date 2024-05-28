# StudySync

StudySync is a backend project designed to function as a question bank. The API is built using Node.js and Express.js, and it interacts with a MongoDB database through Mongoose. The application supports authentication and authorization using JSON Web Tokens (JWT) and validates input using AJV (Another JSON Schema Validator).

## Features

- **Question Bank Management**: Create, read, update, and delete questions.
- **Authentication**: User registration and login with JWT-based authentication.
- **Authorization**: Role-based access control for different API endpoints.
- **Input Validation**: Ensures data integrity using AJV.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Input Validation](#input-validation)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/AhmadAbdelrazik/studysync.git
    cd studysync
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=3000
    JWT_ACCESS_TOKEN=your_jwt_secret
    JWT_REFRESH_TOKEN=your_jwt_secret
    ```

4. Start the server:
    ```sh
    npm start
    ```

## Usage

Once the server is running, you can access the API at `http://localhost:3000`.

## API Endpoints

### Authentication

- **Register**: `POST /register`
- **Login**: `POST /login`

### Courses

- **Get all Courses**: `GET /courses`
- **Add a Course**: `POST /courses`
- **Update a course**: `PUT /courses/:course`
- **Delete a course**: `DELETE /courses/:course`

### Questions

- **Get all Questions**: `GET /:course`
- **Get a random Question**: `GET /:course/random`
- **Add a Question**: `POST /:course`
- **Update a Question**: `PUT /:course`
- **Delete a Question**: `DELETE /:course`

## Authentication & Authorization

Authentication is handled using JWT. Upon successful login, a token is issued which must be included in the `Authorization` header of protected routes.

### Example:
```sh
Authorization: Bearer your_jwt_token
```

Authorization is role-based, ensuring only users with the appropriate roles can access certain endpoints.

## Input Validation

AJV is used to validate the input data for different endpoints, ensuring the data conforms to the expected schema.

### Example Schema:
```json
{
  "type": "object",
  "properties": {
    "question": { "type": "string" },
    "options": { 
      "type": "array",
      "items": { "type": "string" }
    },
    "answer": { "type": "string" }
  },
  "required": ["question", "options", "answer"]
}
```

## Configuration

Configuration is managed through environment variables. Ensure to set the necessary variables in your `.env` file.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README.md to better suit your project's specifics.