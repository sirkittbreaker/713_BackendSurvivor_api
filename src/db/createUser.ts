import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// English names data
const firstNames = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Thomas",
  "Charles",
  "Emma",
  "Olivia",
  "Ava",
  "Isabella",
  "Sophia",
  "Mia",
  "Charlotte",
  "Amelia",
  "Harper",
  "Evelyn",
  "Alexander",
  "Benjamin",
  "Daniel",
  "Matthew",
  "Henry",
  "Sebastian",
  "Jack",
  "Owen",
  "Theodore",
  "Samuel",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Anderson",
  "Taylor",
  "Thomas",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Thompson",
  "White",
  "Harris",
  "Clark",
  "Lewis",
  "Robinson",
  "Walker",
  "Hall",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
];

// Helper functions
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName(): { firstName: string; lastName: string } {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { firstName, lastName };
}

export async function createUser() {
  const numSaltRounds = 10;

  // Create admin user
  console.log("Creating admin user...");
  await prisma.user.create({
    data: {
      username: "admin",
      password: await bcrypt.hash("admin123", numSaltRounds),
      profile:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      role: "ROLE_ADMIN",
    },
  });

  // Create initial teachers (teacher1 and teacher2)
  console.log("Creating initial teachers...");
  await prisma.user.create({
    data: {
      username: "teacher1",
      password: await bcrypt.hash("password1", numSaltRounds),
      profile:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      role: "ROLE_TEACHER",
      teacher: {
        create: {
          firstName: "Adil",
          lastName: "Summers",
          academicPositionId: 1,
          departmentId: 1,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      username: "teacher2",
      password: await bcrypt.hash("password2", numSaltRounds),
      profile:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      role: "ROLE_TEACHER",
      teacher: {
        create: {
          firstName: "Jamal",
          lastName: "de Leon",
          academicPositionId: 1,
          departmentId: 1,
        },
      },
    },
  });

  // Create additional teachers starting from teacher3
  console.log("Creating additional teachers...");
  for (let i = 3; i <= 20; i++) {
    const departmentId = getRandomInt(1, 9);
    const academicPositionId = getRandomInt(1, 10);
    const { firstName, lastName } = getRandomName();

    await prisma.user.create({
      data: {
        username: `teacher${i}`,
        password: await bcrypt.hash("password1", numSaltRounds),
        profile:
          "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
        role: "ROLE_TEACHER",
        teacher: {
          create: {
            firstName,
            lastName,
            academicPositionId,
            departmentId,
          },
        },
      },
    });
    console.log(`Created teacher ${i}/20: ${firstName} ${lastName}`);
  }

  // Create initial student
  console.log("\nCreating initial student...");
  await prisma.user.create({
    data: {
      username: "689999999",
      password: await bcrypt.hash("password1", numSaltRounds),
      profile:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      role: "ROLE_STUDENT",
      student: {
        create: {
          studentId: "689999999",
          firstName: "Jakub",
          lastName: "Wise",
          departmentId: 1,
          teacherId: 1,
        },
      },
    },
  });

  // Create additional students
  console.log("\nCreating additional students...");
  for (let i = 1; i <= 100; i++) {
    const studentId = (680000000 + i).toString();
    const departmentId = getRandomInt(1, 9);
    const { firstName, lastName } = getRandomName();

    await prisma.user.create({
      data: {
        username: studentId,
        password: await bcrypt.hash("password1", numSaltRounds),
        profile:
          "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
        role: "ROLE_STUDENT",
        student: {
          create: {
            studentId,
            firstName,
            lastName,
            departmentId,
          },
        },
      },
    });

    if (i % 10 === 0) {
      console.log(`Created ${i}/100 students`);
    }
  }

  console.log("\n✅ Database seeding completed!");
  console.log("- Created 1 admin user");
  console.log("- Created 20 teachers");
  console.log("- Created 101 students");
}
