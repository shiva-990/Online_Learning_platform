import React, { useState } from 'react';

interface DashboardProps {
  isDarkMode: boolean;
}

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  image: string;
  price: string;
  instructor: string;
  rating: number;
  totalStudents: number;
  isPremium: boolean;
  type: 'free' | 'premium';
  resources?: string[];
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  enrolledCourses: number;
  completedCourses: number;
  totalStudyHours: number;
  streak: number;
  achievements: string[];
  subscription: 'free' | 'premium';
}

const studentProfile: StudentProfile = {
  name: 'Himanth Sai',
  email: 'hr0977@srmist.edu.in',
  phone: '+91 9949059942',
  address: '123, Academic Avenue, India',
  enrolledCourses: 5,
  completedCourses: 2,
  totalStudyHours: 120,
  streak: 15,
  achievements: ['Quick Learner', 'Consistent Performer', 'Top Scorer'],
  subscription: 'free',
};

const courses: Course[] = [
  {
    id: '1',
    title: 'IIT JEE Complete Physics',
    category: 'IIT JEE',
    progress: 45,
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹100',
    instructor: 'Prof. Jagadeesh Kumar',
    rating: 4.8,
    totalStudents: 1200,
    isPremium: true,
    type: 'premium',
    resources: ['Study Notes', 'Practice Questions', 'Formula Sheets'],
    duration: '6 months',
    level: 'Advanced',
  },
  {
    id: '2',
    title: 'NEET Biology Foundation',
    category: 'NEET',
    progress: 75,
    image: 'https://images.pexels.com/photos/228057/pexels-photo-228057.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'free',
    instructor: 'Dr. Patel',
    rating: 4.9,
    totalStudents: 980,
    isPremium: false,
    type: 'free',
    resources: ['Study Notes', 'Previous Year Papers', 'Flashcards'],
    duration: '4 months',
    level: 'Intermediate',
  },
  {
    id: '3',
    title: 'UPSC General Studies',
    category: 'Government Exams',
    progress: 0,
    image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹100',
    instructor: 'Mr. Kumar',
    rating: 4.7,
    totalStudents: 2100,
    isPremium: true,
    type: 'premium',
    resources: ['Current Affairs Notes', 'Practice Questions', 'Summary Sheets'],
    duration: '8 months',
    level: 'Advanced',
  },
  {
    id: '4',
    title: 'Full Stack Development',
    category: 'Computer Science',
    progress: 30,
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹100',
    instructor: 'Prof. Jagadeesh Kumar',
    rating: 5,
    totalStudents: 1500,
    isPremium: true,
    type: 'premium',
    resources: ['Code Examples', 'Project Templates', 'Cheat Sheets'],
    duration: '5 months',
    level: 'Intermediate',
  },
  {
    id: '5',
    title: 'Data Structures and Algorithms',
    category: 'Computer Science',
    progress: 20,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'free',
    instructor: 'Mr. Vikram Singh',
    rating: 4.8,
    totalStudents: 2000,
    isPremium: false,
    type: 'free',
    resources: ['Problem Sets', 'Coding Challenges', 'Concept Notes'],
    duration: '3 months',
    level: 'Intermediate',
  },
  {
    id: '6',
    title: 'Data Science',
    category: 'Computer Science',
    progress: 10,
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹100',
    instructor: 'Dr. Priya Sharma',
    rating: 4.9,
    totalStudents: 800,
    isPremium: true,
    type: 'premium',
    resources: ['Datasets', 'Jupyter Notebooks', 'Summary Notes'],
    duration: '6 months',
    level: 'Advanced',
  },
];

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('goals');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [showDoubtModal, setShowDoubtModal] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [calendarEvents, setCalendarEvents] = useState([
    { id: '1', date: '2025-04-15', title: 'Physics Revision', time: '10:00 AM' },
    { id: '2', date: '2025-04-16', title: 'Chemistry Lab', time: '2:00 PM' },
    { id: '3', date: '2025-04-17', title: 'DSA Practice', time: '3:00 PM' },
  ]);
  const [selectedGoalCourse, setSelectedGoalCourse] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'batches', label: 'Batches', icon: '👥' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'doubts', label: 'Doubt Sessions', icon: '❓' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'library', label: 'Library', icon: '🏛️' },
    { id: 'progress', label: 'Progress', icon: '📈' },
    { id: 'downloads', label: 'Downloads', icon: '⬇️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const categories = ['all', 'IIT JEE', 'NEET', 'Government Exams', 'Computer Science'];
  const studentNeeds = ['Complete Syllabus', 'Score 90%+', 'Practice Tests', 'Clear Doubts'];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const recommendedCourses = () => {
    if (!selectedGoalCourse) return [];
    const course = courses.find(c => c.title === selectedGoalCourse);
    if (!course) return [];
    return courses.filter(c => c.category === course.category && c.title !== selectedGoalCourse).slice(0, 3);
  };

  const renderBackButton = () => (
    <button
      onClick={() => setActiveTab('goals')}
      className={`flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors ${
        isDarkMode ? 'text-blue-400 hover:text-blue-300' : ''
      }`}
    >
      <span className="text-lg">←</span>
      <span className="font-medium">Back to Dashboard</span>
    </button>
  );

  const renderProfileSection = () => (
    <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl mb-8 transition-all duration-300`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-2xl text-white font-bold">{studentProfile.name[0]}</span>
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {studentProfile.name}
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {studentProfile.email}
            </p>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-600'} hover:bg-opacity-80 transition-colors`} title="Notifications">
            🔔
          </button>
          <button
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-600'} hover:bg-opacity-80 transition-colors`}
            title="Messages"
            onClick={() => setShowDoubtModal(true)}
          >
            💬
          </button>
          <button
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-600'} hover:bg-opacity-80 transition-colors`}
            title="Edit Profile"
            onClick={() => setShowProfileEdit(true)}
          >
            ✏️
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Enrolled Courses', value: studentProfile.enrolledCourses, color: 'blue' },
          { label: 'Completed', value: studentProfile.completedCourses, color: 'green' },
          { label: 'Study Hours', value: `${studentProfile.totalStudyHours}h`, color: 'purple' },
          { label: 'Daily Streak', value: `${studentProfile.streak} days`, color: 'yellow' },
        ].map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : `bg-${stat.color}-50`} transition-all duration-300`}
          >
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {studentProfile.achievements.map((achievement, index) => (
          <div
            key={index}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-600'
            }`}
          >
            <span>🏆</span>
            <span className="text-sm">{achievement}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfileEditModal = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${showProfileEdit ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-60" onClick={() => setShowProfileEdit(false)}></div>
      <div className={`relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl transform transition-transform duration-300 ${showProfileEdit ? 'scale-100' : 'scale-95'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Edit Profile</h2>
        <div className="space-y-4">
          {['Name', 'Email', 'Phone', 'Address'].map((field, index) => (
            <div key={index}>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {field}
              </label>
              {field === 'Address' ? (
                <textarea
                  defaultValue={studentProfile[field.toLowerCase() as keyof StudentProfile]}
                  className={`mt-1 block w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} p-2 focus:ring-2 focus:ring-blue-500 transition-colors`}
                  rows={3}
                ></textarea>
              ) : (
                <input
                  type={field === 'Email' ? 'email' : field === 'Phone' ? 'tel' : 'text'}
                  defaultValue={studentProfile[field.toLowerCase() as keyof StudentProfile]}
                  className={`mt-1 block w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} p-2 focus:ring-2 focus:ring-blue-500 transition-colors`}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors`}
              onClick={() => setShowProfileEdit(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={() => {
                alert('Profile updated (mock implementation)');
                setShowProfileEdit(false);
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
        <button
          className={`absolute top-4 right-4 text-lg ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
          onClick={() => setShowProfileEdit(false)}
        >
          ×
        </button>
      </div>
    </div>
  );

  const renderSessionTimetable = () => (
    <div className={`mb-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transition-all duration-300`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Session Timetable
        </h3>
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          onClick={() => alert('Add new session (form not implemented)')}
        >
          Add Session
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className={`font-semibold text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }).map((_, index) => {
          const date = new Date(2025, 3, index + 1);
          const dateString = date.toISOString().split('T')[0];
          const events = calendarEvents.filter(e => e.date === dateString);
          return (
            <div
              key={index}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} h-24 overflow-y-auto hover:bg-opacity-80 transition-colors cursor-pointer`}
              onClick={() => alert(`Edit events for ${dateString} (form not implemented)`)}
            >
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {date.getDate()}
              </p>
              {events.map(event => (
                <div
                  key={event.id}
                  className={`text-xs p-1 mt-1 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-blue-100'}`}
                >
                  {event.title} <br /> {event.time}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderGoalsDashboard = () => (
    <div className={`mb-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transition-all duration-300`}>
      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Set Your Goals
      </h3>
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            Select Course
          </label>
          <select
            value={selectedGoalCourse}
            onChange={(e) => setSelectedGoalCourse(e.target.value)}
            className={`block w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 transition-colors`}
          >
            <option value="">Choose a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.title}>{course.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Your Needs
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {studentNeeds.map((need, index) => (
              <button
                key={index}
                onClick={() => alert(`Selected "${need}" for ${selectedGoalCourse || 'course'}`)}
                className={`px-4 py-3 rounded-lg text-sm font-medium ${
                  isDarkMode
                    ? selectedGoalCourse
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : selectedGoalCourse
                    ? 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                } transition-colors`}
                disabled={!selectedGoalCourse}
              >
                {need}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium ${
            selectedGoalCourse
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          } transition-colors`}
          disabled={!selectedGoalCourse}
          onClick={() => alert(`Confirmed goals for ${selectedGoalCourse}`)}
        >
          Confirm Goals
        </button>
        <div>
          <h4 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Current Goals (Example)
          </h4>
          {selectedGoalCourse ? (
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-all duration-300`}>
              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedGoalCourse}: Complete Syllabus
              </p>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Progress</span>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>50%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          ) : (
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Select a course and needs to set your goals.
            </p>
          )}
        </div>
        {selectedGoalCourse && (
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recommended Courses
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses().map(renderCourseCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCourseCard = (course: Course) => (
    <div
      key={course.id}
      className={`rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
    >
      <div className="relative h-48">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {course.category}
        </div>
        {course.isPremium && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <span className="mr-1">🔒</span> Premium
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-2`}>
          {course.title}
        </h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-400">★</span>
          <span className={`ml-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {course.rating} ({course.totalStudents} students)
          </span>
        </div>
        <div className="flex items-center mb-2">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=random`}
            alt={course.instructor}
            className="w-6 h-6 rounded-full"
          />
          <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {course.instructor}
          </span>
        </div>
        <div className="text-sm mb-4">
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Duration: {course.duration}
          </p>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Level: {course.level}
          </p>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Progress</span>
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          {course.resources?.map((resource, index) => (
            <button
              key={index}
              className={`w-full flex items-center justify-between p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              } transition-colors`}
              onClick={() => alert(`Accessing ${resource} for ${course.title}`)}
            >
              <span className="text-sm">{resource}</span>
              <span className="text-lg">→</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {course.price}
          </span>
          <button
            className={`py-3 px-6 rounded-lg font-medium transition-colors ${
              course.isPremium && studentProfile.subscription === 'free'
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={course.isPremium && studentProfile.subscription === 'free'}
            onClick={() => {
              setSelectedCourse(course);
              alert(`Enrolling in ${course.title}`);
            }}
          >
            {course.isPremium && studentProfile.subscription === 'free' ? 'Premium Only' : 'Enroll Now'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderDoubtModal = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${showDoubtModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-60" onClick={() => setShowDoubtModal(false)}></div>
      <div className={`relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl transform transition-transform duration-300 ${showDoubtModal ? 'scale-100' : 'scale-95'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Ask a Doubt</h2>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Select Subject
            </label>
            <select className={`block w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 transition-colors`}>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Mathematics</option>
              <option>Computer Science</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Your Question
            </label>
            <textarea
              className={`block w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 transition-colors`}
              rows={4}
              placeholder="Type your question here..."
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors`}
              onClick={() => setShowDoubtModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={() => alert('Question submitted (mock implementation)')}
            >
              Submit Question
            </button>
          </div>
        </div>
        <button
          className={`absolute top-4 right-4 text-lg ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
          onClick={() => setShowDoubtModal(false)}
        >
          ×
        </button>
      </div>
    </div>
  );

  const renderSettingsModal = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${showSettings ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-60" onClick={() => setShowSettings(false)}></div>
      <div className={`relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl overflow-y-auto max-h-[90vh] transform transition-transform duration-300 ${showSettings ? 'scale-100' : 'scale-95'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h2>
        <div className="space-y-6">
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Account Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Notifications
                </label>
                <div className="mt-2 space-y-2">
                  {['Course updates', 'Assignment reminders', 'Live class notifications'].map((option, index) => (
                    <label key={index} className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" defaultChecked />
                      <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Language
                </label>
                <select className={`block w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 transition-colors`}>
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Time Zone
                </label>
                <select className={`block w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 transition-colors`}>
                  <option>Asia/Kolkata (IST)</option>
                  <option>UTC</option>
                  <option>America/New_York</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Subscription
            </h3>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-all duration-300`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Current Plan: <span className="font-semibold">{studentProfile.subscription === 'premium' ? 'Premium' : 'Free'}</span>
              </p>
              {studentProfile.subscription === 'free' && (
                <div className="mt-4">
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Upgrade to Premium to unlock:
                  </p>
                  <ul className={`text-sm space-y-1 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• Access to all premium courses</li>
                    <li>• Unlimited doubt solving sessions</li>
                    <li>• Personalized study plan</li>
                    <li>• Download study materials</li>
                  </ul>
                  <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    Upgrade to Premium
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Privacy
            </h3>
            <div className="space-y-2">
              {['Show my profile to other students', 'Allow teachers to message me directly'].map((option, index) => (
                <label key={index} className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" defaultChecked />
                  <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <button
          className={`absolute top-4 right-4 text-lg ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
          onClick={() => setShowSettings(false)}
        >
          ×
        </button>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activeTab) {
      case 'goals':
        return renderGoalsDashboard();
      case 'courses':
        return (
          <>
            {renderBackButton()}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Explore Courses
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} focus:ring-2 focus:ring-blue-500 transition-colors`}
                    />
                    <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>🔍</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? (
                filteredCourses.map(renderCourseCard)
              ) : (
                <p className={`text-center col-span-full text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No courses found. Try a different search or category.
                </p>
              )}
            </div>
          </>
        );
      case 'schedule':
        return (
          <>
            {renderBackButton()}
            {renderSessionTimetable()}
          </>
        );
      default:
        return (
          <>
            {renderBackButton()}
            <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transition-all duration-300`}>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                This section is under development. Check back soon!
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-64 flex-shrink-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl overflow-y-auto transition-colors duration-300`}>
        <div className="p-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-all duration-300`}>
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {studentProfile.name}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Student
            </p>
          </div>
        </div>
        <nav className="mt-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'settings') {
                  setShowSettings(true);
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium ${
                activeTab === item.id
                  ? isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-blue-50 text-blue-600'
                  : isDarkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 mt-auto">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-all duration-300`}>
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              About Learning Hub
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Your comprehensive platform for online education, offering courses across various fields.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">
          {renderProfileSection()}
          {renderMainContent()}
        </div>
      </div>

      {renderSettingsModal()}
      {renderDoubtModal()}
      {renderProfileEditModal()}
    </div>
  );
};

export default Dashboard;