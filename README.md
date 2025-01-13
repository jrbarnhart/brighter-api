# Brighter API

Welcome to **Brighter API**, a simple REST API built with [Nest.js](https://nestjs.com/) for retrieving data about the MMO **Brighter Shores**.

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
   git clone https://github.com/your-username/Brighter-API.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Brighter-API
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run start:dev
   ```

---

## Usage

After starting the server, the API will be available at `http://localhost:3000` by default. Use tools like [Postman](https://www.postman.com/) or `curl` to test the endpoints.

### Example Endpoint

- Get a list of monsters:

  ```bash
  GET /monsters
  ```

  Example Response (Does not reflect actual data structure):

  ```json
  [
    {
      "id": 1,
      "name": "Goblin Soldier",
      "variant": ["Looter", "Hooligan", "Plunderer"],
      "skillLevel": 0
    },
    {
      "id": 2,
      "name": "Goblin Chief",
      "variant": ["Irritable", "Bossy", "Robust"],
      "skillLevel": 5
    }
  ]
  ```

---

## Authentication and Protected Routes

To access the login route and protected routes for editing or adding data, you will need to configure a `.env` file at the root of the project. This file should include the following variables:

```
ADMIN_USERNAME=<your_admin_username>
ADMIN_PASSWORD=<your_admin_password>
ADMIN_ID=<your_admin_id>
JWT_SECRET=<your_jwt_secret>
```

The `ConfigModule` in the project is set to look for this `.env` file in the root directory, so ensure it is correctly placed and configured before attempting to use these features.

---

## License

This project is licensed under the [MIT License](LICENSE).
