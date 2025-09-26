# Embedding Generator

This application provides a user-friendly interface to generate and index embeddings from local text files. It features a React-based frontend that simulates the embedding process and a Python Flask backend that provides a mock API for a full-stack experience.

## Features

- **Dual-Component Architecture**: A React frontend for user interaction and a Python (Flask) backend for processing.
- **Mock Embedding Generation**: The backend simulates creating text embeddings.
- **API Endpoints**: The backend includes endpoints to embed text, search, and retrieve stored embeddings.
- **In-Memory Index**: The frontend manages a simulated in-memory FAISS index.
- **Data Management**: View embedding counts, clear the index, and export all generated embeddings to a single JSON file.
- **Responsive UI**: Modern interface built with React and Tailwind CSS that works on all screen sizes.

## Project Structure

```
.
├── backend/
│   ├── app.py            # Python Flask backend with mock API endpoints
│   └── requirements.txt  # Python dependencies
├── components/
│   ├── Card.tsx
│   ├── EmbeddingIndex.tsx
│   ├── GenerateEmbeddingCard.tsx
│   ├── Header.tsx
│   ├── LoadModelCard.tsx
│   └── icons/
│       └── Icons.tsx   # All SVG icons
├── App.tsx             # Main application component with state management
├── index.html          # The entry point of the application
├── index.tsx           # Renders the React application
├── README.md           # This file
└── ...                 # Other project configuration files
```

## Prerequisites

- Node.js and npm (or yarn) for the frontend.
- Python 3 and `pip` for the backend.

## Running the Application

This project consists of two separate parts: the frontend and the backend. You need to run them in two separate terminals.

### 1. Running the Backend (Python)

The backend is a Flask server that provides the API for the application.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the Flask application:**
    ```bash
    python app.py
    ```

The backend server will start and be available at `http://localhost:5000`.

### 2. Running the Frontend (React)

The frontend is a standard React application built with Vite.

1.  **Navigate to the project's root directory.**

2.  **Install the necessary Node.js packages:**
    ```bash
    npm install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```

The frontend will start, and your browser will automatically open to the application, which is typically running at `http://localhost:5173`.

## How to Use the App

1.  **Load Models**:
    -   Click "Load Text Model" or "Load CLIP Model" to simulate loading the models in the frontend.

2.  **Generate Embeddings**:
    -   Once a model is loaded, its corresponding "Generate Embeddings" card will be enabled.
    -   Click "Select files" to choose one or more text or image files.
    -   The file count will appear. Click "Generate Embeddings" to start the process.
    -   *Note: While the frontend simulates this, the backend `app.py` has a functional `/embed` endpoint for this purpose.*

3.  **Manage the Embedding Index**:
    -   The "Embedding Index" card shows a live count of your generated embeddings.
    -   **Export**: Click the "Export" button to download a `embeddings.json` file.
    -   **Clear**: Click the "Clear" button to reset the index.

## Backend API Endpoints

The Python backend provides the following mock endpoints:

-   `POST /embed`:
    -   Accepts a JSON payload with a `text` field (e.g., `{"text": "hello world"}`).
    -   Returns a mock embedding and a unique ID.
-   `GET /search`:
    -   Accepts a `query` parameter (e.g., `/search?query=hello`).
    -   Performs a basic case-insensitive substring search on the stored texts.
-   `GET /embeddings`:
    -   Returns all the embeddings currently stored in the in-memory database.

This architecture demonstrates a basic full-stack application, separating the user interface from the backend processing logic.
