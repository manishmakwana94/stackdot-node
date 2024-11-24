const DegreeModel = require("../models/degree");
const ExamModel = require("../models/exam");
const InstituteTypeModel = require("../models/institute-type");
const UniversityModel = require("../models/university");

const fs = require("fs");
const path = require("path");

const dotenv = require('dotenv');

const seedDatabase = async () => {
  console.log('Seeding default records...');

  // Institutes
  const instituteTypes = ['Playhouse', 'School', 'College', 'Competitive Exam'];
  for (const type of instituteTypes) {
    const instituteEnem = type.toLowerCase().replace(/\s+/g, '-');
    await InstituteTypeModel.updateOne(
      { name: type }, // Filter
      { $set: { name: type, instituteEnem } }, // Update or set fields
      { upsert: true } // Create if not exists
    );
    console.log(`Ensured Institute type "${type}" exists or updated.`);
  }

  // Universities
  const universities = [
    'Harvard University',
    'Stanford University',
    'Indian Institute of Technology (IIT)',
    'University of Cambridge',
    'Massachusetts Institute of Technology (MIT)'
  ];
  for (const name of universities) {
    await UniversityModel.updateOne(
      { name }, 
      { $set: { name } },
      { upsert: true }
    );
    console.log(`Ensured University "${name}" exists or updated.`);
  }

  // Degrees
  const degrees = [
    { name: 'Bachelor of Science (B.Sc)', level: 'Bachelor' },
    { name: 'Bachelor of Arts (B.A)', level: 'Bachelor' },
    { name: 'Master of Science (M.Sc)', level: 'Master' },
    { name: 'Master of Business Administration (MBA)', level: 'Master' },
    { name: 'Doctor of Philosophy (Ph.D)', level: 'Doctorate' }
  ];
  for (const degree of degrees) {
    await DegreeModel.updateOne(
      { name: degree.name },
      { $set: degree }, // Update the document with the full `degree` object
      { upsert: true }
    );
    console.log(`Ensured Degree "${degree.name}" exists or updated.`);
  }

  // Exams
  const exams = [
    'JEE',
    'NEET',
    'CAT',
    'GRE',
  ];
  for (const name of exams) {
    await ExamModel.updateOne(
      { name },
      { $set: { name } },
      { upsert: true }
    );
    console.log(`Ensured Exam "${name}" exists or updated.`);
  }
    updateEnvFile("SEED_UPDATE", "false");
    console.log('Seeding completed.');
};


const updateEnvFile = (key, value) => {
  const envPath = path.resolve(process.cwd(), '.env');
  
  // Read the current .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check if the key already exists
  const keyRegex = new RegExp(`^${key}=.*`, 'm');
  if (envContent.match(keyRegex)) {
    // Replace the existing key-value pair
    envContent = envContent.replace(keyRegex, `${key}=${value}`);
  } else {
    // Append the new key-value pair
    envContent += `\n${key}=${value}`;
  }
  
  // Write back to the .env file
  fs.writeFileSync(envPath, envContent, 'utf8');
  
  console.log(`${key} updated to ${value} in .env file`);

  dotenv.config();
};


module.exports = seedDatabase;
