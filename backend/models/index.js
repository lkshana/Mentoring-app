const Student = require("./Student");
const Admin = require("./Admin");
const Master = require("./Master");
const Achievement = require("./Achievement");
const Log = require("./Log");

const Event = require("./Event");
const Registration = require("./Registration");
const TeamMember = require("./Team_member");

const Mentor = require("./Mentor");
const Project = require("./Project");
const ProjectMember = require("./Project_member");
const Feedback = require("./Feedback");
const Project_update = require("./Project_update");
const Report = require("./Report");

// Competition Associations 🫠
Master.hasMany(Event, {
  foreignKey: { name: "created_by", allowNull: false },
  as: "eventsCreated",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Event.belongsTo(Master, {
  foreignKey: { name: "created_by", allowNull: false },
  as: "creator",
});

Event.hasMany(Registration, {
  foreignKey: { name: 'event_id', allowNull: false },
  as: 'registrations',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Registration.belongsTo(Event, {
  foreignKey: { name: 'event_id', allowNull: false },
  as: 'event'
});


Student.hasMany(Registration, {
  foreignKey: { name: 'team_lead_id', allowNull: false },
  as: 'leadRegistrations',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Registration.belongsTo(Student, {
  foreignKey: { name: 'team_lead_id', allowNull: false },
  as: 'teamLead'
});

Mentor.hasMany(Registration, {
  foreignKey: { name: 'mentor_id', allowNull: true },
  as: 'mentoredRegistrations',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});
Registration.belongsTo(Mentor, {
  foreignKey: { name: 'mentor_id', allowNull: true },
  as: 'mentor'
});

Registration.hasMany(TeamMember, {
  foreignKey: { name: 'registration_id', allowNull: false },
  as: 'teamMembers',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
TeamMember.belongsTo(Registration, {
  foreignKey: { name: 'registration_id', allowNull: false },
  as: 'registration'
});

Student.hasMany(TeamMember, {
  foreignKey: { name: 'student_id', allowNull: false },
  as: 'teamMemberships',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
TeamMember.belongsTo(Student, {
  foreignKey: { name: 'student_id', allowNull: false },
  as: 'student'
});

Registration.belongsToMany(Student, {
  through: TeamMember,
  foreignKey: 'registration_id',
  otherKey: 'student_id',
  as: 'teamStudents'
});
Student.belongsToMany(Registration, {
  through: TeamMember,
  foreignKey: 'student_id',
  otherKey: 'registration_id',
  as: 'teamRegistrations'
});



// Mentoring Associations 🥹

Student.hasMany(Project, {
  foreignKey: "created_by",
  as: "createdProjects",
});

Project.belongsTo(Student, {
  foreignKey: "created_by",
  as: "creator",
});

Mentor.hasMany(Project, {
  foreignKey: "mentor_id",
  as: "projects",
});

Project.belongsTo(Mentor, {
  foreignKey: "mentor_id",
  as: "mentor",
});

Project.hasMany(Report, {
  foreignKey: "project_id",
  as: "reports",
  onDelete: "CASCADE",
});

Report.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

Project.hasMany(Project_update, {
  foreignKey: "project_id",
  as: "updates",
  onDelete: "CASCADE",
});

Project_update.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

Student.hasMany(Project_update, {
  foreignKey: "student_id",
  as: "updates",
  onDelete: "CASCADE",
});

Project_update.belongsTo(Student, {
  foreignKey: "student_id",
  as: "student",
});

Project.belongsToMany(Student, {
  through: ProjectMember,
  foreignKey: "project_id",
  otherKey: "student_id",
  as: "projectMembers",
});
Student.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: "student_id",
  otherKey: "project_id",
  as: "projectTeams",
});

Project.hasMany(Feedback, {
  foreignKey: "project_id",
  as: "feedbacks",
  onDelete: "CASCADE",
});
Feedback.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

Mentor.hasMany(Feedback, {
  foreignKey: "mentor_id",
  as: "givenFeedbacks",
  onDelete: "CASCADE",
});
Feedback.belongsTo(Mentor, {
  foreignKey: "mentor_id",
  as: "mentor",
  allowNull: true,
});

Student.hasMany(Feedback, {
  foreignKey: "student_id",
  as: "receivedFeedbacks",
  onDelete: "CASCADE",
});
Feedback.belongsTo(Student, {
  foreignKey: "student_id",
  as: "student",
  allowNull: true,
});

// Portfolio Associations 😅

Achievement.belongsTo(Student, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
  as: "achievementStudent",
});

Student.hasMany(Achievement, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
  as: "studentAchievements",
});

Log.belongsTo(Student, {
  foreignKey: "student_id",
  as: "logStudent",
});

Student.hasMany(Log, {
  foreignKey: "student_id",
  as: "studentLogs",
});

Log.belongsTo(Admin, {
  foreignKey: "admin_id",
  as: "logAdmin",
});

Admin.hasMany(Log, {
  foreignKey: "admin_id",
  as: "adminLogs",
});

Achievement.hasMany(Log, {
  foreignKey: "achievement_id",
  as: "logs",
});

Log.belongsTo(Achievement, {
  foreignKey: "achievement_id",
  as: "achievement",
});

// Student and ProjectMember

Student.hasMany(ProjectMember, {
  foreignKey: "student_id",
  as: "studentProjectMembers",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
ProjectMember.belongsTo(Student, {
  foreignKey: "student_id",
  as: "student",
});

module.exports = {
  // Portfolio Models
  Student,
  Admin,
  Master,
  Achievement,
  Log,

  // Competetion Models
  TeamMember,
  Event,
  Registration,

  // Mentoring Models
  Mentor,
  Project,
  ProjectMember,
  Feedback,
  Project_update,
  Report,
};
