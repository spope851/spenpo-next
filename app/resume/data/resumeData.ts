import { ResumeSection } from '../types'

export const resumeData: ResumeSection[] = [
  {
    title: 'Skills',
    content: {
      type: 'text',
      textContent: [
        {
          label: 'Languages',
          text: 'TypeScript, JavaScript, HTML, CSS, Python, SQL',
        },
        {
          label: 'Software/Frameworks',
          text: 'React.js, Next.js, Node.js, Svelte.js, PostgreSQL, SQL Server, MongoDB, .Net, Docker, AWS',
        },
      ],
    },
  },
  {
    title: 'Experience',
    defaultExpanded: true,
    content: {
      type: 'nested',
      nestedSections: [
        {
          title: 'Homeroom Teacher',
          linkTitle: 'Transformation Academy Shanghai',
          href: 'https://www.tasedu.com.cn',
          subTitle: '2024 - Present',
          details: [
            {
              text: 'Oversee all daily activities of 20 students in grade 4',
            },
            {
              text: 'Teach English lessons on speaking, writing, and reading comprehension',
            },
            {
              text: 'Teach History lessons on ancient times and provide the perspective of western education',
            },
            {
              text: 'Lead cultural activities that prepare the students for higher educations at western institutions',
            },
            {
              text: "Communicate the school's values to parents and provide daily updates on my class",
            },
          ],
        },
        {
          title: 'Technical Lead - Web Team',
          linkTitle: 'Blockchains Inc',
          href: 'https://www.blockchains.com',
          subTitle: '2022 - 2023',
          details: [
            {
              text: 'Articulate technical requirements to developers based on the intentions of product managers',
            },
            {
              text: 'Engage in long term planning with time horizons varying from two weeks to several quarters',
            },
            {
              text: 'Own the agile process and facilitate all scrum ceremonies',
            },
            {
              text: 'Own the frontend technology stack and make architectural decisions',
            },
            {
              text: 'Communicate the goals and progress of the team at all levels of the organization',
            },
            {
              title: 'Web Engineer',
              subTitle: '2021 - 2022',
            },
            {
              text: 'Integrate backend services with web applications, often developing in parallel with backend teams',
            },
            {
              text: 'Build appropriately flexible UI components from Figma designs',
            },
            {
              text: 'Manage global application state and local state at the feature level',
            },
            {
              text: 'Bootstraped new portal app using Next.js',
            },
            {
              text: 'Architected responsive layout using Material UI',
            },
          ],
        },
      ],
    },
  },
  {
    title: 'Achievements',
    content: {
      type: 'list',
      items: [
        {
          text: 'Built this site from scratch',
          year: '2022',
        },
        {
          text: 'First-degree black belt in karate',
          year: '2011',
        },
      ],
    },
  },
  {
    title: 'Certifications',
    content: {
      type: 'list',
      items: [
        {
          text: 'AWS Certified Cloud Practitioner',
          link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
          year: '2024',
          yearLink:
            'https://www.credly.com/badges/8e90c447-ebb4-4916-bf0e-3137783cf300/linked_in_profile',
        },
      ],
    },
  },
  {
    title: 'Formal Education',
    content: {
      type: 'nested',
      nestedSections: [
        {
          title: 'BS, Business Admin',
          linkTitle: 'University of New Hampshire',
          href: 'https://unh.edu',
          subTitle: '2015 - 2019',
          details: [
            {
              text: 'Studied Information Technology as a minor with the College of Engineering and Physical Sciences',
            },
            {
              text: 'Courses on web development, DBMS, coding in Python, internet protocols, and computer architecture',
              indent: 5,
            },
            // ... other details
          ],
        },
        {
          title: '',
          linkTitle: 'Beijing Language and Culture University',
          href: 'http://english.blcu.edu.cn/',
          subTitle: 'January 2019',
          details: [
            {
              text: 'Studied Mandarin 20 hours per week with the College of Intensive Chinese Language Studies',
            },
          ],
        },
      ],
    },
  },
]
