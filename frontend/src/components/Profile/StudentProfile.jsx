import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { 
  User, Mail, Phone, Calendar, BookOpen, GraduationCap, 
  MapPin, Briefcase, Github, Linkedin, Edit, Save, X 
} from 'lucide-react';

const StudentProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // GET: Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/student/profile', {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        setProfile(res.data);
        setEditData({
          mobile: res.data.mobile,
          residential_address: res.data.residential_address,
          bio: res.data.bio,
          portfolio: res.data.portfolio,
          github_profile: res.data.github_profile,
          linkedin_profile: res.data.linkedin_profile
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchProfile();
    }
  }, [user]);

  // PUT: Save updated profile
  const handleSave = async () => {
    try {
      const res = await axios.put('/api/student/profile', editData, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      setProfile(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Error updating profile.");
    }
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditData({
      mobile: profile.mobile,
      residential_address: profile.residential_address,
      bio: profile.bio,
      portfolio: profile.portfolio,
      github_profile: profile.github_profile,
      linkedin_profile: profile.linkedin_profile
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Student</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profile.department} - Year {profile.year}
                </p>
              </div>
              <div className="flex gap-2">
                {editing && (
                  <button onClick={handleCancel} className="btn btn-secondary flex items-center gap-2">
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
        {/* Personal Info */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Personal Information
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mobile</p>
                  {editing ? (
                    <input
                      type="text"
                      value={editData.mobile}
                      onChange={(e) => handleChange('mobile', e.target.value)}
                      className="form-input mt-1"
                    />
                  ) : (
                    <p className="font-medium">{profile.mobile}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="h-5 w-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                  <p className="font-medium">
                    {new Date(profile.date_of_birth).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <BookOpen className="h-5 w-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Registration Number</p>
                  <p className="font-medium">{profile.reg_no}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <GraduationCap className="h-5 w-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Academic Details</p>
                  <p className="font-medium">{profile.department}</p>
                  <p className="text-sm">Year {profile.year}, Section {profile.section}</p>
                  <p className="text-sm">CGPA: {profile.cgpa}</p>
                </div>
              </div>

              <div className="flex items-start text-gray-600 dark:text-gray-300">
                <MapPin className="h-5 w-5 mr-3 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                  {editing ? (
                    <textarea
                      value={editData.residential_address}
                      onChange={(e) => handleChange('residential_address', e.target.value)}
                      className="form-input mt-1"
                      rows="2"
                    />
                  ) : (
                    <p className="font-medium">{profile.residential_address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Bio</h3>
            {editing ? (
              <textarea
                value={editData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="form-input"
                rows="4"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Links & Social
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Portfolio</label>
                {editing ? (
                  <input
                    type="url"
                    value={editData.portfolio}
                    onChange={(e) => handleChange('portfolio', e.target.value)}
                    className="form-input mt-1"
                    placeholder="https://your-portfolio.com"
                  />
                ) : (
                  <a
                    href={profile.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 mt-1"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    View Portfolio
                  </a>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">GitHub</label>
                {editing ? (
                  <input
                    type="url"
                    value={editData.github_profile}
                    onChange={(e) => handleChange('github_profile', e.target.value)}
                    className="form-input mt-1"
                    placeholder="https://github.com/username"
                  />
                ) : (
                  <a
                    href={profile.github_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 mt-1"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub Profile
                  </a>
                )}
              </div>

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
                    className="flex items-center text-blue-600 dark:text-blue-400 mt-1"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Stats
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Projects</span>
                <span className="font-semibold text-gray-900 dark:text-white">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Updates</span>
                <span className="font-semibold text-gray-900 dark:text-white">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Feedback Received</span>
                <span className="font-semibold text-gray-900 dark:text-white">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">CGPA</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{profile.cgpa}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
