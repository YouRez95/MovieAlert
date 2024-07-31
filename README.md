# MovieAlert

MovieAlert is a web application designed to help users check for content warnings (such as violence, sexual content, etc.) in movies before watching them. The application relies on user-generated content, where users create the API by submitting movie details. This way, users can help each other by sharing information about movies.

## Description

In MovieAlert, users can submit movie titles, release years, genres, content warnings, descriptions, and pictures. These submissions can then be viewed by other users. To access more than one movie, users need to log in or register. The login process supports both email/password and Gmail authentication. The application includes features such as email verification and password recovery.

MovieAlert prioritizes security with access tokens that expire after 15 minutes and refresh tokens that expire after 30 days. If a user logs in from a different device or browser, they receive an email notification. The application also features a user dashboard where users can manage their submitted movies and view their sessions.

To encourage user participation, MovieAlert implements a badge system. Users earn badges by submitting movies, which allows them to view more movies. The badge system is visually represented in the image below:

![Screen Shot 2024-07-12 at 12 29 52 AM](https://github.com/user-attachments/assets/faa5478e-eaeb-4a12-b81e-29bd9a9d5172)


Additionally, there is an admin panel where administrators can view, modify, or delete any movie in the database and manage user accounts.

## Pictures Of Projects
![Screen Shot 2024-07-31 at 12 42 06 AM](https://github.com/user-attachments/assets/de50fa3b-7524-4170-b3dc-99cbb1465def)

Login as user:

![Screen Shot 2024-07-31 at 12 42 35 AM](https://github.com/user-attachments/assets/1d28f4e3-4092-44e6-98e5-e1aafc35ddb1)
![Screen Shot 2024-07-31 at 12 42 58 AM](https://github.com/user-attachments/assets/a3031e6b-b653-48a9-bbb0-6a505b2c7c83)
![Screen Shot 2024-07-31 at 12 43 11 AM](https://github.com/user-attachments/assets/b8f9f4f3-82f9-4f9c-9418-77675c5af379)
![Screen Shot 2024-07-31 at 12 43 38 AM](https://github.com/user-attachments/assets/582ef79a-f4de-45f1-bf92-4b4c287d541f)
![Screen Shot 2024-07-31 at 12 43 58 AM](https://github.com/user-attachments/assets/a6721832-bba7-45d8-8199-3339d05a9b2c)
![Screen Shot 2024-07-31 at 12 44 12 AM](https://github.com/user-attachments/assets/5baf2db1-f228-4add-af15-d5a89c57610e)



Login as admin:

![Screen Shot 2024-07-31 at 12 44 37 AM](https://github.com/user-attachments/assets/68dd81db-2af9-46cd-a77a-9c58e4341930)
![Screen Shot 2024-07-31 at 12 44 57 AM](https://github.com/user-attachments/assets/a4d16a25-564d-4a9a-9136-2acbb5c2a3a4)
![Screen Shot 2024-07-31 at 12 45 12 AM](https://github.com/user-attachments/assets/97eca291-d850-4881-b17a-7887f63c8a91)

## Technologies

### Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/axios-m?style=for-the-badge)
![TanStack (React Query)](https://img.shields.io/badge/TanStack-m?style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![multer](https://img.shields.io/badge/multer-m?style=for-the-badge)
![Mongoose](https://img.shields.io/badge/Mongoose-V?style=for-the-badge)
![Bcrpt](https://img.shields.io/badge/Bcrypt-V?style=for-the-badge)

### Authentication
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### Version Control
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### Services
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-Black?style=for-the-badge)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Google](https://img.shields.io/badge/google_api-4285F4?style=for-the-badge&logo=google&logoColor=white)

## Key Features

- **User-Generated Content**: Users create the API by submitting movie details.
- **Secure Authentication**: Supports email/password and Gmail login, with email verification and password recovery.
- **Token Security**: Access tokens expire after 15 minutes, refresh tokens after 30 days, and notifications for login from new devices.
- **User Dashboard**: Manage submitted movies and view session history.
- **Badge System**: Earn badges by submitting movies to access more movies.
- **Admin Panel**: Administrators can view, modify, delete movies, and manage users.
- **Caching**: Redis is used to cache movie titles and IDs to optimize database queries.
- **Image Storage**: AWS S3 is used for storing movie images.
- **Email Services**: Resend is used for sending verification emails, password recovery emails, and security notifications.

## Installation

To install and run MovieAlert locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/YouRez95/MovieAlert.git
   ```
2. Navigate to the project directory and install depends:
   ```bash
   cd MovieAlert
   ```
   ```bash
   cd backend && npm install
   ```
   ```bash
   cd client && npm install
   ```
3. Create a .env file on the client and backend directories and add your environment variables:
   ```bash
   #Client
   VITE_API_URL=http://localhost:4000
   VITE_APP_BASE_URL=http://localhost:5173
   VITE_GOOGLE_REDIRECT_URL=http://localhost:4000/oauth/google
   VITE_GOOGLE_CLIENT_ID=*********
   VITE_GOOGLE_CLIENT_SECRET=************
   ```
   ```bash
   #backend
   NODE_ENV=development || production
   APP_ORIGIN=http://localhost:5173
   APP_ORIGIN_WWW=http://www.localhost:5173
   MONGO_LOCAL=mongodb://localhost:27017/movie_alert
   MONGO_CLOUD=*************
   JWT_SECRET=jwtsecret
   JWT_REFRESH_SECRET=jwtrefreshsecret
   EMAIL_SENDER=***********
   RESEND_API_KEY=*********
   AWS_BUCKET_NAME=******
   AWS_BUCKET_REGION=*********
   AWS_ACCESS_KEY=*********
   AWS_SECRET_KEY=**********
   GOOGLE_CLIENT_ID=***********
   GOOGLE_CLIENT_SECRET=************
   GOOGLE_REDIRECT_URL=http://localhost:4000/oauth/google
   REDIS_PASSWORD=**********
   REDIS_HOST=***********
   ```
1. Run the application:
   ```bash
   #client
   npm run dev
   ```
   ```bash
   #backend
   npm run dev
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
