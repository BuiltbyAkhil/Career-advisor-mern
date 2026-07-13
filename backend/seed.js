require('dotenv').config();
const mongoose = require('mongoose');
const College = require('./models/College');

// Dynamically defining Resource model since it wasn't in the strict folder list
const resourceSchema = new mongoose.Schema({
    title: String,
    url: String,
    type: String
});
const Resource = mongoose.model('Resource', resourceSchema);

const colleges = [
    { name: 'IIT Madras', location: { city: 'Chennai', state: 'Tamil Nadu' }, type: 'Government', ranking: 1, established: 1959 },
    { name: 'IIT Delhi', location: { city: 'New Delhi', state: 'Delhi' }, type: 'Government', ranking: 2, established: 1961 },
    { name: 'IIT Bombay', location: { city: 'Mumbai', state: 'Maharashtra' }, type: 'Government', ranking: 3, established: 1958 },
    { name: 'IIT Kanpur', location: { city: 'Kanpur', state: 'Uttar Pradesh' }, type: 'Government', ranking: 4, established: 1959 },
    { name: 'IIT Kharagpur', location: { city: 'Kharagpur', state: 'West Bengal' }, type: 'Government', ranking: 5, established: 1951 },
    { name: 'IIT Roorkee', location: { city: 'Roorkee', state: 'Uttarakhand' }, type: 'Government', ranking: 6, established: 1847 },
    { name: 'IIT Guwahati', location: { city: 'Guwahati', state: 'Assam' }, type: 'Government', ranking: 7, established: 1994 },
    { name: 'IIT Hyderabad', location: { city: 'Hyderabad', state: 'Telangana' }, type: 'Government', ranking: 8, established: 2008 },
    { name: 'NIT Trichy', location: { city: 'Tiruchirappalli', state: 'Tamil Nadu' }, type: 'Government', ranking: 9, established: 1964 },
    { name: 'BITS Pilani', location: { city: 'Pilani', state: 'Rajasthan' }, type: 'Private', ranking: 10, established: 1964 },
    { name: 'Vellore Institute of Technology', location: { city: 'Vellore', state: 'Tamil Nadu' }, type: 'Private', ranking: 11, established: 1984 },
    { name: 'NIT Surathkal', location: { city: 'Mangalore', state: 'Karnataka' }, type: 'Government', ranking: 12, established: 1960 },
    { name: 'Anna University', location: { city: 'Chennai', state: 'Tamil Nadu' }, type: 'Government', ranking: 13, established: 1978 },
    { name: 'Jadavpur University', location: { city: 'Kolkata', state: 'West Bengal' }, type: 'Government', ranking: 14, established: 1955 },
    { name: 'IIT Indore', location: { city: 'Indore', state: 'Madhya Pradesh' }, type: 'Government', ranking: 15, established: 2009 },
    { name: 'NIT Warangal', location: { city: 'Warangal', state: 'Telangana' }, type: 'Government', ranking: 16, established: 1959 },
    { name: 'IIIT Hyderabad', location: { city: 'Hyderabad', state: 'Telangana' }, type: 'Private', ranking: 17, established: 1998 },
    { name: 'Delhi Technological University', location: { city: 'New Delhi', state: 'Delhi' }, type: 'Government', ranking: 18, established: 1941 },
    { name: 'SRM Institute of Science and Technology', location: { city: 'Chennai', state: 'Tamil Nadu' }, type: 'Private', ranking: 19, established: 1985 },
    { name: 'Amrita Vishwa Vidyapeetham', location: { city: 'Coimbatore', state: 'Tamil Nadu' }, type: 'Private', ranking: 20, established: 1994 },
    { name: 'IIT BHU', location: { city: 'Varanasi', state: 'Uttar Pradesh' }, type: 'Government', ranking: 21, established: 1919 },
    { name: 'IIT Dhanbad', location: { city: 'Dhanbad', state: 'Jharkhand' }, type: 'Government', ranking: 22, established: 1926 },
    { name: 'NIT Rourkela', location: { city: 'Rourkela', state: 'Odisha' }, type: 'Government', ranking: 23, established: 1961 },
    { name: 'IIT Mandi', location: { city: 'Mandi', state: 'Himachal Pradesh' }, type: 'Government', ranking: 24, established: 2009 },
    { name: 'IIT Patna', location: { city: 'Patna', state: 'Bihar' }, type: 'Government', ranking: 25, established: 2008 },
    { name: 'IIT Ropar', location: { city: 'Rupnagar', state: 'Punjab' }, type: 'Government', ranking: 26, established: 2008 },
    { name: 'NIT Calicut', location: { city: 'Kozhikode', state: 'Kerala' }, type: 'Government', ranking: 27, established: 1961 },
    { name: 'Manipal Institute of Technology', location: { city: 'Manipal', state: 'Karnataka' }, type: 'Private', ranking: 28, established: 1957 },
    { name: 'IIT Gandhinagar', location: { city: 'Gandhinagar', state: 'Gujarat' }, type: 'Government', ranking: 29, established: 2008 },
    { name: 'IIT Jodhpur', location: { city: 'Jodhpur', state: 'Rajasthan' }, type: 'Government', ranking: 30, established: 2008 },
    { name: 'Thapar Institute of Engineering and Technology', location: { city: 'Patiala', state: 'Punjab' }, type: 'Private', ranking: 31, established: 1956 },
    { name: 'NIT Kurukshetra', location: { city: 'Kurukshetra', state: 'Haryana' }, type: 'Government', ranking: 32, established: 1963 },
    { name: 'NIT Durgapur', location: { city: 'Durgapur', state: 'West Bengal' }, type: 'Government', ranking: 33, established: 1960 },
    { name: 'NIT Silchar', location: { city: 'Silchar', state: 'Assam' }, type: 'Government', ranking: 34, established: 1967 },
    { name: 'IIT Bhubaneswar', location: { city: 'Bhubaneswar', state: 'Odisha' }, type: 'Government', ranking: 35, established: 2008 },
    { name: 'MNIT Jaipur', location: { city: 'Jaipur', state: 'Rajasthan' }, type: 'Government', ranking: 36, established: 1963 },
    { name: 'MANIT Bhopal', location: { city: 'Bhopal', state: 'Madhya Pradesh' }, type: 'Government', ranking: 37, established: 1960 },
    { name: 'VNIT Nagpur', location: { city: 'Nagpur', state: 'Maharashtra' }, type: 'Government', ranking: 38, established: 1960 },
    { name: 'IIIT Bangalore', location: { city: 'Bangalore', state: 'Karnataka' }, type: 'Private', ranking: 39, established: 1999 },
    { name: 'RV College of Engineering', location: { city: 'Bangalore', state: 'Karnataka' }, type: 'Private', ranking: 40, established: 1963 },
    { name: 'BMS College of Engineering', location: { city: 'Bangalore', state: 'Karnataka' }, type: 'Private', ranking: 41, established: 1946 },
    { name: 'COEP Pune', location: { city: 'Pune', state: 'Maharashtra' }, type: 'Government', ranking: 42, established: 1854 },
    { name: 'VJTI Mumbai', location: { city: 'Mumbai', state: 'Maharashtra' }, type: 'Government', ranking: 43, established: 1887 },
    { name: 'PSG College of Technology', location: { city: 'Coimbatore', state: 'Tamil Nadu' }, type: 'Private', ranking: 44, established: 1951 },
    { name: 'MS Ramaiah Institute of Technology', location: { city: 'Bangalore', state: 'Karnataka' }, type: 'Private', ranking: 45, established: 1962 },
    { name: 'KIIT Bhubaneswar', location: { city: 'Bhubaneswar', state: 'Odisha' }, type: 'Private', ranking: 46, established: 1992 },
    { name: 'SSN College of Engineering', location: { city: 'Chennai', state: 'Tamil Nadu' }, type: 'Private', ranking: 47, established: 1996 },
    { name: 'NSUT Delhi', location: { city: 'New Delhi', state: 'Delhi' }, type: 'Government', ranking: 48, established: 1983 },
    { name: 'PEC Chandigarh', location: { city: 'Chandigarh', state: 'Chandigarh' }, type: 'Government', ranking: 49, established: 1921 },
    { name: 'BIT Mesra', location: { city: 'Ranchi', state: 'Jharkhand' }, type: 'Private', ranking: 50, established: 1955 }
];

const resources = [
    { title: "CS50: Introduction to Computer Science", url: "https://pll.harvard.edu/course/cs50-introduction-computer-science", type: "course" },
    { title: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", type: "course" },
    { title: "Machine Learning by Andrew Ng", url: "https://www.coursera.org/learn/machine-learning", type: "course" },
    { title: "freeCodeCamp", url: "https://www.freecodecamp.org/", type: "course" },
    { title: "The Odin Project", url: "https://www.theodinproject.com/", type: "course" },
    { title: "Codecademy Web Development", url: "https://www.codecademy.com/", type: "course" },
    { title: "MDN Web Docs", url: "https://developer.mozilla.org/", type: "article" },
    { title: "LeetCode", url: "https://leetcode.com/", type: "article" },
    { title: "HackerRank", url: "https://www.hackerrank.com/", type: "article" },
    { title: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/", type: "article" },
    { title: "Codeforces", url: "https://codeforces.com/", type: "article" },
    { title: "Frontend Mentor", url: "https://www.frontendmentor.io/", type: "article" },
    { title: "Pluralsight", url: "https://www.pluralsight.com/", type: "video" },
    { title: "Clean Code by Robert C. Martin", url: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882", type: "book" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding...');

        await College.deleteMany({});
        await Resource.deleteMany({});
        console.log('Cleared existing colleges and resources');

        await College.insertMany(colleges);
        await Resource.insertMany(resources);

        console.log('Successfully seeded 50 colleges and 14 resources!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
