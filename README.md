AddressFlow

AddressFlow is a web application designed to streamline address management by providing an intuitive interface for users to input, store, and retrieve address information efficiently.

Features

User-Friendly Interface: Simplifies the process of managing addresses.

Real-Time Validation: Ensures accuracy of address inputs.

Search Functionality: Quickly locate stored addresses.

Responsive Design: Accessible on various devices.

Technologies Used

Frontend: React.js, HTML5, CSS3

Backend: Node.js, Express.js

Database: MongoDB

Version Control: Git

Installation

To set up the project locally:

Clone the repository:

git clone https://github.com/sayanp607/AddressFlow.git

Navigate to the project directory:

cd AddressFlow

Install dependencies for both frontend and backend:

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

Set up environment variables:

Create a .env file in the backend directory with the following variables:

PORT=5000
MONGODB_URI=your_mongodb_connection_string

Start the development servers:

# Start backend server
cd backend
npm start

# Start frontend server
cd ../frontend
npm start

The application should now be running, with the frontend accessible at http://localhost:3000 and the backend at http://localhost:5000.

Usage

Adding an Address: Navigate to the 'Add Address' section, fill in the required fields, and submit.

Viewing Addresses: Access the 'Address List' to view all stored addresses.

Editing/Deleting: Use the edit or delete options next to each address entry.

Contributing

Contributions are welcome! To contribute:

Fork the repository.

Create a new branch:

git checkout -b feature/YourFeatureName

Make your changes and commit them:

git commit -m 'Add some feature'

Push to the branch:

git push origin feature/YourFeatureName

Open a Pull Request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For any inquiries or feedback, please contact sayanp607.

