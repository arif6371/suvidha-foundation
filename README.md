---

# Suvidha Foundation - Admin Portal

## Overview

The Suvidha Foundation's Offer Letter Generation Portal is a comprehensive web application designed to streamline the process of creating, managing, and sending offer letters. This portal includes features such as secure login/logout functionality, a responsive dashboard, CRUD operations for database entries, and automated offer letter generation in PDF format with email integration.

## Features

### 1. Login/Logout Functionality
- **Secure Authentication**: Users can securely log in and log out of the portal using their credentials.
- **User Roles**: Different user roles (e.g., admin, HR, manager) with varying levels of access and permissions.

### 2. Responsive Dashboard
- **User-Friendly Interface**: A clean and intuitive dashboard that provides an overview of all activities and quick access to key features.
- **Real-Time Updates**: The dashboard displays real-time data and updates, ensuring users have the most current information.

### 3. CRUD Operations for Database Entries
- **Create**: Add new entries for candidates, including personal details, contact information, and offer details.
- **Read**: View and search through existing entries in the database.
- **Update**: Edit and update candidate information as needed.
- **Delete**: Remove entries from the database securely.

### 4. Offer Letter Generation in PDF Format
- **Customizable Templates**: Use pre-defined templates to generate offer letters with personalized content.
- **Automated PDF Generation**: Generate offer letters in PDF format with a single click.
- **Dynamic Content**: Automatically populate offer letters with candidate details, reference numbers, and dates.

### 5. Email Integration
- **Seamless Email Sending**: Send generated offer letters directly to candidates via email.
- **Email Templates**: Use customizable email templates to ensure consistent communication.
- **Attachment Handling**: Attach the generated PDF offer letters to the emails.

## Installation

To set up the Offer Letter Generation Portal locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/suvidha-foundation/offer-letter-portal.git
   cd offer-letter-portal
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the necessary environment variables:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_EMAIL_SERVICE_API_KEY=your_email_service_api_key
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```

5. **Access the Portal**:
   Open your browser and navigate to `http://localhost:3000` to access the portal.

## Usage

1. **Login**: Enter your credentials to log in to the portal.
2. **Dashboard**: Use the dashboard to navigate through different features and view real-time updates.
3. **Manage Entries**: Use the CRUD operations to manage candidate entries in the database.
4. **Generate Offer Letters**: Select a candidate and generate an offer letter in PDF format.
5. **Send Emails**: Use the email integration feature to send the generated offer letters to candidates.

## Contributing

We welcome contributions to improve the Offer Letter Generation Portal. To contribute, follow these steps:

1. **Fork the Repository**: Click the "Fork" button on the repository's GitHub page.
2. **Create a Branch**: Create a new branch for your feature or bug fix.
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit Your Changes**: Make your changes and commit them with a descriptive message.
   ```bash
   git commit -m "Add feature: your feature description"
   ```
4. **Push to Your Branch**: Push your changes to your forked repository.
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a Pull Request**: Open a pull request on the original repository and describe your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or support, please contact us at support@suvidhafoundation.org.

---

