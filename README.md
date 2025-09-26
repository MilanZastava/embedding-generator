# Embedding Generator

This application provides a user-friendly interface to generate and index embeddings from local text and image files. It simulates the use of state-of-the-art ML models like MixedBread AI and CLIP, allowing you to create a vector database for semantic similarity search tasks. The entire process runs in your browser.

![Application Screenshot](https://storage.googleapis.com/aistudio-hosting/workspace-storage/e6a57088-72e9-4e4b-bb1b-640101d23a41/screenshot.png)

## Features

- **Dual Model Support**: Simulate loading and using both text and vision embedding models.
- **Local File Processing**: Generate embeddings for multiple text (`.txt`, `.md`) and image (`.jpg`, `.png`, etc.) files from your local machine.
- **Custom Model Paths**: Load your own models by selecting a local folder path.
- **In-Memory Index**: Manage generated embeddings in a simulated FAISS index.
- **Data Management**: View embedding counts, clear the index, and export all generated embeddings to a single JSON file.
- **Responsive UI**: Modern interface built with React and Tailwind CSS that works on all screen sizes.

## Prerequisites

To run this application locally, you only need a modern web browser that arome, Firefox, Safari, or Edge). For some of the running options, you might need Python or Node.js installed.

## Installation

1.  **Clone the repository:**
    Open your terminal and run the following command to clone the project files to your local machine:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Set up the `models` directory (Optional):**
    If you plan to use the "Load from Path" feature, create a `models` directory in the root of the project.
    ```bash
    mkdir models
    ```
    You can then clone your model repositories inside this directory. For example:
    ```bash
    cd models
    git clone https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1
    git clone https://huggingface.co/openai/clip-vit-large-patch14
    cd ..
    ```

## Running the Application

This project is a static web application and does not require a complex build process. You can run it using any simple local web server.

### Option 1: Using a VS Code Extension

If you are using Visual Studio Code, the easiest way to run the app is with the **Live Server** extension.
1.  Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension from the VS Code Marketplace.
2.  Open the project folder in VS Code.
3.  Right-click on the `index.html` file and select "Open with Live Server".
4.  Your browser will automatically open with the application running.

### Option 2: Using Python's built-in server

If you have Python installed, you can use its simple HTTP server.
1.  Navigate to the project's root directory in your terminal.
2.  Run one of the following commands (depending on your Python version):
    ```bash
    # For Python 3
    python -m http.server

    # For Python 2
    python -m SimpleHTTPServer
    ```
3.  Open your web browser and go to `http://localhost:8000`.

### Option 3: Using Node.js and `serve`

If you have Node.js and npm installed, you can use the `serve` package to run a local server.

1.  **Install `serve`:**
    Open your terminal and install the `serve` package globally:
    ```bash
    npm install -g serve
    ```
2.  **Run the server:**
    Navigate to the project's root directory in your terminal and run:
    ```bash
    serve -s .
    ```
    The `-s` flag rewrites all requests to `index.html`, which is best practice for single-page applications.

3.  Open your web browser and go to the URL provided in the terminal (usually `http://localhost:3000`).

## How to Use the App

1.  **Load Models**:
    -   **Default**: Click "Load Text Model" or "Load CLIP Model" to simulate loading the default models.
    -   **Local Path**: Click "Load from Path", and your file explorer will open. Select the folder containing your local model (e.g., the one you cloned into the `models` directory).

2.  **Generate Embeddings**:
    -   Once a model is loaded, its corresponding "Generate Embeddings" card will be enabled.
    -   Click "Select files" to choose one or more text or image files.
    -   The file count will appear. Click "Generate Embeddings" to start the (simulated) process.

3.  **Manage the Embedding Index**:
    -   The "Embedding Index" card shows a live count of your generated text and image embeddings.
    -   **Export**: Click the "Export" button to download a `embeddings.json` file containing all the vector data.
    -   **Clear**: Click the "Clear" button to reset the index and remove all existing embeddings.

## Project Structure

```
.
├── models/             # (Optional) Create this folder for your local models
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
├── metadata.json       # Application metadata
├── README.md           # This file
└── types.ts            # Shared TypeScript types and enums
```

## Full-Stack Architecture

While this application runs entirely in the browser as a simulation, a production-grade version would typically use a client-server architecture to handle the computationally intensive tasks of model inference and index management. Here's a brief overview of how such a system would be designed:

**Backend (Python)**

The backend would be responsible for all the heavy ML processing. A Python web framework like **FastAPI** or **Flask** would be an excellent choice to create the necessary API endpoints.

*   **Text Embeddings**: The [`sentence-transformers`](https://github.com/UKPLab/sentence-transformers) library would be used to load models like `mxbai-embed-large-v1` and generate high-quality embeddings from text files.
*   **Image Embeddings**: To process images, a model like **CLIP** would be used, accessible through libraries like Hugging Face's [`transformers`](https://huggingface.co/docs/transformers/index) or the original [`clip`](https://github.com/openai/CLIP) package. This would generate vision embeddings that are comparable to the text embeddings.
*   **Vector Indexing**: [`faiss-cpu`](https://github.com/facebookresearch/faiss) (or `faiss-gpu` for GPU acceleration) is the industry standard for efficient similarity search on dense vectors. The backend would maintain a FAISS index in memory or on disk. All generated text and image embeddings would be added to this index along with their metadata (e.g., source filename).

**API Endpoints**

The backend would expose simple API endpoints for the frontend to call:
- `POST /embed`: An endpoint to upload a text or image file. The backend processes the file, generates the vector, adds it to the FAISS index, and returns a success response.
- `GET /search`: An endpoint to perform a similarity search (not yet implemented in the UI).
- `GET /embeddings`: An endpoint to retrieve the list of currently indexed items.

This architecture separates the user interface from the complex and resource-intensive ML operations, providing a scalable and powerful solution.
