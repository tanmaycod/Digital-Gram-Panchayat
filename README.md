# Digital Gram Panchayat

The Digital Gram Panchayat project is a web application designed to help manage and streamline administrative services for Gram Panchayats. This project enables users to apply for various services, track application statuses, and allows admin and staff to monitor and manage applications efficiently.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Contributing](#contributing)

## Features
- **Admin Panel**: Manage services, update application statuses, and view analytics.
- **Staff Dashboard**: Handle user applications with pending statuses and update status as approved or rejected.
- **User Dashboard**: Apply for services, view applied services, and track status.
- **Profile Management**: Update profile information and view application statistics.
- **Animations & Effects**: Implemented micro-animations and 3D effects for improved user experience.

## Technologies Used
- **Frontend**: React.js, CSS3, JavaScript, HTML5
- **Styling**: Neumorphism, Glassmorphism, advanced CSS animations
- **Backend**: Firebase (Firestore for database, Authentication for user login)
- **Additional Libraries**: 
  - `react-router-dom` for routing
  - `firebase` for backend services
  - `react-icons` for icons
  - `chart.js` and `react-chartjs-2` for charts and data visualization

## Setup and Installation

To set up and run this project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/tanmaycod/Digital-Gram-Panchayat.git
   cd Digital-Gram-Panchayat

2. **Install Dependencies**:
   ```bash
   npm install

3. **Firebase Configuration**:
   - Create a Firebase project at Firebase Console.
   - Set up Firestore, Authentication, and Storage.
   - In the Firebase Console, go to Project Settings > General > Your apps, and add a new Web app.
   - Copy the Firebase SDK configuration and replace the contents of src/firebase/firebaseConfig.js with your configuration.

## Running the Project
    ```bash
    npm start

## Usage
  - **Admin**:
      - Log in with admin credentials.
      - Manage services, view applications, and update statuses.
  - **Staff**:
      - Log in with staff credentials.
      - View pending applications and update them based on review.
  - **User**:
      - Register or log in to apply for services.
      - View and track the status of applications.
      - Manage personal profile and view application statistics.

## Contributing
  - **If you would like to contribute to this project, please follow these steps**:
      - Fork the repository.
      - Create a new branch (git checkout -b feature-name).
      - Make your changes and commit them (git commit -m "Added a feature").
      - Push to the branch (git push origin feature-name).
      - Create a Pull Request.
