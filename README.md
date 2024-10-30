# Digital Gram Panchayat

The Digital Gram Panchayat project is a web application designed to help manage and streamline administrative services for Gram Panchayats. This project enables users to apply for various services, track application statuses, and allows admin and staff to monitor and manage applications efficiently.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Contributing](#contributing)

## Project Structure
The project structure is as follows:

Digital-Gram-Panchayat/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── CreateService.js
│   │   │   └── ManageServices.js
│   │   ├── Staff/
│   │   │   ├── StaffDashboard.js
│   │   │   └── StaffUpdateApplicationStatus.js
│   │   ├── User/
|   |   |   ├── UserDashboard.js
│   │   │   ├── ApplyService.js
│   │   │   └── UserProfile.js
│   │   ├── Shared/
│   │   │   ├── Sidebar.js
│   │   │   └── TopNavbar.js
│   ├── firebase/
│   │   └── firebaseConfig.js
│   ├── App.js
│   ├── index.js
│   └── App.css
├── .gitignore
├── package.json
└── README.md


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
