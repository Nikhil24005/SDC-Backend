import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Models
const testimonialSchema = new mongoose.Schema({
  name: String,
  designation: String,
  company: String,
  message: String,
  image: String,
  rating: { type: Number, default: 5 },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const gallerySchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  category: String,
  date: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
const Gallery = mongoose.model('Gallery', gallerySchema);

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Testimonial.deleteMany({});
    await Gallery.deleteMany({});
    console.log('Cleared existing testimonial and gallery data');

    // Seed Testimonials
    const testimonialsData = [
      {
        name: 'Nikhil Sharma',
        designation: 'Full Stack Developer',
        company: 'Tech Company',
        message: 'SDC has been instrumental in my growth as a developer. The community support and resources are unmatched!',
        rating: 5,
        order: 1,
        isActive: true
      },
      {
        name: 'Sarah Johnson',
        designation: 'UI/UX Designer',
        company: 'Design Studio',
        message: 'Working with the SDC community was an amazing experience. The team is talented and supportive!',
        rating: 5,
        order: 2,
        isActive: true
      },
      {
        name: 'Alex Kumar',
        designation: 'Software Engineer',
        company: 'Google',
        message: 'The SDC community helped me land my job at Google. Highly recommend to anyone!',
        rating: 5,
        order: 3,
        isActive: true
      },
      {
        name: 'Emma Davis',
        designation: 'Product Manager',
        company: 'Microsoft',
        message: 'Great community for learning and networking. The events are informative and well-organized.',
        rating: 5,
        order: 4,
        isActive: true
      },
      {
        name: 'David Wilson',
        designation: 'DevOps Engineer',
        company: 'AWS',
        message: 'SDC provided the perfect platform to collaborate with like-minded developers.',
        rating: 5,
        order: 5,
        isActive: true
      }
    ];

    const createdTestimonials = await Testimonial.insertMany(testimonialsData);
    console.log(`✅ Created ${createdTestimonials.length} testimonials`);

    // Seed Gallery
    const galleryData = [
      {
        title: 'Annual Hackathon 2024',
        description: 'Participants showcasing their amazing projects at our annual hackathon',
        category: 'HACKATHON',
        date: new Date('2024-06-15'),
        order: 1,
        isActive: true
      },
      {
        title: 'Web Development Workshop',
        description: 'Hands-on workshop on modern web development with React',
        category: 'WORKSHOP',
        date: new Date('2024-05-20'),
        order: 2,
        isActive: true
      },
      {
        title: 'Monthly Meetup - January',
        description: 'SDC members networking and sharing knowledge at monthly meetup',
        category: 'MEETUP',
        date: new Date('2024-01-15'),
        order: 3,
        isActive: true
      },
      {
        title: 'AI/ML Bootcamp',
        description: 'Intensive bootcamp on Artificial Intelligence and Machine Learning',
        category: 'WORKSHOP',
        date: new Date('2024-04-01'),
        order: 4,
        isActive: true
      },
      {
        title: 'Tech Conference 2024',
        description: 'Annual technology conference with industry experts',
        category: 'EVENT',
        date: new Date('2024-03-10'),
        order: 5,
        isActive: true
      },
      {
        title: 'Community Volunteering',
        description: 'SDC community members volunteering in local tech initiatives',
        category: 'EVENT',
        date: new Date('2024-02-28'),
        order: 6,
        isActive: true
      }
    ];

    const createdGallery = await Gallery.insertMany(galleryData);
    console.log(`✅ Created ${createdGallery.length} gallery items`);

    console.log('\n✅ Testimonials and Gallery seeded successfully!');
    console.log('Testimonials count:', await Testimonial.countDocuments());
    console.log('Gallery count:', await Gallery.countDocuments());

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
