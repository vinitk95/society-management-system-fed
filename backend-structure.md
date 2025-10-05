# Backend Structure for Society Management System

## Package Name: `society-management-system-bed`

### Project Structure
```
backend/
├── src/
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── apartmentController.js
│   │   ├── residentController.js
│   │   ├── amenityController.js
│   │   ├── billController.js
│   │   ├── ticketController.js
│   │   ├── noticeController.js
│   │   ├── serviceController.js
│   │   ├── visitorController.js
│   │   └── reportController.js
│   ├── models/             # Database models
│   │   ├── User.js
│   │   ├── Apartment.js
│   │   ├── Tower.js
│   │   ├── Resident.js
│   │   ├── Owner.js
│   │   ├── Tenant.js
│   │   ├── Amenity.js
│   │   ├── Booking.js
│   │   ├── Bill.js
│   │   ├── Payment.js
│   │   ├── Ticket.js
│   │   ├── Notice.js
│   │   ├── Service.js
│   │   ├── Visitor.js
│   │   └── Report.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── apartments.js
│   │   ├── residents.js
│   │   ├── amenities.js
│   │   ├── bills.js
│   │   ├── tickets.js
│   │   ├── notices.js
│   │   ├── services.js
│   │   ├── visitors.js
│   │   └── reports.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── utils/              # Utility functions
│   │   ├── database.js
│   │   ├── email.js
│   │   ├── pdfGenerator.js
│   │   └── helpers.js
│   └── config/             # Configuration files
│       ├── database.js
│       ├── jwt.js
│       └── email.js
├── tests/                  # Test files
├── uploads/                # File uploads
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── server.js              # Main server file
```

### Key Features to Implement

#### 1. Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Manager, Resident)
- Password hashing with bcrypt
- Session management

#### 2. Dashboard APIs
- `/api/dashboard/stats` - Get summary statistics
- `/api/dashboard/bookings/today` - Today's amenity bookings
- `/api/dashboard/payments/pending` - Pending rent payments
- `/api/dashboard/tickets/open` - Open maintenance tickets
- `/api/dashboard/bills/utility/due` - Due utility bills

#### 3. Apartment Management
- CRUD operations for apartments
- Tower management
- Occupancy tracking
- Floor and unit management

#### 4. Resident Management
- Owner and tenant registration
- Profile management
- Document uploads
- Contact information

#### 5. Amenity Booking System
- Amenity availability checking
- Booking creation and management
- Time slot management
- Booking history

#### 6. Billing System
- Rent bill generation
- Utility bill management
- Payment tracking
- Payment reminders
- Financial reports

#### 7. Ticket System
- Maintenance request creation
- Ticket assignment
- Status tracking
- Priority management
- Resolution tracking

#### 8. Notice Board
- Notice creation and publishing
- Category management
- Priority levels
- Read receipts

#### 9. Visitor Management
- Visitor registration
- Check-in/check-out
- Host notification
- Visitor logs

#### 10. Reporting
- Financial reports
- Maintenance reports
- Occupancy reports
- Payment reports

### Database Schema (MongoDB)

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password: String,
  role: String, // 'admin', 'manager', 'resident'
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    address: String
  },
  apartmentId: ObjectId,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Apartments Collection
```javascript
{
  _id: ObjectId,
  towerId: ObjectId,
  floor: Number,
  unit: String,
  type: String, // '1BHK', '2BHK', '3BHK', 'Penthouse'
  area: Number,
  status: String, // 'occupied', 'vacant', 'maintenance'
  ownerId: ObjectId,
  tenantId: ObjectId,
  rent: Number,
  maintenance: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Bills Collection
```javascript
{
  _id: ObjectId,
  apartmentId: ObjectId,
  type: String, // 'rent', 'maintenance', 'utility', 'other'
  amount: Number,
  dueDate: Date,
  status: String, // 'pending', 'paid', 'overdue'
  description: String,
  period: {
    month: Number,
    year: Number
  },
  paymentId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### API Response Format

#### Success Response
```javascript
{
  success: true,
  data: {
    // Response data
  },
  message: "Operation completed successfully"
}
```

#### Error Response
```javascript
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Error description",
    details: {} // Additional error details
  }
}
```

### Environment Variables
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/society-management
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

### Installation & Setup

1. Initialize the backend project:
```bash
mkdir society-management-system-bed
cd society-management-system-bed
npm init -y
```

2. Install dependencies:
```bash
npm install express cors helmet morgan dotenv mongoose bcryptjs jsonwebtoken express-validator multer nodemailer moment
npm install -D nodemon jest supertest
```

3. Set up environment variables in `.env` file

4. Start the development server:
```bash
npm run dev
```

### API Documentation

The backend should provide comprehensive API documentation using tools like Swagger/OpenAPI or Postman collections.

### Security Considerations

- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet for security headers
- SQL injection prevention
- XSS protection
- Secure file uploads
- Environment variable protection
