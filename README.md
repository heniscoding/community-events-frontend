# Community Events Platform

Welcome to the **Community Events Platform**! This web application is designed to help users explore, register for, and manage local community events. It allows event organizers to create and promote events, while community members can easily find and participate in events that interest them.

A hosted version of the site can be found at [community-events.henryalderslade.com](https://community-events.henryalderslade.com/).

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [License](#license)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Description

The **Community Events Platform** is a full-featured React-based web application that showcases modern web development practices. The platform offers a streamlined experience for managing events, from browsing upcoming events to user authentication and event registration.

The main features include:
- Viewing a list of upcoming community events
- Registering for events as an attendee
- Creating and managing events as an event organizer
- Adding events to your Google Calendar
- User-friendly responsive design for both mobile and desktop users

This project uses **React**, **Axios** for HTTP requests, **React Router** for seamless navigation, and various libraries to deliver a smooth user experience.

## Installation

To run this project locally, follow the steps below:

### Prerequisites

Ensure you have Node.js and npm installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

### Steps to Install

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/heniscoding/community-events-platform.git
    ```

2. **Navigate to the Project Directory**:

    ```bash
    cd community-events-platform
    ```

3. **Install Dependencies**:

    ```bash
    npm install
    ```

4. **Set up Environment Variables**:

    Create a `.env` file in the root directory and add the following variables:

    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```
    
5. **Start the Application**:

    ```bash
    npm start
    ```

After running these commands, the application should be accessible at `http://localhost:3000`.

## Usage

Once you have the platform up and running, you can use it as follows:

- **Viewing Events**: You will see a list of the most recent community events on the home page. Navigating to the ALl Events page will display all the events set up on the site.
- **Search and filter Events**: You can use the search and filter features to find events by name, and type (e.g., free or paid).
- **Registering for Events**: Click on any event to see its details. To register for an event, simply click the "Register" button (requires you to be logged in).
- **Managing Events**: If you are an event organizer, you can create and update events from the Dashboard.

### Folder Structure
- **`src/components/`**: Reusable components such as Navbar, Footer, Forms, etc.
- **`src/pages/`**: Contains main pages like Home, Create Event, Event Details, etc.
- **`src/assets/`**: Static assets like images and the favicon.
- **`src/AuthContext.js`**: Manages user authentication and state.

## Features

- **User Authentication**: Users can register, log in, and maintain a session to view or manage events.
- **Create and Manage Events**: Event organizers can create events through a protected dashboard.
- **Responsive Design**: The platform is fully responsive, ensuring accessibility across devices.
- **Notification Popups**: Success or error messages are presented as notifications for better user experience.


## Test Accounts

You can use the following test accounts to explore the functionality of the platform:

### Regular User Account
- **Username**: user
- **Email**: user@test.com
- **Password**: 12345

### Staff Account
- **Username**: staff
- **Email**: staff@test.com
- **Password**: 12345

## Dependencies

The following major dependencies are used in this project:

- **[React](https://reactjs.org/)** - Front-end library for building user interfaces.
- **[React Router](https://reactrouter.com/)** - Handles routing and navigation in the single-page application.
- **[Axios](https://axios-http.com/)** - Manages HTTP requests to connect with the backend API.
- **[Font Awesome](https://fontawesome.com/)** - Provides icons used throughout the application.

## License

Distributed under the **MIT License**. See `LICENSE` for more information.

## Author

- **Henry Alderslade** - [GitHub Profile](https://github.com/heniscoding)

If you have any questions or suggestions, please feel free to contact me via GitHub.

## Acknowledgments

- **React Documentation**: The React official documentation was instrumental in the development of this project.
- **Font Awesome**: For providing high-quality icons that enhance the user interface.
- **Community Contributors**: A special thank you to those who have contributed ideas, bug reports, and feedback that have improved the project.

Thank you for your interest in the **Community Events Platform**! Feel free to explore the code, report issues, or contribute to the project.
