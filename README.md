# Society Management System - Frontend

A modern, responsive dashboard for managing residential societies. This frontend application provides a comprehensive interface for society administrators to manage apartments, residents, amenities, bills, and more.

## Features

- **Dashboard Overview**: Real-time summary of key metrics and activities
- **Apartment Management**: Track towers, apartments, and occupancy status
- **Resident Management**: Manage owners and tenants
- **Amenity Bookings**: Handle facility reservations and scheduling
- **Billing System**: Track rent payments and utility bills
- **Ticket System**: Manage maintenance requests and issues
- **Notice Board**: Share announcements and updates
- **Visitor Management**: Track guest visits
- **Reports**: Generate financial and maintenance reports
- **Settings**: Configure system preferences

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing
- **Lucide React**: Beautiful, customizable icons
- **Date-fns**: Modern JavaScript date utility library
- **CSS3**: Custom styling with responsive design

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd society-management-system-fed
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.js       # Main layout wrapper
│   ├── Sidebar.js      # Navigation sidebar
│   └── Header.js       # Top header bar
├── pages/              # Page components
│   └── Dashboard.js    # Main dashboard page
├── styles/             # CSS styles
│   └── index.css       # Global styles
├── utils/              # Utility functions
├── App.js              # Main app component
└── index.js            # App entry point
```

## Backend Integration

This frontend is designed to work with the backend package: `society-management-system-bed`

The backend should provide REST APIs for:
- User authentication and authorization
- Apartment and resident management
- Amenity booking system
- Billing and payment processing
- Ticket and maintenance management
- Report generation

## Features Overview

### Dashboard
- Summary cards showing key metrics
- Today's amenity bookings
- Pending rent payments
- Open maintenance tickets
- Utility bills due

### Navigation
- Collapsible sidebar navigation
- Organized menu structure
- Active state indicators
- Responsive design

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Collapsible sidebar for mobile
- Flexible grid layouts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Docker Commands : 

docker build -t society-management-frontend:v1.0.0 .

docker run -d -p 9985:9985 --name society-management-app society-management-frontend:v1.0.0
