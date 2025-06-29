const ResponseConstants = {
  FailedResponseMessage: "Failed in Processing the Request",
  SuccessResponseMessage: "Success in Processing the Request",
  User: {
    SuccessRegistration: {
      Student: "Student registered successfully",
      Mentor: "Mentor registered successfully",
      Admin: "Admin registered successfully",
      Master: "Master registered successfully",
    },
    SuccessUpdatePassword: "Password updated successfully",
    SuccessLogin: {
      Student: "Student logged in successfully",
      Mentor: "Mentor logged in successfully",
      Admin: "Admin logged in successfully",
      Master: "Master logged in successfully",
    },
    Error: {
      ExistingUser: "User already exists with the given email",
      LoginFailed: "Invalid credentials",
      AllFieldsRequired: "All fields are required",
      NotFound: "User not found",
      InternalServerError: "Internal Server Error",
      InvalidEmail: "Invalid email format",
    },
  },
  Review: {
    SuccessCreated: "Review created successfully",
    SuccessGet: "All Reviews fetched successfully",
    SuccessGetById: "Review fetched successfully",
    SuccessUpdate: "Review updated successfully",
    SuccessDeletion: "Review deleted successfully",
    Error: {
      NotFound: "Review not found",
      AllFieldsRequired: "All fields are required",
      InternalServerError: "Internal Server Error",
      InvalidDateTime:
        "Invalid date/time format. Use YYYY-MM-DD for date and HH:MM for time",
    },
  },
  Event: {
    SuccessCreation: "Event created successfully",
    SuccessGet: "All Events fetched successfully",
    SuccessGetById: "Event fetched successfully",
    SuccessUpdate: "Event updated successfully",
    SuccessDeletion: "Event deleted successfully",
    Error: {
      NotFound: "Event not found",
      AllFieldsRequired: "All fields are required",
      
      InternalServerError: "Internal Server Error",
      InvalidDateTime:
        "Invalid date/time format. Use YYYY-MM-DD for date and HH:MM for time",
        
    },
  },
  Registration: {
    SuccessRegistration: "Student registered for the event successfully",
    SuccessDeletion: "Registration deleted successfully",
    SuccessGetById: "Registration fetched successfully",
    SuccessGet: "Registrations fetched successfully",
    Error: {
      MentorNotFound: "Mentor not found",
      MemberNotFound: "Member not found", 
      AllFieldsRequired: "All fields are required",
      InternalServerError: "Internal Server Error",
      NotFound: "Registration not found",
      AlreadyRegistered: "User already registered for this event",
    },
  },
  Team: {
    SuccessCreation: "Team created successfully",
    SuccessGet: "All Teams fetched successfully",
    SuccessGetById: "Team fetched successfully",
    SuccessUpdate: "Team updated successfully",
    SuccessDeletion: "Team deleted successfully",
    Error: {
      NotFound: "Team not found",
      AllFieldsRequired: "All fields are required",
      InternalServerError: "Internal Server Error",
      InvalidDateTime:
        "Invalid date/time format. Use YYYY-MM-DD for date and HH:MM for time",
    },  
  },
  Project: {
    SuccessCreation: "Project created successfully",
    SuccessGet: "All Projects fetched successfully",
    SuccessGetById: "Project fetched successfully",
    SuccessUpdate: "Project updated successfully",
    SuccessDeletion: "Project deleted successfully",
    Error: {
      NotFound: "Project not found",
      AllFieldsRequired: "All fields are required",
      InternalServerError: "Internal Server Error",
      InvalidDateTime:
        "Invalid date/time format. Use YYYY-MM-DD for date and HH:MM for time",
    },
  },
  Report: {
    SuccessCreation: "Report created successfully",
    SuccessGet: "All Reports fetched successfully",
    SuccessGetById: "Report fetched successfully",
    SuccessUpdate: "Report updated successfully",
    SuccessDeletion: "Report deleted successfully",
    Error: {
      NotFound: "Report not found",
      AllFieldsRequired: "All fields are required",
      InternalServerError: "Internal Server Error",
      InvalidDateTime:
        "Invalid date/time format. Use YYYY-MM-DD for date and HH:MM for time",
    },
  },
  Feedback: {
    SuccessCreation: "Feedback created successfully",
    SuccessGet: "All Feedbacks fetched successfully",
    SuccessGetById: "Feedback fetched successfully",
    SuccessUpdate: "Feedback updated successfully",
    SuccessDeletion: "Feedback deleted successfully",
    Error: {
      NotFound: "Feedback not found",
      AllFieldsRequired: "All fields are required",
      InternalServerError: "Internal Server Error",
      InvalidDateTime:
        "Invalid date/time format. Use YYYY-MM-DD for date and HH:MM for time",
    },
  },
  Update: {
    SuccessCreated: "Update created successfully",
    SuccessGet: "All Updates fetched successfully",
    SuccessGetById: "Update fetched successfully",
    SuccessUpdate: "Update updated successfully",
    SuccessDeletion: "Update deleted successfully",
    Error: {
      NotFound: "Update not found",
      AllFieldsRequired: "All fields are required",
      InternalServerError: "Internal Server Error",
      InvalidDateTime:
        "Invalid date/time format. Use YYYY-MM-DD for date and HH:MM for time",
    },
  },
  Member: {
    SuccessCreation: "Member created successfully",
    SuccessGet: "All Members fetched successfully",
    SuccessGetById: "Member fetched successfully",
    SuccessUpdate: "Member updated successfully",
    SuccessDeletion: "Member deleted successfully",
    SuccessRetrieval: "Members fetched successfully",
    Error: {
      AlreadyExists: "Member already exists",
      NotFound: "Member not found",
      AllFieldsRequired: "All fields are required",
      InternalServerError: "Internal Server Error",
      InvalidDateTime:
        "Invalid date/time format. Use YYYY-MM-DD for date and HH:MM for time",
    },
  },
};

module.exports.ResponseConstants = ResponseConstants;
