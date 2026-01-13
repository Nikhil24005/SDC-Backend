import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Models
const peopleSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  designation: String,
  category: String,
  bio: String,
  image: String,
  linkedIn: String,
  github: String,
  twitter: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  shortDescription: String,
  category: String,
  technologies: [String],
  images: [String],
  thumbnail: String,
  githubUrl: String,
  liveUrl: String,
  startDate: Date,
  endDate: Date,
  status: String,
  isFeatured: Boolean,
  teamMembers: [String],
  order: { type: Number, default: 0 }
}, { timestamps: true });

const People = mongoose.model('People', peopleSchema);
const Project = mongoose.model('Project', projectSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await People.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data');

    // Seed People
    const peopleData = [
      {
        name: 'Nikhil Sharma',
        email: 'nikhil@sdc.com',
        designation: 'Founder & Lead Developer',
        category: 'TEAM',
        bio: 'Full-stack developer passionate about building communities',
        linkedIn: 'https://linkedin.com/in/nikhilsharma',
        github: 'https://github.com/nikhilsharma',
        order: 1,
        isActive: true
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@sdc.com',
        designation: 'UI/UX Designer',
        category: 'TEAM',
        bio: 'Creative designer with 5+ years experience',
        linkedIn: 'https://linkedin.com/in/sarahjohnson',
        github: 'https://github.com/sarahjohnson',
        order: 2,
        isActive: true
      },
      {
        name: 'Dr. Robert Wilson',
        email: 'robert@sdc.com',
        designation: 'Professor',
        category: 'FACULTY',
        bio: 'Computer Science professor mentoring the community',
        linkedIn: 'https://linkedin.com/in/robertwilson',
        order: 1,
        isActive: true
      },
      {
        name: 'Alex Kumar',
        email: 'alex@sdc.com',
        designation: 'Software Engineer',
        category: 'GOLDEN_ALUMNI',
        bio: 'Graduated 2015, now at Google',
        company: 'Google',
        package: '45 LPA',
        graduationYear: 2015,
        linkedIn: 'https://linkedin.com/in/alexkumar',
        github: 'https://github.com/alexkumar',
        order: 1,
        isActive: true
      },
      {
        name: 'Emma Davis',
        email: 'emma@sdc.com',
        designation: 'Product Manager',
        category: 'GOLDEN_ALUMNI',
        bio: 'Class of 2016, Product Manager at Microsoft',
        company: 'Microsoft',
        package: '38 LPA',
        graduationYear: 2016,
        linkedIn: 'https://linkedin.com/in/emmadavis',
        order: 2,
        isActive: true
      },
      {
        name: 'Rahul Verma',
        email: 'rahul@sdc.com',
        designation: 'Senior Software Engineer',
        category: 'GOLDEN_ALUMNI',
        bio: 'Class of 2014, Working at Amazon',
        company: 'Amazon',
        package: '42 LPA',
        graduationYear: 2014,
        linkedIn: 'https://linkedin.com/in/rahulverma',
        github: 'https://github.com/rahulverma',
        order: 3,
        isActive: true
      },
      {
        name: 'Priya Singh',
        email: 'priya@sdc.com',
        designation: 'Data Scientist',
        category: 'ALUMNI',
        bio: 'Class of 2020, Data Scientist at Flipkart',
        company: 'Flipkart',
        package: '18 LPA',
        graduationYear: 2020,
        linkedIn: 'https://linkedin.com/in/priyasingh',
        order: 1,
        isActive: true
      },
      {
        name: 'Arjun Patel',
        email: 'arjun@sdc.com',
        designation: 'Frontend Developer',
        category: 'ALUMNI',
        bio: 'Class of 2021, Frontend Developer at Paytm',
        company: 'Paytm',
        package: '15 LPA',
        graduationYear: 2021,
        linkedIn: 'https://linkedin.com/in/arjunpatel',
        github: 'https://github.com/arjunpatel',
        order: 2,
        isActive: true
      },
      {
        name: 'Ananya Gupta',
        email: 'ananya@sdc.com',
        designation: 'Backend Developer',
        category: 'ALUMNI',
        bio: 'Class of 2019, Backend Developer at Zomato',
        company: 'Zomato',
        package: '20 LPA',
        graduationYear: 2019,
        linkedIn: 'https://linkedin.com/in/ananyagupta',
        order: 3,
        isActive: true
      }
    ];

    const createdPeople = await People.insertMany(peopleData);
    console.log(`✅ Created ${createdPeople.length} people`);

    // Seed Projects
    const projectsData = [
      {
        title: 'Community Website',
        description: 'A modern website for SDC community to showcase projects and connect members',
        shortDescription: 'Community platform for developers',
        category: 'Web Development',
        technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        status: 'COMPLETED',
        isFeatured: true,
        githubUrl: 'https://github.com/sdc/website',
        liveUrl: 'https://sdc-community.com',
        teamMembers: ['Nikhil Sharma', 'Sarah Johnson'],
        order: 1
      },
      {
        title: 'Mobile App',
        description: 'Native mobile application for iOS and Android with offline support',
        shortDescription: 'Cross-platform mobile app',
        category: 'Mobile Development',
        technologies: ['React Native', 'Firebase', 'Redux'],
        status: 'COMPLETED',
        isFeatured: true,
        githubUrl: 'https://github.com/sdc/mobile-app',
        teamMembers: ['Alex Kumar', 'Nikhil Sharma'],
        order: 2
      },
      {
        title: 'AI Chat Bot',
        description: 'Intelligent chatbot for community support and answering FAQs',
        shortDescription: 'AI-powered chatbot',
        category: 'AI/ML',
        technologies: ['Python', 'TensorFlow', 'FastAPI'],
        status: 'ONGOING',
        isFeatured: true,
        githubUrl: 'https://github.com/sdc/chatbot',
        teamMembers: ['Nikhil Sharma'],
        order: 3
      },
      {
        title: 'Learning Platform',
        description: 'Interactive online learning platform with courses and quizzes',
        shortDescription: 'E-learning platform',
        category: 'Education',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        status: 'COMPLETED',
        isFeatured: false,
        githubUrl: 'https://github.com/sdc/learning-platform',
        liveUrl: 'https://learn.sdc-community.com',
        teamMembers: ['Sarah Johnson', 'Emma Davis'],
        order: 4
      },
      {
        title: 'Data Analytics Dashboard',
        description: 'Real-time analytics dashboard for community insights',
        shortDescription: 'Analytics dashboard',
        category: 'Data Science',
        technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
        status: 'COMPLETED',
        isFeatured: false,
        githubUrl: 'https://github.com/sdc/analytics',
        teamMembers: ['Alex Kumar'],
        order: 5
      }
    ];

    const createdProjects = await Project.insertMany(projectsData);
    console.log(`✅ Created ${createdProjects.length} projects`);

    console.log('\n✅ Database seeded successfully!');
    console.log('People count:', await People.countDocuments());
    console.log('Projects count:', await Project.countDocuments());

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
