# MovieAlert

MovieAlert is a web application designed to help users check for content warnings (such as violence, sexual content, etc.) in movies before watching them. The application relies on user-generated content, where users create the API by submitting movie details. This way, users can help each other by sharing information about movies.

## Description

In MovieAlert, users can submit movie titles, release years, genres, content warnings, descriptions, and pictures. These submissions can then be viewed by other users. To access more than one movie, users need to log in or register. The login process supports both email/password and Gmail authentication. The application includes features such as email verification and password recovery.

MovieAlert prioritizes security with access tokens that expire after 15 minutes and refresh tokens that expire after 30 days. If a user logs in from a different device or browser, they receive an email notification. The application also features a user dashboard where users can manage their submitted movies and view their sessions.

To encourage user participation, MovieAlert implements a badge system. Users earn badges by submitting movies, which allows them to view more movies. The badge system is visually represented in the image below:

![Badge System](./path/to/your/image.png)

Additionally, there is an admin panel where administrators can view, modify, or delete any movie in the database and manage user accounts.

## Technologies

### Frontend

- React.js
- Tailwind CSS
- Axios
- TanStack (React Query)
- React Icons
- React Router DOM

### Backend

- TypeScript
- Node.js
- Express.js
- MongoDB
- Zod
- Multer
- Mongoose
- Bcrypt

### Authentication

- JSON Web Tokens (JWT)

### Version Control

- Git
- GitHub

### Services

- Redis
- Resend
- AWS S3
- Google API

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
   git clone https://github.com/yourusername/moviealert.git
   ```

# Movie Alert

## Description

## Pictures Of Projects

![screeeen3](https://github.com/YouRez95/quiz-generator/assets/132413620/626d7bba-d12f-4a22-85a6-4a71b7d9ea77)

![screeen2](https://github.com/YouRez95/quiz-generator/assets/132413620/27b42463-4e0e-4bc2-b7d0-e637854decdf)

![screeeen1](https://github.com/YouRez95/quiz-generator/assets/132413620/2a369101-979a-4d54-bdc3-f6f15fdb29e8)

## Technologies

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![alt_text](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![.ENV](https://img.shields.io/badge/.ENV-VVVV?style=for-the-badge)
![Bcrpt](https://img.shields.io/badge/Bcrypt-V?style=for-the-badge)
![express-validator](https://img.shields.io/badge/express_validator-B?style=for-the-badge)
![multer](https://img.shields.io/badge/multer-m?style=for-the-badge)

## Key Features

- **_User Authentication :_** Secure user authentication endpoints using JWT tokens.
- **_Creating Quiz :_** User authenticated can create quiz, can be public or private
- **_Quiz Category :_** User can select the category from the list provided, or create new category
- **_Creating Questions :_** User authenticated can create maximun 10 questions for each quiz created
- **_Draft Quiz :_** Users may be unable to complete a question after creating a quiz. When this occurs, the quiz is automatically considered as a draft and is added to the user's dashboard
- **_Like Quiz :_** User can like any public quiz
- **_Comment Quiz :_** User can comment public quiz
- **_Play Quiz :_** User can play any public quiz
- **_Score quiz :_** After user play the quiz the score of that quiz will be automatically added to dashboard statistique
- **_Dashboard Statistique :_** User can see all quizzes already play and the score of each quiz
- **_Dashboard Quizzes :_** User can update the quiz or the questions for specific quiz
- **_Dashboard Draft :_** User can see all quiz not completed yet, and can completed any time he want
- **_Dashboard Notifications :_** If another user likes or comments on a specific quiz, the owner of that quiz will receive a notification.
- **_dashboard Statistique :_** User can update their username, fillname and avatar (email and password added later)

## Services i am still working on : 

- Unit testing
- Responsive design
- notifications
- Admin Dashboard
- Improve UI/UX

## Installation

1. **_Clone the Repository:_** Use the `git clone` command to clone the GitHub repository to your local machine
   ```
    git clone https://github.com/YouRez95/quiz-generator.git
   ```
2. **_Install depends:_**

   ```
   cd backend && npm install
   ```

   ```
   cd frontend && npm install
   ```

3. **_Setting up env variables:_**

   i. .env on backend :

   ```
   MONGO_URL=YOUR DATABASE URI MONGODB

   ## JWT access token

   JWT_SECRET=YOUR JWT ACCESS TOKEN SECRET

   ## NODE ENV

   NODE_ENV=NODE ENV HERE

   ## FRONT URL

   FRONT_URL=undefined
   ```

   ii. .env on frontend :

   ```
   ## URL API : example: http://localhost:5000

   VITE_BASE_URL=URL API HERE

   ## URL API ENTRY : example: http://localhost:5000/api/v1

   VITE_API_URL=URL API HERE/api/v1
   ```
