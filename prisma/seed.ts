import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { slug: 'decentralized-freelance-marketplace' },
      update: {},
      create: {
        title: 'Decentralized Freelance Marketplace',
        slug: 'decentralized-freelance-marketplace',
        description: 'A blockchain-powered platform connecting freelancers and clients in a secure and transparent environment. Smart contracts automate job escrow and payouts, removing intermediaries so creators earn fairly.',
        coverUrl: 'https://placehold.co/1200x800/222/ffffff?text=Freelance+DApp',
        tags: JSON.stringify(['Web3', 'Solidity', 'Next.js', 'Smart Contracts']),
        url: 'https://demo-freelance-dapp.netlify.app',
        repoUrl: 'https://github.com/swoet/decentralized-freelance-marketplace',
        sortOrder: 1,
        published: true,
      },
    }),
    
    prisma.project.upsert({
      where: { slug: 'charity-shopper' },
      update: {},
      create: {
        title: 'Charity Shopper',
        slug: 'charity-shopper',
        description: 'A platform connecting donors with local charity shops, featuring modern UI and seamless user experience.',
        coverUrl: 'https://placehold.co/1200x800/232323/ff6b35?text=CHARITY+SHOPPER',
        tags: JSON.stringify(['React', 'E-commerce', 'Social Impact', 'Responsive']),
        url: 'https://charity-shopper.netlify.app',
        repoUrl: 'https://github.com/swoet/charity-shopper',
        sortOrder: 2,
        published: true,
      },
    }),

    prisma.project.upsert({
      where: { slug: 'red-notice' },
      update: {},
      create: {
        title: 'Red Notice',
        slug: 'red-notice',
        description: 'Advanced web application with interactive elements and responsive design.',
        coverUrl: 'https://placehold.co/1200x800/232323/ff6b35?text=RED+NOTICE',
        tags: JSON.stringify(['JavaScript', 'Web App', 'Responsive Design', 'Interactive']),
        url: 'https://red-notice-global.netlify.app',
        repoUrl: 'https://github.com/swoet/red-notice',
        sortOrder: 3,
        published: true,
      },
    }),

    prisma.project.upsert({
      where: { slug: 'techunity-global-os' },
      update: {},
      create: {
        title: 'TechUnity Global OS',
        slug: 'techunity-global-os',
        description: 'Innovative operating system platform with global connectivity features.',
        coverUrl: 'https://placehold.co/1200x800/232323/ff6b35?text=TECHUNITY+GLOBAL+OS',
        tags: JSON.stringify(['OS Development', 'System Programming', 'Global Connectivity']),
        url: 'https://techunity-global.netlify.app',
        repoUrl: 'https://github.com/swoet/techunity-os',
        sortOrder: 4,
        published: true,
      },
    }),
  ])

  // Create sample videos
  const videos = await Promise.all([
    prisma.video.upsert({
      where: { id: 'charity-shopper-demo' },
      update: {},
      create: {
        id: 'charity-shopper-demo',
        title: 'Charity Shopper Demo',
        description: 'Watch how I built a platform that connects donors with local charity shops, featuring modern UI and seamless user experience.',
        url: 'videos/charity-shopper-demo.mp4',
        thumbnailUrl: 'https://placehold.co/1200x800/232323/ff6b35?text=CHARITY+SHOPPER',
        published: true,
      },
    }),

    prisma.video.upsert({
      where: { id: 'red-notice-demo' },
      update: {},
      create: {
        id: 'red-notice-demo',
        title: 'Red Notice Demo',
        description: 'Explore the features and functionality of this advanced web application with interactive elements and responsive design.',
        url: 'videos/red-notice-demo.mp4',
        thumbnailUrl: 'https://placehold.co/1200x800/232323/ff6b35?text=RED+NOTICE',
        published: true,
      },
    }),

    prisma.video.upsert({
      where: { id: 'techunity-os-demo' },
      update: {},
      create: {
        id: 'techunity-os-demo',
        title: 'TechUnity Global OS Demo',
        description: 'See the innovative features and global connectivity of this cutting-edge operating system platform.',
        url: 'videos/techunity-os-demo.mp4',
        thumbnailUrl: 'https://placehold.co/1200x800/232323/ff6b35?text=TECHUNITY+GLOBAL+OS',
        published: true,
      },
    }),
  ])

  // Create CV sections
  const cvSections = await Promise.all([
    prisma.cVSection.upsert({
      where: { key: 'about' },
      update: {},
      create: {
        key: 'about',
        data: {
          name: 'Shawn Mutogo',
          title: 'Full Stack Developer & Blockchain Specialist',
          bio: "I'm a passionate 23-year-old Full Stack Developer, Blockchain specialist, and published author inspired by innovation and technology. As an ABMA CIOS graduate, I bring a unique blend of technical expertise and creative expression to every project.",
          location: 'Zimbabwe',
          email: 'shawnmutogo5@gmail.com',
          phone: '+263 788 302 692',
        },
      },
    }),

    prisma.cVSection.upsert({
      where: { key: 'skills' },
      update: {},
      create: {
        key: 'skills',
        data: {
          technical: ['Solidity', 'Ethers.js', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Hardhat', 'IPFS', 'Tailwind', 'Docker', 'CI/CD'],
          creative: ['Poetry', 'Novel Writing', 'Content Creation', 'Creative Direction'],
          languages: ['JavaScript', 'TypeScript', 'Solidity', 'Python', 'SQL'],
        },
      },
    }),

    prisma.cVSection.upsert({
      where: { key: 'experience' },
      update: {},
      create: {
        key: 'experience',
        data: {
          positions: [
            {
              title: 'Freelance Full Stack Developer',
              company: 'Self-Employed',
              period: '2022 - Present',
              description: 'Developing blockchain applications, smart contracts, and full-stack web solutions for various clients.',
              achievements: ['Built 10+ DApps', 'Smart contract auditing', 'Cross-chain development'],
            },
            {
              title: 'Blockchain Developer',
              company: 'Various Projects',
              period: '2021 - Present',
              description: 'Specialized in creating decentralized applications and smart contract solutions.',
              achievements: ['DeFi protocol development', 'NFT marketplace creation', 'Web3 integration'],
            },
          ],
        },
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`📚 Created ${projects.length} projects`)
  console.log(`🎥 Created ${videos.length} videos`)
  console.log(`📄 Created ${cvSections.length} CV sections`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })