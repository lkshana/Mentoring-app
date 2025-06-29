import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Award, 
  BookOpen,
  Users,
  MessageSquare,
  Edit,
  Save,
  X,
  Linkedin,
  Globe
} from 'lucide-react';

const MentorProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // In a real app, you'd fetch the full profile data from API
    // For now, we'll use the user data from auth context
    if (user) {
      setProfile({
        mentor_id: user.id,
        name: user.name || 'R Gayathri',
        email: user.email || 'gayathri@gmail.com',
        department: user.department || 'IT',
        employee_id: user.employee_id || 'EMP001',
        specialization: user.specialization || 'Web Development, Machine Learning',
        phone: user.phone || '+91 9876543210',
        experience: user.experience || '8 years',
        qualification: user.qualification || 'M.Tech in Computer Science',
        bio: user.bio || 'Experienced faculty member with expertise in web development and machine learning. Passionate about mentoring students and helping them achieve their academic and career goals.',
        linkedin_profile: user.linkedin_profile || 'https://linkedin.com/in/rgayathri',
        website: user.website || 'https://rgayathri-research.com',
        profile_picture: user.profile_picture || 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
        office_location: user.office_location || 'Room 204, IT Block',
        office_hours: user.office_hours || 'Mon-Fri: 10:00 AM - 4:00 PM'
      });
      setEditData({
        phone: user.phone || '+91 9876543210',
        specialization: user.specialization || 'Web Development, Machine Learning',
        bio: user.bio || 'Experienced faculty member with expertise in web development and machine learning.',
        linkedin_profile: user.linkedin_profile || 'https://linkedin.com/in/rgayathri',
        website: user.website || 'https://rgayathri-research.com',
        office_location: user.office_location || 'Room 204, IT Block',
        office_hours: user.office_hours || 'Mon-Fri: 10:00 AM - 4:00 PM'
      });
    }
    setLoading(false);
  }, [user]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // In a real app, you'd make an API call to update the profile
    setProfile(prev => ({ ...prev, ...editData }));
    setEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      phone: profile.phone,
      specialization: profile.specialization,
      bio: profile.bio,
      linkedin_profile: profile.linkedin_profile,
      website: profile.website,
      office_location: profile.office_location,
      office_hours: profile.office_hours
    });
    setEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <LoadingSpinner />;
  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={profile.profile_picture}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Faculty Mentor</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profile.department} Department
                </p>
              </div>
              <div className="flex gap-2">
                {editing && (
                  <button
                    onClick={handleCancel}
                    className="btn btn-secondary flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                )}
                <button
                  onClick={editing ? handleSave : handleEdit}
                  className="btn btn-primary flex items-center gap-2"
                >
                  {editing ? (
                    <>
                      <Save className="h-4 w-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Professional Information */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Professional Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="h-5 w-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="h-5 w-5 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  {editing ? (
                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="form-input mt-1"
                    />
                  ) : (
                    <p className="font-medium">{profile.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Building className="h-5 w-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Employee ID</p>
                  <p className="font-medium">{profile.employee_id}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Award className="h-5 w-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                  <p className="font-medium">{profile.experience}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <BookOpen className="h-5 w-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Qualification</p>
                  <p className="font-medium">{profile.qualification}</p>
                </div>
              </div>

              <div className="flex items-start text-gray-600 dark:text-gray-300">
                <Award className="h-5 w-5 mr-3 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Specialization</p>
                  {editing ? (
                    <textarea
                      value={editData.specialization}
                      onChange={(e) => handleChange('specialization', e.target.value)}
                      className="form-input mt-1"
                      rows="2"
                    />
                  ) : (
                    <p className="font-medium">{profile.specialization}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start text-gray-600 dark:text-gray-300">
                <Building className="h-5 w-5 mr-3 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Office Location</p>
                  {editing ? (
                    <input
                      type="text"
                      value={editData.office_location}
                      onChange={(e) => handleChange('office_location', e.target.value)}
                      className="form-input mt-1"
                    />
                  ) : (
                    <p className="font-medium">{profile.office_location}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start text-gray-600 dark:text-gray-300">
                <User className="h-5 w-5 mr-3 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Office Hours</p>
                  {editing ? (
                    <input
                      type="text"
                      value={editData.office_hours}
                      onChange={(e) => handleChange('office_hours', e.target.value)}
                      className="form-input mt-1"
                    />
                  ) : (
                    <p className="font-medium">{profile.office_hours}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6 pt-6 border-t dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">About</h3>
            {editing ? (
              <textarea
                value={editData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="form-input"
                rows="4"
                placeholder="Tell us about your expertise and mentoring approach..."
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Links and Stats */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Professional Links
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</label>
                {editing ? (
                  <input
                    type="url"
                    value={editData.linkedin_profile}
                    onChange={(e) => handleChange('linkedin_profile', e.target.value)}
                    className="form-input mt-1"
                    placeholder="https://linkedin.com/in/username"
                  />
                ) : (
                  <a
                    href={profile.linkedin_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mt-1"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn Profile
                  </a>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Website</label>
                {editing ? (
                  <input
                    type="url"
                    value={editData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    className="form-input mt-1"
                    placeholder="https://your-website.com"
                  />
                ) : (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mt-1"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Personal Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Mentoring Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Mentoring Stats
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Active Projects
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Feedback Given
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300 flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Students Mentored
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Years of Experience
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">8</span>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Contact Information</h2>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {profile.email}
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {profile.phone}
              </p>
              <p className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                {profile.office_location}
              </p>
              <p className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {profile.office_hours}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;