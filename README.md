# User Authentication Module (Frontend)

## Overview

This project implements a user authentication module that allows users to sign up and sign in to the application. Built with React, the frontend component provides a clean and user-friendly interface while adhering to the specified requirements.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Design Specifications](#design-specifications)
- [Password Requirements](#password-requirements)
- [API Endpoints](#api-endpoints)
- [Logout Functionality](#logout-functionality)
- [Manual Testing](#manual-testing)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before running the frontend application, ensure that the backend is set up and running. You can find the backend repository at [https://github.com/AhmadSamDevelopment/auth-backend/tree/main](https://github.com/AhmadSamDevelopment/auth-backend/tree/main). The backend is essential for handling user authentication, providing the necessary API endpoints for sign-up and sign-in functionalities. Make sure to follow the setup instructions provided in the backend repository to run the application seamlessly alongside the frontend.


## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Material-UI**: Design framework for building responsive UI components.
- **Axios**: Library for making HTTP requests.
- **React Router**: For routing and navigation between components.
- **TypeScript**: Superset of JavaScript for adding static types (if applicable).

## Installation

To get started with the frontend project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AhmadSamDevelopment/easygen-frontend-auth.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd easygen-frontend-auth
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

## Usage

1. **Start the development server**:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3001`.

## Features

- **Sign Up**: A user can register by providing their email, name, and password. After a successful signup, users are redirected to the application page.
- **Sign In**: Users can log in using their email and password.
- **User Feedback**: Snackbar notifications for successful actions and errors during signup and login.
- **Responsive Design**: The interface adapts to various screen sizes.

## Design Specifications

- **Sign Up Page**: 
  - Fields: Email, Name, Password.
  - After successful signup, users are redirected to the application page.
  
- **Sign In Page**: 
  - Fields: Email, Password.
  
- **Application Page**: 
  - Displays a welcome message: "Welcome to the application."

## Password Requirements

During sign-up, the password must adhere to the following criteria:

- Minimum length of 8 characters.
- Contains at least 1 letter.
- Contains at least 1 number.
- Contains at least 1 special character.

## API Endpoints

This frontend interacts with the backend API for user authentication. Below are the key endpoints used:

- **Sign Up**: 
  - **POST** `/auth/signup`
  - Request Body: `{ name: string, email: string, password: string }`
  - Response: `200 OK` on success with user token.

- **Sign In**: 
  - **POST** `/auth/signin`
  - Request Body: `{ email: string, password: string }`
  - Response: `200 OK` on success with user token.

## Logout Functionality

While a full logout implementation is not required for this task, I have included a shallow logout feature that removes the token from local storage. In a production scenario, a more secure approach could involve refreshing the token or implementing a backend API to blacklist the token.

## Manual Testing

To keep the testing process simple, manual testing has been implemented instead of unit tests. This approach allows for straightforward validation of the sign-up and sign-in functionalities without the overhead of extensive test writing.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.