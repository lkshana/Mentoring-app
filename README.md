# Mentoring Portal

A comprehensive web application for managing student-mentor relationships, project tracking, and academic collaboration. The portal facilitates seamless communication between students, mentors, administrators, and masters while providing tools for project management, feedback, and progress tracking.

## 🚀 Features

### For Students
- **Project Management**: Create, update, and track project progress
- **Mentor Collaboration**: Connect with mentors and receive guidance
- **Progress Updates**: Submit regular project updates and milestones
- **Feedback System**: Receive and respond to mentor feedback
- **Team Management**: Add/remove team members for collaborative projects
- **Profile Management**: Maintain comprehensive academic profiles
- **Competition Registration**: Register for events and competitions

### For Mentors
- **Project Oversight**: Monitor assigned student projects
- **Feedback Provision**: Provide structured feedback on student work
- **Progress Tracking**: Review student updates and milestones
- **Dashboard Analytics**: View mentoring statistics and metrics
- **Communication Tools**: Direct communication with mentees

### For Administrators
- **Department Management**: Oversee departmental activities
- **Approval Workflows**: Approve/reject student registrations
- **Student Oversight**: Monitor student progress within department
- **Event Management**: Create and manage departmental events

### For Masters
- **System-wide Oversight**: Monitor all activities across departments
- **Final Approvals**: Provide final approval for registrations
- **Analytics Dashboard**: View comprehensive system metrics
- **Event Creation**: Create institution-wide events and competitions

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MySQL** database with Sequelize ORM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React 18** with modern hooks
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Lucide React** for icons

### Database
- **MySQL** with comprehensive relational schema
- **Sequelize** migrations for database versioning
- **Row Level Security** implementation

## 📁 Project Structure

```
mentoring-portal/
├── backend/
│   ├── api/
│   │  ├── mentoring/        # Project and mentoring features
│   │  └── user/            # Authentication and profiles
│   ├── config/              # Database configuration
│   ├── constants/           # Application constants
│   ├── middleware/          # Authentication & authorization
│   ├── migrations/          # Database migrations
│   ├── models/             # Sequelize models
│   └── scripts/            # Database initialization
├── frontend/
│   ├── src/
│   │   ├── api/            # API service functions
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   └── styles/         # CSS and styling
│   └── public/             # Static assets
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mentoring-portal/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=mentoring
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. **Database Setup**
   ```bash
   # Initialize database
   npm run initdb
   
   # Run migrations
   npm run dev
   ```

5. **Start the server**
   ```bash
   npm start          # Production
   npm run dev        # Development with auto-reload
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🗄 Database Schema

### Core Entities
- **Students**: Student profiles and academic information
- **Mentors**: Faculty mentor profiles and specializations
- **Admins**: Department administrators
- **Masters**: System-wide administrators
- **Projects**: Student projects with mentor assignments
- **Events**: Competitions and events
- **Registrations**: Event registrations with approval workflows

### Key Relationships
- Students can have multiple projects
- Projects are assigned to mentors
- Projects can have multiple team members
- Events can have multiple registrations
- Registrations require department and admin approval

## 🔐 Authentication & Authorization

### Role-Based Access Control
- **Student**: Project creation, updates, team management
- **Mentor**: Project oversight, feedback provision
- **Admin**: Department-level approvals and management
- **Master**: System-wide oversight and final approvals

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Role-based route protection
- Input validation and sanitization

## 📱 API Endpoints

### Authentication
```
POST /api/user/student/login
POST /api/user/student/register
POST /api/user/mentor/login
POST /api/user/mentor/register
POST /api/user/admin/login
POST /api/user/master/login
```

### Projects
```
GET    /api/mentoring/project
POST   /api/mentoring/project
GET    /api/mentoring/project/:id
PUT    /api/mentoring/project/:id
DELETE /api/mentoring/project/:id
```

### Competitions
```
GET    /api/competitions/event
POST   /api/competitions/event
POST   /api/competitions/registration/:event_id
GET    /api/competitions/approval/pending
```

## 🎨 UI/UX Features

### Design System
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Mobile-first approach
- **Consistent Components**: Reusable UI components
- **Accessibility**: WCAG compliant design

### User Experience
- **Intuitive Navigation**: Role-based navigation menus
- **Real-time Updates**: Live feedback and notifications
- **Progressive Loading**: Optimized loading states
- **Error Handling**: Comprehensive error messages

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Run database migrations
3. Build and start the application
4. Configure reverse proxy (nginx recommended)

### Frontend Deployment
1. Update API endpoints for production
2. Build the application: `npm run build`
3. Deploy to static hosting (Netlify, Vercel, etc.)
4. Configure environment variables

## 🧪 Testing

### Backend Testing
```bash
npm test                    # Run all tests
npm run test:unit          # Unit tests
npm run test:integration   # Integration tests
```

### Frontend Testing
```bash
npm test                   # Run component tests
npm run test:e2e          # End-to-end tests
```

## 📊 Monitoring & Analytics

### Performance Metrics
- API response times
- Database query performance
- User engagement analytics
- Error tracking and logging

### Health Checks
- Database connectivity
- API endpoint availability
- Authentication service status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- Follow ESLint configuration
- Write comprehensive tests
- Update documentation
- Follow semantic versioning

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](docs/api.md)
- [Database Schema](docs/database.md)
- [Deployment Guide](docs/deployment.md)

### Contact
- **Project Maintainer**: Lakshana Rajendran
- **Email**: lakshanarajendran@gmail.com
- **Issues**: [GitHub Issues](link-to-issues)

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Core mentoring functionality
- User authentication and authorization
- Responsive web interface

---

**Built with ❤️ for educational excellence**
