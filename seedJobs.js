import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/Job.js";
import User from "./models/User.js";

dotenv.config();

const jobs = [
  {
    title: "Software Developer",
    company: "TechNova Solutions",
    location: "Mumbai",
    salary: "₹5 - ₹8 LPA",
    jobType: "Full Time",
    description:
      "We are looking for a Software Developer to build, maintain and improve modern web applications.",
  },
  {
    title: "React Developer",
    company: "BrightByte Technologies",
    location: "Navi Mumbai",
    salary: "₹4 - ₹7 LPA",
    jobType: "Full Time",
    description:
      "Join our frontend team and develop responsive applications using React.js and modern UI technologies.",
  },
  {
    title: "Node.js Developer",
    company: "CloudMatrix Labs",
    location: "Pune",
    salary: "₹5 - ₹9 LPA",
    jobType: "Full Time",
    description:
      "Build scalable backend services and REST APIs using Node.js, Express and MongoDB.",
  },
  {
    title: "MERN Stack Developer",
    company: "CodeCraft India",
    location: "Mumbai",
    salary: "₹6 - ₹10 LPA",
    jobType: "Full Time",
    description:
      "Work across frontend and backend development using MongoDB, Express, React and Node.js.",
  },
  {
    title: "UI/UX Designer",
    company: "PixelPerfect Studio",
    location: "Remote",
    salary: "₹4 - ₹7 LPA",
    jobType: "Remote",
    description:
      "Create clean, intuitive and engaging digital experiences for web and mobile products.",
  },
  {
    title: "Data Analyst",
    company: "Insight Analytics",
    location: "Pune",
    salary: "₹4 - ₹8 LPA",
    jobType: "Full Time",
    description:
      "Analyze business data, create reports and dashboards, and provide meaningful insights.",
  },
  {
    title: "AI/ML Intern",
    company: "FutureAI Technologies",
    location: "Bangalore",
    salary: "₹15,000 - ₹25,000 / month",
    jobType: "Internship",
    description:
      "Work with the AI team on machine learning models, data preparation and experimentation.",
  },
  {
    title: "Frontend Developer",
    company: "WebSphere Digital",
    location: "Hyderabad",
    salary: "₹4 - ₹7 LPA",
    jobType: "Full Time",
    description:
      "Develop modern responsive interfaces using HTML, CSS, JavaScript and React.",
  },
  {
    title: "Backend Developer",
    company: "ServerStack Solutions",
    location: "Mumbai",
    salary: "₹5 - ₹9 LPA",
    jobType: "Full Time",
    description:
      "Design secure APIs and backend systems for high-performance applications.",
  },
  {
    title: "Software Testing Engineer",
    company: "QualityFirst Technologies",
    location: "Navi Mumbai",
    salary: "₹3.5 - ₹6 LPA",
    jobType: "Full Time",
    description:
      "Perform functional testing, regression testing and quality assurance for web applications.",
  },
  {
    title: "Digital Marketing Executive",
    company: "GrowthWave Media",
    location: "Mumbai",
    salary: "₹3 - ₹5 LPA",
    jobType: "Full Time",
    description:
      "Plan digital campaigns, manage social media and improve online brand visibility.",
  },
  {
    title: "Business Development Executive",
    company: "ConnectPro Services",
    location: "Thane",
    salary: "₹3 - ₹6 LPA",
    jobType: "Full Time",
    description:
      "Build client relationships, generate leads and support business growth initiatives.",
  },
  {
    title: "HR Executive",
    company: "PeopleFirst Group",
    location: "Mumbai",
    salary: "₹3 - ₹5.5 LPA",
    jobType: "Full Time",
    description:
      "Support recruitment, employee coordination, onboarding and HR operations.",
  },
  {
    title: "Java Developer",
    company: "EnterpriseSoft India",
    location: "Pune",
    salary: "₹5 - ₹9 LPA",
    jobType: "Full Time",
    description:
      "Develop enterprise applications using Java, Spring Boot and REST APIs.",
  },
  {
    title: "Python Developer",
    company: "DataForge Technologies",
    location: "Bangalore",
    salary: "₹5 - ₹9 LPA",
    jobType: "Full Time",
    description:
      "Develop Python-based applications, APIs and automation solutions.",
  },
  {
    title: "Mobile App Developer",
    company: "AppSphere Technologies",
    location: "Mumbai",
    salary: "₹4 - ₹8 LPA",
    jobType: "Full Time",
    description:
      "Develop and maintain modern Android and mobile applications.",
  },
  {
    title: "Cybersecurity Analyst",
    company: "SecureNet Systems",
    location: "Hyderabad",
    salary: "₹5 - ₹10 LPA",
    jobType: "Full Time",
    description:
      "Monitor security systems, investigate threats and support cybersecurity operations.",
  },
  {
    title: "Graphic Designer",
    company: "CreativeEdge Studio",
    location: "Navi Mumbai",
    salary: "₹3 - ₹5 LPA",
    jobType: "Full Time",
    description:
      "Design creative visual content for digital campaigns, websites and social media.",
  },
  {
    title: "Content Writer",
    company: "WriteWorks Media",
    location: "Remote",
    salary: "₹2.5 - ₹5 LPA",
    jobType: "Remote",
    description:
      "Create engaging website content, blogs, articles and marketing copy.",
  },
  {
    title: "Customer Support Executive",
    company: "HelpDesk Pro",
    location: "Thane",
    salary: "₹2.5 - ₹4.5 LPA",
    jobType: "Full Time",
    description:
      "Assist customers, resolve queries and provide excellent customer service.",
  },
  {
    title: "Business Analyst",
    company: "Strategic Minds",
    location: "Mumbai",
    salary: "₹5 - ₹9 LPA",
    jobType: "Full Time",
    description:
      "Analyze business requirements and work with teams to improve processes and products.",
  },
  {
    title: "Cloud Engineer",
    company: "CloudCore Technologies",
    location: "Bangalore",
    salary: "₹6 - ₹11 LPA",
    jobType: "Full Time",
    description:
      "Manage cloud infrastructure and support scalable cloud-based applications.",
  },
  {
    title: "DevOps Engineer",
    company: "DeployWorks",
    location: "Pune",
    salary: "₹6 - ₹12 LPA",
    jobType: "Full Time",
    description:
      "Automate deployments, manage CI/CD pipelines and improve application infrastructure.",
  },
  {
    title: "Database Administrator",
    company: "DataSecure Solutions",
    location: "Mumbai",
    salary: "₹5 - ₹9 LPA",
    jobType: "Full Time",
    description:
      "Manage databases, backups, performance and database security.",
  },
  {
    title: "Junior Web Developer",
    company: "WebNest Technologies",
    location: "Navi Mumbai",
    salary: "₹2.5 - ₹4.5 LPA",
    jobType: "Full Time",
    description:
      "Work with senior developers to build responsive websites and web applications.",
  },
  {
    title: "React Developer Intern",
    company: "StartupHub",
    location: "Remote",
    salary: "₹12,000 - ₹20,000 / month",
    jobType: "Internship",
    description:
      "Learn and contribute to real-world React projects while working with an experienced development team.",
  },
  {
    title: "Marketing Intern",
    company: "BrandBoost India",
    location: "Mumbai",
    salary: "₹10,000 - ₹18,000 / month",
    jobType: "Internship",
    description:
      "Assist with digital marketing campaigns, social media and content planning.",
  },
  {
    title: "Finance Executive",
    company: "FinEdge Services",
    location: "Thane",
    salary: "₹3 - ₹5.5 LPA",
    jobType: "Full Time",
    description:
      "Handle financial records, reporting and day-to-day finance operations.",
  },
  {
    title: "Product Manager",
    company: "InnovateLabs",
    location: "Bangalore",
    salary: "₹8 - ₹14 LPA",
    jobType: "Full Time",
    description:
      "Work with engineering, design and business teams to build successful digital products.",
  },
  {
    title: "Technical Support Engineer",
    company: "TechAssist Solutions",
    location: "Pune",
    salary: "₹3.5 - ₹6 LPA",
    jobType: "Full Time",
    description:
      "Provide technical assistance, troubleshoot issues and support customers and internal teams.",
  },
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const recruiter = await User.findOne({
      role: "recruiter",
    });

    if (!recruiter) {
      console.log("No recruiter account found.");
      process.exit(1);
    }

    console.log(`Using recruiter: ${recruiter.email}`);

    let added = 0;
    let skipped = 0;

    for (const jobData of jobs) {
      const existingJob = await Job.findOne({
        recruiterId: recruiter._id,
        title: jobData.title,
        company: jobData.company,
      });

      if (existingJob) {
        skipped++;
        continue;
      }

      await Job.create({
        recruiterId: recruiter._id,
        ...jobData,
      });

      added++;
    }

    console.log("--------------------------------");
    console.log(`Jobs added: ${added}`);
    console.log(`Jobs already existed: ${skipped}`);
    console.log("--------------------------------");
    console.log("Job seeding completed successfully.");

    process.exit(0);
  } catch (error) {
    console.error("SEED ERROR:", error.message);
    process.exit(1);
  }
};

seedJobs();