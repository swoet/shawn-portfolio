import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding portfolio sections...');

  // Define all portfolio sections with their editable content
  const sections = [
    {
      key: 'hero',
      data: JSON.stringify({
        title: 'I AM A DIGITAL INNOVATOR<br>DRIVEN BY BLOCKCHAIN IDEAS<br>SHAPED BY CODE',
        subtitle: 'FULL STACK DEVELOPER & BLOCKCHAIN SPECIALIST',
        imageUrl: 'public/profile.jpg',
      }),
    },
    {
      key: 'about',
      data: JSON.stringify({
        heading: 'ABOUT ME & SOMETHING MORE',
        subheading: 'Hello! I am Shawn since I was born.',
        paragraphs: [
          "I'm a passionate 23-year-old Full Stack Developer, Blockchain specialist, and published author inspired by innovation and technology. As an ABMA CIOS graduate, I bring a unique blend of technical expertise and creative expression to every project.",
          '"My creative mind focuses on creating digital solutions with one purpose only: build platforms that will help people solve their problems, thanks to innovative blockchain technology and modern web development. Beyond code, I express myself through poetry and novels under my pen name Swoet Phethan."',
        ],
        imageUrl: 'public/profile.jpg',
        highlights: [
          { icon: '🎓', text: 'ABMA CIOS Graduate' },
          { icon: '📚', text: 'Published Author (2 Novels)' },
          { icon: '✍️', text: 'Poet (Pen Name: Swoet Phethan)' },
          { icon: '⚡', text: 'Blockchain & Cloud Specialist' },
        ],
      }),
    },
    {
      key: 'books',
      data: JSON.stringify({
        title: 'AUTHOR & POET',
        subtitle: 'Beyond Code: Creative Expression Through Words',
        items: [
          {
            title: '"The Girl from My Dreams"',
            blurb: 'A captivating novel that weaves together elements of fantasy and reality, exploring the power of dreams and their impact on our waking lives.',
          },
          {
            title: '"The Last Origins"',
            blurb: 'An epic tale that delves into the mysteries of human origins and the interconnectedness of all things, blending science fiction with philosophical depth.',
          },
        ],
        poetryHeading: 'POETRY & CREATIVE WRITING',
        poetryThemes: [
          'Digital landscapes and human connection',
          'The beauty found in code and algorithms',
          'Dreams as portals to innovation',
          'The poetry of problem-solving',
        ],
        philosophyTitle: 'CREATIVE PHILOSOPHY',
        philosophyText: '"I believe that creativity transcends mediums. Whether I\'m writing code or poetry, building applications or crafting stories, I\'m always seeking to solve problems and create meaningful connections. My technical work is informed by my creative writing, and my stories are enriched by my understanding of technology."',
      }),
    },
    {
      key: 'featured',
      data: JSON.stringify({
        category: 'WEB3 • FREELANCE PLATFORM',
        title: 'Decentralized Freelance Marketplace',
        description: 'A blockchain-powered platform connecting freelancers and clients in a secure and transparent environment. Smart contracts automate job escrow and payouts, removing intermediaries so creators earn fairly. Features include decentralized payments, contract-backed milestones, user profiles with ratings, and an auditable history on-chain.',
        imageUrl: 'public/craft-nexus-cover.png',
        githubUrl: 'https://github.com/swoet/decentralised-freelance-marketplace',
        liveUrl: '#',
      }),
    },
    {
      key: 'about3d',
      data: JSON.stringify({
        title: 'CREATIVE ENGINEER • WEB3 & FULL-STACK',
        subtitle: 'I blend decentralized tech with human-centered design. Here are a few things that orbit my craft.',
        chips: ['Solidity', 'Ethers.js', 'Next.js', 'Node.js', 'MongoDB', 'IPFS', 'Hardhat', 'Tailwind'],
      }),
    },
    {
      key: 'interlude',
      data: JSON.stringify({
        quote: '"Between code and verse, I build worlds—some decentralized, some dreamt."',
        author: '– Shawn Mutogo',
      }),
    },
    {
      key: 'process',
      data: JSON.stringify({
        title: 'HOW DO I WORK?',
        subtitle: 'Four steps in my process',
        steps: [
          {
            title: 'DISCOVER & ALIGN',
            points: [
              'Define goals, constraints, and success metrics',
              'Map user journeys and real-world use-cases',
              'Validate Web3 feasibility and value',
            ],
          },
          {
            title: 'ARCHITECT & PROTOTYPE',
            points: [
              'Design system, data models, and smart-contract flows',
              'Wireframes to interactive prototypes',
              'Risk assessment and security-first planning',
            ],
          },
          {
            title: 'BUILD & TEST',
            points: [
              'Clean, maintainable code with best practices',
              'Comprehensive testing (unit, integration, e2e)',
              'Smart contract audits and security reviews',
            ],
          },
          {
            title: 'DEPLOY & ITERATE',
            points: [
              'Smooth deployment with zero downtime',
              'Monitor performance and user feedback',
              'Continuous improvement and feature updates',
            ],
          },
        ],
      }),
    },
    {
      key: 'contact',
      data: JSON.stringify({
        title: "LET'S CREATE SOMETHING MEANINGFUL TOGETHER.",
        subtitle: 'Interested in discussing a blockchain project or partnership? Simply want to have a chat? Just call or send a mail!',
        phone: '+27 79 123 4567',
        email: 'shawn@example.com',
        location: 'South Africa',
        socials: {
          github: 'https://github.com/swoet',
          linkedin: 'https://linkedin.com/in/shawn-mutogo',
          twitter: 'https://twitter.com/shawnmutogo',
        },
      }),
    },
    {
      key: 'parallax-hero',
      data: JSON.stringify({
        orbitItems: [
          { key: 'blockchain', imageUrl: 'public/techunity-cover.webp', alt: 'Blockchain', position: 'left:5%; top:15%;', fixed: true },
          { key: 'coding', imageUrl: 'public/charity-cover.webp', alt: 'Coding', position: 'right:8%; top:20%;', fixed: true },
          { key: 'red-notice', imageUrl: 'public/red-notice-cover.webp', alt: 'Red Notice', position: 'left:12%; bottom:12%;' },
          { key: 'craft-nexus', imageUrl: 'public/craft-nexus-cover.png', alt: 'Craft Nexus', position: 'right:10%; bottom:10%;' },
        ],
        centerImage: 'public/profile.jpg',
      }),
    },
    {
      key: 'project-breakdown',
      data: JSON.stringify({
        backgroundImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        components: [
          { imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop', label: 'UI', alt: 'UI Design' },
          { imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop', label: 'API', alt: 'API Development' },
          { imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop', label: 'Deploy', alt: 'Cloud Deployment' },
          { imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop', label: 'Dev', alt: 'Developer Workspace' },
          { imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=400&h=400&fit=crop', label: 'CMS', alt: 'Content Management' },
        ],
        steps: [
          {
            key: 'UI',
            title: 'Interface You Can Feel',
            description: 'Responsive UI with motion that guides, not distracts. Built with semantic HTML, accessible patterns and buttery interactions.',
          },
          {
            key: 'API',
            title: 'Smart Contracts & APIs',
            description: 'Contract-backed flows and typed APIs. Reliability and transparency from wallet connect to payout.',
          },
          {
            key: 'Deploy',
            title: 'Global Delivery',
            description: 'Deployed on performant edges, image optimization, prefetching, and zero-downtime releases.',
          },
        ],
      }),
    },
    {
      key: 'build-up-reveal',
      data: JSON.stringify({
        imageUrl: 'public/red-notice-cover.webp',
        alt: 'Full UI Mockup',
      }),
    },
    {
      key: 'text-mask-video',
      data: JSON.stringify({
        backgroundImage: 'public/charity-cover.webp',
        text: 'BUILD WITH SHAWN',
      }),
    },
  ];

  // Upsert all sections
  for (const section of sections) {
    await prisma.pageSection.upsert({
      where: { key: section.key },
      update: { data: section.data },
      create: section,
    });
    console.log(`✅ Seeded section: ${section.key}`);
  }

  console.log('🎉 All sections seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding sections:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
