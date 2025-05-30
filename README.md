# Study Buddy Application

Welcome to the Study Buddy application! This project is a multi-step registration and login system with user profile management, designed to connect students for study purposes.

## Academic Note for Professor

**Important**: This is a collaborative group project with equal contribution from all team members. While the Git repository shows commits primarily under one account (Dea), this is due to technical Git access limitations faced by team members. The actual work distribution was as follows:

- **Dea** (Repository Manager): Frontend Development + Git Integration
- **Art**: Backend Development 
- **Dita**: Database Design & Implementation

Even though main tasks were seperated, our team collaborated closely on each component especially setting up the API routes which proved to be the most challenging part of this project. We provided mutual support and provided equally to the project's success. Files were shared and integrated by Dea due to Git repository access constraints, but the development effort represents true collaborative teamwork with balanced participation from all members.





## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Getting Started](#2-getting-started)
   * [Option A: Cloning the Repository (Recommended for Developers)](#option-a-cloning-the-repository-recommended-for-developers)
   * [Option B: Downloading the Zipped File from GitHub](#option-b-downloading-the-zipped-file-from-github)
   * [Installing Dependencies](#installing-dependencies)
3. [Database Setup (MongoDB)](#3-database-setup-mongodb)
   * [Option A: MongoDB Atlas (Recommended for Cloud)](#option-a-mongodb-atlas-recommended-for-cloud)
   * [Option B: Local MongoDB Server (For Local Development)](#option-b-local-mongodb-server-for-local-development)
4. [Environment Variables](#4-environment-variables)
5. [Running the Application](#5-running-the-application)
6. [Seeding Test Data](#6-seeding-test-data)
7. [Project Structure Overview](#7-project-structure-overview)

---

## 1. Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/) (LTS version recommended, e.g., 18.x or 20.x)
* **npm** (Node Package Manager) or **Yarn**: npm comes with Node.js. If you prefer Yarn, [install Yarn](https://yarnpkg.com/getting-started/install).
* **Git**: [Download & Install Git](https://git-scm.com/downloads) (Only if using Option A for Getting Started)

---

## 2. Getting Started

Follow these steps to get the project up and running on your local machine.

### Option A: Cloning the Repository (Recommended for Developers)

If you have Git installed, this is the recommended way to get the project, as it makes it easy to pull future updates.

```bash
git clone <repository_url> # Replace <repository_url> with your actual GitHub repository URL
cd studybuddy
```

### Option B: Downloading the Zipped File from GitHub

If you prefer not to use Git, you can download the project as a .zip file directly from GitHub.

1. Go to the GitHub repository page.
2. Click the green **"Code"** button.
3. Select **"Download ZIP"** from the dropdown menu.
4. Once the .zip file is downloaded, locate it on your computer and extract (unzip) its contents to your desired project location.
5. Open your terminal or command prompt and navigate into the extracted project directory:

```bash
cd /path/to/your/extracted/studybuddy-project
```

(Replace `/path/to/your/extracted/studybuddy-project` with the actual path to the folder where you unzipped the project.)

### Installing Dependencies

Once you are inside the project directory (where `package.json` is located, regardless of how you obtained the code), install the necessary Node.js dependencies:

```bash
npm install
# OR
yarn install
```

---

## 3. Database Setup (MongoDB)

This application uses MongoDB for data storage. You need an active MongoDB instance (server) to run the application.

### Option A: MongoDB Atlas (Recommended for Cloud)

MongoDB Atlas provides a free-tier cloud-hosted MongoDB database, perfect for development and small projects.

1. **Create a MongoDB Atlas Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.

2. **Create a New Cluster**:

   * Follow the on-screen prompts to create a new "Shared Cluster" (the free M0 tier).
   * Choose your preferred cloud provider (AWS, GCP, Azure) and region.

3. **Create a Database User**:

   * In your cluster's dashboard, go to **"Database Access"** under **"Security"**.
   * Click **"Add New Database User"**.
   * Choose a strong username and password. Remember these credentials!
   * Grant **"Read and write to any database"** privileges.

4. **Add Your Current IP Address to IP Access List**:

   * Go to **"Network Access"** under **"Security"**.
   * Click **"Add IP Address"**.
   * Select **"Add Current IP Address"** or allow access from anywhere (`0.0.0.0/0`) for easier development (but less secure for production).

5. **Get the Connection String**:

   * Go back to "Database Deployments" and click "Connect" on your cluster.
   * Select "Choose connection method".
   * Select "Node.js" and copy the connection string. It will look something like this:

   ```
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   ```

   **IMPORTANT**: Replace `<username>` and `<password>` in the connection string with the database user credentials you created in step 3.

### Option B: Local MongoDB Server (For Local Development)

This option involves running a MongoDB server directly on your machine.

1. **Install MongoDB Community Server**:

   * Follow the official installation guides for your operating system: [MongoDB Community Server Installation](https://docs.mongodb.com/manual/installation/)
   * Ensure you also install MongoDB Shell (mongosh) if you want to interact via command line, or a GUI tool like DataGrip/MongoDB Compass.

2. **Start MongoDB Server**:

   * You need to start the MongoDB daemon process (mongod). The exact command varies by OS/installation, but it's typically:

   ```bash
   mongod --dbpath /path/to/your/data/directory
   ```

   (Replace `/path/to/your/data/directory` with a path where MongoDB can store its data.)

   * Keep this terminal window open, as it's running your database server.
   * The default connection URI is usually `mongodb://localhost:27017`.

3. **Use DataGrip (or MongoDB Compass) to Interact (Optional but Recommended)**:

   Once your local mongod server is running, you can use DataGrip (or MongoDB Compass) to connect to it and manage your database visually. This is especially useful for creating the studybuddy database, browsing collections, and inspecting data.

   **To connect to your local MongoDB using DataGrip**:

   * Open DataGrip.
   * **Create a New Data Source**: Go to File > New > Data Source > MongoDB.
   * **Configure Connection Details**:
     * In the "General" tab, set "Host: localhost", "Port: 27017".
     * You can specify the "Database" name (e.g., studybuddy) directly.
     * If you have authentication enabled for your local MongoDB, enter your username and password.
   * **Test Connection**: Click the "Test Connection" button.
   * **Apply and Connect**: Click "Apply" and then "OK". Your MongoDB connection will now appear in the Database tool window.

---

## 4. Environment Variables

This project uses environment variables to manage sensitive information like database connection strings and JWT secrets.

1. **Create a `.env.local` file**: In the root directory of your project (same level as `package.json`), create a new file named `.env.local`.

2. **Add your MongoDB URI and JWT Secret**:

   Open `.env.local` and add the following lines:

   ```bash
   # MongoDB Connection URI
   # Replace <your_mongodb_connection_string> with the URI obtained from MongoDB Atlas (Option A)
   # or use 'mongodb://localhost:27017/studybuddy' for local MongoDB (Option B)
   MONGODB_URI=<your_mongodb_connection_string>

   # JWT Secret for authentication tokens
   # Generate a strong, random string (e.g., using a password generator)
   JWT_SECRET=<your_jwt_secret_key>
   ```

   * **MONGODB_URI**: Paste the MongoDB connection string you obtained from MongoDB Atlas or use the local one.
   * **JWT_SECRET**: This is crucial for securing your user authentication tokens. Generate a long, random string (e.g., 32 characters or more) and paste it here. Do not share this key.

   **Example `.env.local` (using local MongoDB)**:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/studybuddy
   JWT_SECRET=supersecretjwtkeythatisverylongandrandom12345
   ```

---

## 5. Running the Application

Once you have set up your database and environment variables, you can run the Next.js development server:

```bash
npm run dev
# OR
yarn dev
```

The application will start on http://localhost:3000 (or another available port). Open your browser and navigate to this URL to see the Study Buddy app.

---

## 6. Seeding Test Data

To populate your database with some initial test users for demonstration purposes, we highly suggest to run the seeding script: 

```bash
node .\src\utils\seedTestUsers.js
```

---

