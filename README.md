# Project Setup

This project is built using [Bun](https://bun.sh/) for both the frontend and backend. Follow the instructions below to set up and run the project.

## Prerequisites

Before starting, ensure that you have Bun.js installed on your system.

### Installing Bun.js

- **Windows**:  
  Open PowerShell and run the following command:
  ```sh
  powershell -c "irm bun.sh/install.ps1 | iex"
- **Linux/macOS**:  
  Run the following command in your terminal:
  ```sh
  curl -fsSL https://bun.sh/install | bash
  
# Setting Up the Project


1. ### Backend setup
    - Navigate to the backend directory:
    ```sh
    cd backend
    ```
    
    - Install dependencies:
    ```sh
    bun install
    ```

    - Create a .env file in the backend directory with the following structure:
    ```env
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    DB_USER=your_database_user
    GOOGLE_CLIENT_ID=your_google_client_id
    SESSION_ENCRYPTION_KEY=your_32_character_long_session_encryption_key
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GEMINI_API_KEY=your_gemini_api_key
    GOOGLE_PLACES_API_KEY=your_google_places_api_key

    ```
    
    #### Environment Variables Description:
    `DB_PASSWORD`: The password for your database.\
    `DB_NAME`: The name of the database you're using.\
    `DB_USER`: The database user name.\
    `GOOGLE_CLIENT_ID`: The client ID for Google OAuth.\
    `SESSION_ENCRYPTION_KEY`: A key used to encrypt session data (must be 32 characters long).\
    `GOOGLE_CLIENT_SECRET`: The client secret for Google OAuth.\
    `GEMINI_API_KEY`: API key for the Gemini API.\
    `GOOGLE_PLACES_API_KEY`: API key for Google Places API.\
    
    - Start the backend server:
    ```sh
    bun run dev
    ```
    
2. ### Frontend setup
    - Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
    
    - Install dependencies:
    ```sh
    bun install
    ```

    - Start the frontend development server:
    ```sh
    bun run dev
    ```

3. ### Running the Project

After completing the setup, you should have two terminals running:

- One for the backend server (port 3000)
- One for the frontend development server (port 5173)
  
