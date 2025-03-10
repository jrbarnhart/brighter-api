# Brighter API

**Brighter API** is a REST API built with [Nest.js](https://nestjs.com/) for retrieving data about the MMO [**Brighter Shores**](https://www.brightershores.com/).

Check it out at: https://brshapi.com

## Features

The Brighter API provides endpoints for accessing various resources related to Brighter Shores, including:

- **Rooms**: Information about in-game locations and their properties.
- **NPCs**: Details about non-player characters.
- **Monsters**: Data on monsters, including their attributes and variants.
- **Skills**: Descriptions and details of skills available in the game.
- **Resources**: In-game materials and gatherables.
- **Miscellaneous**: Additional game-related data such as Banks, Vendors, and other interactive elements.

---

## Installation

To set up Brighter API locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/jrbarnhart/brighter-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd brighter-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run start:dev
   ```

## Authentication and Protected Routes

To access the login route and protected routes for editing or adding data, as well as to connect to a database, you will need to configure a `.env` file at the root of the project. This file should include the following variables:

```
ADMIN_USERNAME=<your_admin_username>
ADMIN_PASSWORD=<your_admin_password>
ADMIN_ID=<your_admin_id>
JWT_SECRET=<your_jwt_secret>
DATABASE_URL="postgresql://<username>:<password>@<db-url>:<port>/<your-db-name>?schema=public"
```

The `ConfigModule` in the project is set to look for this `.env` file in the root directory, so ensure it is correctly placed and configured before attempting to use these features.

---

## Usage

After starting the server, the API will be available at `http://localhost:3000` by default. Use tools like [Postman](https://www.postman.com/) or `curl` to test the endpoints.

You can also go to the server url/api to see the Swagger UI which lists all the endpoints.

## License

This project is licensed under the [MIT License](LICENSE).
