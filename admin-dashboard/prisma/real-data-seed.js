const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed with real portfolio data...');

  // Clear existing data
  await prisma.project.deleteMany({});
  await prisma.video.deleteMany({});
  await prisma.cVSection.deleteMany({});

  // Real featured projects from your portfolio
  const projects = [
    {
      title: 'Decentralized Freelance Marketplace',
      description: 'A blockchain-powered platform connecting freelancers and clients in a secure and transparent environment. Smart contracts automate job escrow and payouts, removing intermediaries so creators earn fairly. Features include decentralized payments, contract-backed milestones, user profiles with ratings, and an auditable history on-chain.',
      image_url: 'https://placehold.co/1200x800/222/ffffff?text=Project+Preview',
      github_url: 'https://github.com/swoet/decentralised-freelance-marketplace',
      live_url: null, // Hidden in your frontend
      tags: JSON.stringify(['Web3', 'Blockchain', 'Smart Contracts', 'React', 'Solidity', 'Freelance']),
      featured: true
    },
    {
      title: 'Charity Shopper',
      description: 'A platform that connects donors with local charity shops, featuring modern UI and seamless user experience. Built with e-commerce functionality and social impact focus.',
      image_url: 'https://placehold.co/1200x800/232323/ff6b35?text=CHARITY+SHOPPER',
      github_url: null, // Could be added from your GitHub repos
      live_url: 'https://charity-shopper.netlify.app/',
      tags: JSON.stringify(['E-commerce', 'Social Impact', 'React', 'JavaScript', 'Netlify']),
      featured: true
    },
    {
      title: 'Red Notice',
      description: 'An advanced web application with modern UI design, interactive features, and responsive layout for enhanced user engagement.',
      image_url: 'https://placehold.co/1200x800/232323/ff6b35?text=RED+NOTICE',
      github_url: null,
      live_url: 'https://red-notice-global.netlify.app/',
      tags: JSON.stringify(['Web Application', 'Interactive Design', 'Responsive', 'JavaScript']),
      featured: true
    },
    {
      title: 'TechUnity Global OS',
      description: 'An innovative operating system platform with global connectivity, advanced features, and cutting-edge technological integration.',
      image_url: 'https://placehold.co/1200x800/232323/ff6b35?text=TECHUNITY+GLOBAL+OS',
      github_url: null,
      live_url: 'https://techunity-global.netlify.app/',
      tags: JSON.stringify(['Operating System', 'Innovation', 'Global Connectivity', 'Advanced Tech']),
      featured: true
    }
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
    console.log(`✅ Created project: ${project.title}`);
  }

  // Real video data from your portfolio
  const videos = [
    {
      title: 'Charity Shopper Platform',
      description: 'Watch how I built a platform that connects donors with local charity shops, featuring modern UI and seamless user experience.',
      video_url: '/videos/charity-shopper.mp4',
      thumbnail_url: 'https://placehold.co/1200x800/232323/ff6b35?text=CHARITY+SHOPPER'
    },
    {
      title: 'Red Notice Web Application',
      description: 'Explore the features and functionality of this advanced web application with interactive elements and responsive design.',
      video_url: '/videos/red-notice.mp4',
      thumbnail_url: 'https://placehold.co/1200x800/232323/ff6b35?text=RED+NOTICE'
    },
    {
      title: 'TechUnity Global OS',
      description: 'See the innovative features and global connectivity of this cutting-edge operating system platform.',
      video_url: '/videos/techunity-os.mp4',
      thumbnail_url: 'https://placehold.co/1200x800/232323/ff6b35?text=TECHUNITY+GLOBAL+OS'
    }
  ];

  for (const video of videos) {
    await prisma.video.create({ data: video });
    console.log(`✅ Created video: ${video.title}`);
  }

  // Real CV sections based on your portfolio content
  const cvSections = [
    // Profile Section
    {
      section_type: 'profile',
      title: 'Full Stack Developer & Blockchain Specialist',
      content: 'Creative Engineer specializing in Web3 and Full-Stack development. I blend decentralized tech with human-centered design to build innovative solutions.',
      organization: null,
      location: null,
      start_date: null,
      end_date: null,
      order: 1
    },
    {
      section_type: 'profile',
      title: 'Published Author & Poet',
      content: 'Under the pen name Swoet Phethan, I have published two novels: "The Girl from My Dreams" and "The Last Origins". I also craft poetry exploring the intersection of technology, humanity, and emotion.',
      organization: null,
      location: null,
      start_date: null,
      end_date: null,
      order: 2
    },

    // Education
    {
      section_type: 'education',
      title: 'ABMA CIOS Graduate',
      content: 'Completed advanced studies in Computer and Information Systems, focusing on modern web technologies and software engineering principles.',
      organization: 'ABMA CIOS',
      location: null,
      start_date: null,
      end_date: null,
      order: 1
    },

    // Skills & Technologies
    {
      section_type: 'skills',
      title: 'Blockchain & Web3 Technologies',
      content: 'Solidity, Ethers.js, IPFS, Hardhat, Smart Contract Development, DApp Architecture, Decentralized Finance (DeFi)',
      organization: null,
      location: null,
      start_date: null,
      end_date: null,
      order: 1
    },
    {
      section_type: 'skills',
      title: 'Frontend & Full-Stack Development',
      content: 'Next.js, React.js, Node.js, JavaScript, TypeScript, Tailwind CSS, Responsive Design, Progressive Web Apps',
      organization: null,
      location: null,
      start_date: null,
      end_date: null,
      order: 2
    },
    {
      section_type: 'skills',
      title: 'Backend & Database Technologies',
      content: 'Node.js, Express.js, MongoDB, PostgreSQL, API Development, Server Architecture, Database Design',
      organization: null,
      location: null,
      start_date: null,
      end_date: null,
      order: 3
    },

    // Experience/Projects
    {
      section_type: 'experience',
      title: 'Decentralized Freelance Marketplace Developer',
      content: 'Architected and developed a blockchain-powered platform connecting freelancers and clients. Implemented smart contracts for automated escrow and payouts, removing intermediaries and ensuring fair creator compensation.',
      organization: 'Personal Project',
      location: 'Remote',
      start_date: new Date('2024-01-01'),
      end_date: null,
      order: 1
    },
    {
      section_type: 'experience',
      title: 'Full-Stack Developer - Social Impact Projects',
      content: 'Developed multiple web applications including Charity Shopper (connecting donors with charity shops), Red Notice platform, and TechUnity Global OS. Focused on creating meaningful solutions with modern UI/UX.',
      organization: 'Freelance',
      location: 'Remote',
      start_date: new Date('2023-01-01'),
      end_date: null,
      order: 2
    },

    // Creative Work
    {
      section_type: 'achievements',
      title: 'Published Author - "The Girl from My Dreams"',
      content: 'A captivating novel that weaves together elements of fantasy and reality, exploring the power of dreams and their impact on our waking lives.',
      organization: 'Published under Swoet Phethan',
      location: null,
      start_date: null,
      end_date: null,
      order: 1
    },
    {
      section_type: 'achievements',
      title: 'Published Author - "The Last Origins"',
      content: 'An epic tale that delves into the mysteries of human origins and the interconnectedness of all things, blending science fiction with philosophical depth.',
      organization: 'Published under Swoet Phethan',
      location: null,
      start_date: null,
      end_date: null,
      order: 2
    }
  ];

  for (const section of cvSections) {
    await prisma.cVSection.create({ data: section });
    console.log(`✅ Created CV section: ${section.title}`);
  }

  console.log('🎉 Database seeding completed with real portfolio data!');
  console.log('📊 Summary:');
  console.log(`   - ${projects.length} Featured Projects`);
  console.log(`   - ${videos.length} Video Demonstrations`);
  console.log(`   - ${cvSections.length} CV Sections`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });