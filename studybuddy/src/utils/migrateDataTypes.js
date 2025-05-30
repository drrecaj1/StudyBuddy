// One-time migration script used to fix data type inconsistencies
// Usage: node src/utils/migrateDataTypes.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/studybuddy';
const client = new MongoClient(uri);

async function migrate() {
    try {
        await client.connect();
        const db = client.db('studybuddy');
        const users = db.collection('users');

        console.log('🔄 Starting data type migration...');

        // Get all users to check current data types
        const allUsers = await users.find({}).toArray();
        console.log(`Found ${allUsers.length} users to potentially migrate`);

        let migratedCount = 0;

        for (const user of allUsers) {
            const updates = {};
            let needsUpdate = false;

            // Fix environment field - convert strings to arrays
            if (user.environment && typeof user.environment === 'string') {
                updates.environment = [user.environment];
                needsUpdate = true;
                console.log(`Converting environment "${user.environment}" to array for user ${user.email}`);
            }

            // Fix availability field - convert strings to arrays
            if (user.availability && typeof user.availability === 'string') {
                updates.availability = [user.availability];
                needsUpdate = true;
                console.log(`Converting availability "${user.availability}" to array for user ${user.email}`);
            }

            // Apply updates if needed
            if (needsUpdate) {
                await users.updateOne(
                    { _id: user._id },
                    { $set: updates }
                );
                migratedCount++;
            }
        }

        console.log(`✅ Migration completed! Updated ${migratedCount} users`);

        // Verify the migration
        console.log('\n🔍 Verifying migration results...');
        const verifyUsers = await users.find({}).toArray();

        let stringEnvironments = 0;
        let stringAvailability = 0;

        verifyUsers.forEach(user => {
            if (user.environment && typeof user.environment === 'string') {
                stringEnvironments++;
            }
            if (user.availability && typeof user.availability === 'string') {
                stringAvailability++;
            }
        });

        if (stringEnvironments === 0 && stringAvailability === 0) {
            console.log('✅ All fields are now arrays - migration successful!');
        } else {
            console.log(`⚠️  Still found ${stringEnvironments} string environments and ${stringAvailability} string availabilities`);
        }

    } catch (err) {
        console.error('❌ Error during migration:', err);
    } finally {
        await client.close();
    }
}

migrate();