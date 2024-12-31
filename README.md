# AddressFlow
AddressFlow is a web application designed to streamline address management by providing an intuitive interface for users to input, store, and retrieve address information efficiently.

## Features
-**Enable Location & Manual Search** : pop up appears for users to select their locations.

-**Google Map API** : geocoding,maps javascript api used.

-**Locate Me** : it helps user to locate thier location.

**User-Friendly Interface**: Simplifies the process of managing addresses.

**Search Functionality**: Quickly locate stored addresses.

**Recent searches** : recent searches will be added here.

**Responsive Design**: Accessible on various devices.

**Token based authentication**: Register and Login by token .

**Map preview** : it gives preview of the location.

**Save,Edit,Delete address** : Done with integrating backend API.

**Add to favourite** : clicking on the heart, the location will be stored in favourite page.

## Technologies Used
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Version Control: Git

## Installation
To set up the project locally:

Clone the repository:

bash

Copy code

git clone https://github.com/sayanp607/AddressFlow.git

Navigate to the project directory:

bash

Copy code

Install dependencies for both frontend and backend:

bash

Copy code
# Install 
backend dependencies

cd backend

cd backend

npm install

# Install frontend dependencies
cd frontend

cd frontend

npm install

## Set up environment variables:

Create a .env file in the backend directory with the following variables:

makefile

Copy code

PORT=5000

MONGODB_URI=your_mongodb_connection_string

## Start the development servers:

bash
Copy code

# Start backend server

cd backend

cd backend

npm start

# Start frontend server

cd frontend

cd frontend

npm start

The application should now be running, with the frontend accessible at http://localhost:5173 and the backend at http://localhost:5000.

## Usage
Adding an Address: Navigate to the 'Add Address' section, fill in the required fields, and submit.

Viewing Addresses: Access the 'Address List' to view all stored addresses.

Editing/Deleting: Use the edit or delete options next to each address entry.


