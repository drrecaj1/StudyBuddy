// Script to seed test users into MongoDB for presentation/demo
// Usage: node src/utils/seedTestUsers.js

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/studybuddy';
const client = new MongoClient(uri);

async function seed() {
    try {
        await client.connect();
        const db = client.db('studybuddy');
        const users = db.collection('users');

        // Test users with string-based fields
        const testUsersRaw = [
            {
                fullName: 'Alice Example',
                email: 'alice@example.com',
                university: 'Demo University',
                field: 'Computer Science',
                year: '1',
                courses: 'Math,Physics',
                interests: 'AI,ML',
                environment: 'Online',
                availability: 'Morning',
                password: 'Password123',
                createdAt: new Date(),
                termsAccepted: true, // <-- NEW: Add termsAccepted field
            },
            {
                fullName: 'Bob Example',
                email: 'bob@example.com',
                university: 'Sample College',
                field: 'Engineering',
                year: '2',
                courses: 'Chemistry,Biology',
                interests: 'Robotics,IoT',
                environment: 'On-Campus',
                availability: 'Afternoon',
                password: 'Password123',
                createdAt: new Date(),
                termsAccepted: true, // <-- NEW: Add termsAccepted field
            },
            {
                fullName: 'Charlie Example',
                email: 'charlie@example.com',
                university: 'Test Institute',
                field: 'Mathematics',
                year: '3',
                courses: 'Algebra,Statistics',
                interests: 'Data Science,Math',
                environment: 'Group-Setting',
                availability: 'Evening',
                password: 'Password123',
                createdAt: new Date(),
                termsAccepted: true, // <-- NEW: Add termsAccepted field
            },
            {
                fullName: 'Diana Demo',
                email: 'diana@example.com',
                university: 'Demo University',
                field: 'Physics',
                year: '4',
                courses: 'Physics,Math',
                interests: 'Quantum,Astro',
                environment: 'On-Campus',
                availability: 'Morning',
                password: 'Password123',
                createdAt: new Date(),
                termsAccepted: true, // <-- NEW: Add termsAccepted field
            },
            {
                fullName: 'Ethan Test',
                email: 'ethan@example.com',
                university: 'Sample College',
                field: 'Biology',
                year: '1',
                courses: 'Biology,Chemistry',
                interests: 'Genetics,Ecology',
                environment: 'Online',
                availability: 'Afternoon',
                password: 'Password123',
                createdAt: new Date(),
                termsAccepted: true, // <-- NEW: Add termsAccepted field
            },
            {
                fullName: 'Fiona Filter',
                email: 'fiona@example.com',
                university: 'Test Institute',
                field: 'Engineering',
                year: '2',
                courses: 'Robotics,Math',
                interests: 'AI,Robotics',
                environment: 'Group-Setting',
                availability: 'Evening',
                password: 'Password123',
                createdAt: new Date(),
                termsAccepted: true, // <-- NEW: Add termsAccepted field
            },
            {
                fullName: 'George Group',
                email: 'george@example.com',
                university: 'Demo University',
                field: 'Computer Science',
                year: '3',
                courses: 'Math,Programming',
                interests: 'ML,Programming',
                environment: 'Group-Setting',
                availability: 'Morning',
                password: 'Password123',
                createdAt: new Date(),
                termsAccepted: true, // <-- NEW: Add termsAccepted field
            },
            {
                fullName: 'Hannah Hybrid',
                email: 'hannah@example.com',
                university: 'Sample College',
                field: 'Physics',
                year: '4',
                courses: 'Physics,Math',
                interests: 'Astro,Quantum',
                environment: 'Online',
                availability: 'Afternoon',
                password: 'Password123',
                createdAt: new Date(),
                termsAccepted: true, // <-- NEW: Add termsAccepted field
            },
            {
                fullName: 'Ivan InPerson',
                email: 'ivan@example.com',
                university: 'Test Institute',
                field: 'Mathematics',
                year: '1',
                courses: 'Statistics,Algebra',
                interests: 'Math,Data Science',
                environment: 'On-Campus',
                availability: 'Evening',
                password: 'Password123',
                createdAt: new Date(),
                termsAccepted: true, // <-- NEW: Add termsAccepted field
            },
            {
                fullName: 'Julia Joiner',
                email: 'julia@example.com',
                university: 'Demo University',
                field: 'Engineering',
                year: '2',
                courses: 'Robotics,Physics',
                interests: 'Robotics,AI',
                environment: 'Online',
                availability: 'Morning',
                password: 'Password123',
                createdAt: new Date(),
                termsAccepted: true, // <-- NEW: Add termsAccepted field
            },
        ];

        // Transform into proper schema and hash passwords
        const testUsers = await Promise.all(
            testUsersRaw.map(async user => ({
                ...user,
                password: await bcrypt.hash(user.password, 10),
                courses: user.courses.split(',').map(c => c.trim()),
                interests: user.interests.split(',').map(i => i.trim()),
                // Convert single values to arrays for consistency
                environment: [user.environment.trim()],
                availability: [user.availability.trim()],
            }))
        );

        // Clean up existing test users
        await users.deleteMany({ email: { $in: testUsers.map(u => u.email) } });

        // Insert new ones
        await users.insertMany(testUsers);
        console.log('✅ Test users seeded successfully!');
    } catch (err) {
        console.error('❌ Error seeding test users:', err);
    } finally {
        await client.close();
    }
}

seed();