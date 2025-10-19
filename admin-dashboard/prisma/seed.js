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

  // Create sample Page Sections (editable static content)
  const pageSections = [
    {
      key: 'hero',
      data: JSON.stringify({
        title: "Hi, I'm Shawn.",
        subtitle: 'Full-stack developer focused on clean UX, performance, and delightful UI.',
        imageUrl: 'https://placehold.co/800x800/png?text=Shawn',
      }),
    },
    {
      key: 'about',
      data: JSON.stringify({
        heading: 'About Me',
        subheading: 'Building modern web experiences',
        paragraphs: [
          'I craft responsive, accessible, and performant web apps with a focus on user experience.',
          'My toolbox includes TypeScript, React, Next.js, Node.js and a healthy dose of pragmatism.'
        ],
        imageUrl: 'https://placehold.co/800x600/png?text=About+Image'
      })
    },
    {
      key: 'books',
      data: JSON.stringify({
        title: 'Books & Poetry',
        subtitle: 'Inspiration and craft',
        items: [
          { title: 'Clean Architecture', blurb: 'Timeless architecture principles for resilient systems.' },
          { title: 'Refactoring UI', blurb: 'Practical tips to design beautiful UIs without relying on a designer.' },
          { title: 'Atomic Habits', blurb: 'Tiny changes, remarkable results.' }
        ],
        poetryHeading: 'Poetry Themes',
        poetryThemes: ['identity', 'growth', 'community'],
        philosophyTitle: 'Creative Philosophy',
        philosophyText: 'Simple, accessible, and purpose-driven experiences—built iteratively with user feedback.'
      })
    },
    {
      key: 'featured',
      data: JSON.stringify({
        imageUrl: 'https://placehold.co/1200x800/png?text=Featured+Project',
        category: 'CASE STUDY',
        title: 'Charity Shopper Platform',
        description: 'A modern e-commerce experience connecting donors with local charity shops.',
        githubUrl: 'https://github.com/swoet/charity-shopper',
        liveUrl: 'https://example.com/charity-shopper'
      })
    },
    {
      key: 'about3d',
      data: JSON.stringify({
        title: '3D & Motion',
        subtitle: 'Subtle motion. Clear communication.',
        chips: ['GSAP', 'WebGL', 'Framer Motion', 'Canvas']
      })
    },
    {
      key: 'interlude',
      data: JSON.stringify({
        quote: 'Simplicity is the ultimate sophistication.',
        author: 'Leonardo da Vinci'
      })
    },
    {
      key: 'process',
      data: JSON.stringify({
        steps: [
          { title: 'Discover', points: ['Goals & constraints', 'User research', 'Technical scope'] },
          { title: 'Design', points: ['Wireframes', 'High-fidelity UI', 'Design systems'] },
          { title: 'Develop', points: ['Accessible, performant', 'Type-safe APIs', 'Robust testing'] },
          { title: 'Deliver', points: ['Deploy & monitor', 'Iterate on feedback', 'Documentation'] }
        ]
      })
    },
    {
      key: 'contact',
      data: JSON.stringify({
        title: 'Let\'s build something great',
        subtitle: 'Available for freelance and full-time opportunities',
        phone: '+254 700 000000',
        email: 'shawn@example.com',
        location: 'Nairobi, Kenya',
        socials: {
          github: 'https://github.com/swoet',
          linkedin: 'https://www.linkedin.com/in/shawn-mutogo',
          twitter: 'https://x.com/swoet'
        }
      })
    }
  ];

  for (const section of pageSections) {
    await prisma.pageSection.upsert({
      where: { key: section.key },
      update: { data: section.data },
      create: section,
    });
    console.log(`✅ Created page section: ${section.key}`);
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