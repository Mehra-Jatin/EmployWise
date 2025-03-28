# Employ Wise

**Live Link:** [Employ Wise](https://employ-wise-black.vercel.app/)

## Overview
Employ Wise is a web-based application that fetches and displays a list of users from an API. Users can search, edit, and delete records while maintaining authentication via token storage.

## Features
- Fetch and display users from an external API
- Search users by name
- Edit user details (the user data for update is sent )
- Delete users
- Token-based authentication
- Pagination support

## Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/employ-wise.git
cd employ-wise
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start the Development Server
```sh
npm start
```
This will launch the application at `http://localhost:3000/`.

## Assumptions & Considerations
- The project uses the `reqres.in` API as a placeholder for user data.
- Authentication is handled via local storage tokens.
- Search functionality filters users dynamically from the fetched list.
- Pagination is implemented but works based on the API's pagination structure.

## Technologies Used
- React.js
- Axios
- React Router
- Tailwind CSS (for styling)
- Toastify (for notifications)

## Deployment
The project is deployed on **Vercel**. Any updates pushed to the repository will trigger an automatic deployment.

---
### Author
**Jatin Mehra**

