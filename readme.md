# SportMonks API Wrapper Service

A comprehensive Node.js API wrapper for the SportMonks Football API that provides convenient access to football data including players, fixtures, teams, and more.


## Overview

This service provides a simplified interface to the SportMonks API, making it easy to access football data in your applications. It handles authentication, request formatting, error handling, and response parsing.

## Installation

```bash
# Clone the repository
git clone https://github.com/oluwaseyihassan/sportmonksapi.git

# Navigate to project directory
cd sportmonksapi

# Install dependencies
npm install

# Start the service
npm start
```

## Configuration

1. Create a `.env` file in the root directory
2. Add your SportMonks API token:

```
API_TOKEN=your_api_token_here
```

You can obtain an API token by registering at [SportMonks](https://sportmonks.com/).

## Project Structure

```markdown
sportmonksapi/
├── fixtures/                  # Fixtures module
│   ├── fixtures.controller.js # Controller for fixture endpoints
│   ├── fixtures.routes.js     # Route definitions for fixtures
│   └── fixturesApi.js         # API service for SportMonks fixtures endpoints
├── players/                   # Players module
│   ├── players.controller.js  # Controller for player endpoints
│   ├── players.routes.js      # Route definitions for players
│   └── playersapi.js          # API service for SportMonks players endpoints
├── teams/                     # Teams module
│   ├── teams.controller.js    # Controller for team endpoints
│   ├── teams.routes.js        # Route definitions for teams
│   └── teamsapi.js            # API service for SportMonks teams endpoints
├── utils/                     # Utility functions
│   └── functions.js           # Helper functions for API handling
├── .env                       # Environment variables (not in repo)
├── .gitignore                 # Git ignore file
├── index.js                   # Main application entry point
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```
###
- Controllers: Handle HTTP requests and responses
- Routes: Define API endpoints and connect them to controllers
- API Services: Make requests to SportMonks API and process responses
- Utils: Common utility functions used across the application

## API Endpoints

### Players

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/players` | GET | Get all players |
| `/api/players/:player_id` | GET | Get player by ID |
| `/api/players/country/:country_id` | GET | Get players by country |
| `/api/players/search/:search_param` | GET | Search players by name |
| `/api/players/latest` | GET | Get latest updated players |

#### Query Parameters

- `include`: Include additional data (e.g., `statistics`, `team`)
- `filters`: Apply filters to the data
- `page`: Pagination control

### Fixtures

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/fixtures` | GET | Get all fixtures |
| `/api/fixtures/:fixture_id` | GET | Get fixture by ID |
| `/api/fixtures/multi/:fixture_ids` | GET | Get multiple fixtures by IDs |
| `/api/fixtures/date/:date` | GET | Get fixtures by date (YYYY-MM-DD) |
| `/api/fixtures/between/:start_date/:end_date` | GET | Get fixtures in date range |
| `/api/fixtures/between/:start_date/:end_date/:team_id` | GET | Get fixtures for team in date range |
| `/api/fixtures/head-to-head/:team1_id/:team2_id` | GET | Get head-to-head fixtures |
| `/api/fixtures/search/:search_param` | GET | Search fixtures by name |

#### Query Parameters

- `include`: Include additional data (e.g., `formations`, `lineups.detailedposition`)
- `filters`: Apply filters to the data

## Error Handling

The API uses standard HTTP status codes:

- `200 OK`: Request successful
- `400 Bad Request`: Invalid input parameters
- `404 Not Found`: Requested resource not found
- `500 Internal Server Error`: Server-side error

All responses follow this format:

```json
{
  "success": true|false,
  "data": {...} | null,
  "message": "Error message" (only for errors)
}
```

## Examples

### Get Player by ID

```javascript
// Request
fetch('/api/players/1234')
  .then(response => response.json())
  .then(data => console.log(data));

// Response
{
  "success": true,
  "data": {
    "data": {
      "id": 1234,
      "name": "Lionel Messi",
      // ...other player data
    }
  }
}
```

### Get Fixtures by Date Range

```javascript
// Request
fetch('/api/fixtures/between/2023-01-01/2023-01-07')
  .then(response => response.json())
  .then(data => console.log(data));

// Response
{
  "success": true,
  "data": {
    "data": [
      // Array of fixtures
    ]
  }
}
```


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note:** This is an unofficial wrapper for the SportMonks API. Make sure to comply with SportMonks' terms of service and API usage limits.