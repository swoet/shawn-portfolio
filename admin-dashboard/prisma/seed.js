const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.',
      image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
      github_url: 'https://github.com/swoet/ecommerce-platform',
      live_url: 'https://ecommerce-demo.swoet.dev',
      tags: JSON.stringify(['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL']),
      featured: true
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop interface, and team collaboration features.',
      image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      github_url: 'https://github.com/swoet/task-manager',
      live_url: 'https://tasks.swoet.dev',
      tags: JSON.stringify(['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI']),
      featured: true
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that displays current conditions, forecasts, and interactive weather maps using various APIs.',
      image_url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      github_url: 'https://github.com/swoet/weather-dashboard',
      live_url: 'https://weather.swoet.dev',
      tags: JSON.stringify(['Vue.js', 'OpenWeather API', 'Chart.js', 'SCSS']),
      featured: true
    }
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
    console.log(`✅ Created project: ${project.title}`);
  }

  // Create sample videos
  const videos = [
    {
      title: 'E-Commerce Platform Demo',
      description: 'A comprehensive walkthrough of the e-commerce platform features, including user registration, product browsing, and checkout process.',
      video_url: '/videos/ecommerce-demo.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop'
    },
    {
      title: 'Task Manager Tutorial',
      description: 'Learn how to effectively use the task management application with this detailed tutorial covering all major features.',
      video_url: '/videos/task-manager-tutorial.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop'
    },
    {
      title: 'Weather Dashboard Overview',
      description: 'An overview of the weather dashboard showing how to navigate different features and customize your weather experience.',
      video_url: '/videos/weather-dashboard.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=450&fit=crop'
    }
  ];

  for (const video of videos) {
    await prisma.video.create({ data: video });
    console.log(`✅ Created video: ${video.title}`);
  }

  // Create sample CV sections
  const cvSections = [
    {
      section_type: 'experience',
      title: 'Senior Full Stack Developer',
      content: 'Led development of multiple web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.',
      start_date: new Date('2022-01-01'),
      end_date: null, // Current position
      organization: 'TechCorp Solutions',
      location: 'Remote',
      order: 1
    },
    {
      section_type: 'experience',
      title: 'Frontend Developer',
      content: 'Developed responsive web applications using React and Vue.js. Implemented modern UI/UX designs and ensured cross-browser compatibility.',
      start_date: new Date('2020-06-01'),
      end_date: new Date('2021-12-31'),
      organization: 'Digital Agency Inc',
      location: 'Nairobi, Kenya',
      order: 2
    },
    {
      section_type: 'education',
      title: 'Bachelor of Science in Computer Science',
      content: 'Focused on software engineering principles, data structures, algorithms, and web development technologies.',
      start_date: new Date('2016-09-01'),
      end_date: new Date('2020-05-31'),
      organization: 'University of Nairobi',
      location: 'Nairobi, Kenya',
      order: 1
    },
    {
      section_type: 'skills',
      title: 'Technical Skills',
      content: 'JavaScript, TypeScript, React, Next.js, Vue.js, Node.js, Python, PostgreSQL, MongoDB, AWS, Docker, Git',
      order: 1
    }
  ];

  for (const section of cvSections) {
    await prisma.cVSection.create({ data: section });
    console.log(`✅ Created CV section: ${section.title}`);
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });