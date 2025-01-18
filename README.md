# CareCompanionAI

**CareCompanionAI** is an AI-powered chat application designed to provide seamless and intelligent interactions between users and AI agents. The project combines robust backend functionality with a user-friendly frontend to deliver a powerful conversational experience.

## Features

### Backend
- **Built with Django and Django REST Framework (DRF):**
  - Handles user authentication and authorization using **JWT** tokens via **Djoser**.
  - Stores and retrieves chat history (both user and AI messages) in a **PostgreSQL** database.
  - API endpoints for retrieving and managing chat data efficiently.

- **Integration with Django Channels and WebSockets:**
  - Enables real-time bi-directional communication between users and the server.
  - Powers seamless integration for live messaging and updates.

- **Integration with FlowiseAI:**
  - Orchestrates customized LLM (Large Language Model) flows and AI agents.
  - Provides dynamic and tailored AI-generated responses.
  - Utilizes **OpenAI** and **Gemini** APIs for generating high-quality AI-driven conversations.

### Frontend
- **ReactJS-Based Interface:**
  - A responsive and user-friendly chat interface.
  - Real-time interaction with the AI, ensuring a smooth conversational flow.
  - Integration with WebSockets for live message updates between users and the AI.

### Key Functionalities
- **User Authentication:**
  - Secure login and registration using JWT.
  - Authorization ensures user data privacy and integrity.

- **AI-Powered Responses:**
  - FlowiseAI enables custom workflows for engaging AI interactions.
  - Users can communicate with AI agents tailored to specific needs.

- **Real-Time Messaging:**
  - Bi-directional messaging powered by Django Channels and WebSockets.
  - Real-time updates for dynamic conversations.

- **Persisted Chat History:**
  - All user and AI messages are saved in the PostgreSQL database.
  - Users can view past interactions.

## Technologies Used

### Backend:
- **Django**: Python-based web framework for rapid and secure development.
- **Django REST Framework**: Simplifies API development with a robust toolkit.
- **Django Channels**: Extends Django’s capabilities for handling asynchronous protocols like WebSockets.
- **PostgreSQL**: Relational database for storing user and AI messages.
- **Djoser**: Streamlines user authentication using JWT.
- **FlowiseAI**: Provides orchestration for AI workflows.
- **OpenAI & Gemini APIs**: For generating intelligent and context-aware responses.

### Frontend:
- **ReactJS**: Frontend library for building a responsive and interactive UI.

---

