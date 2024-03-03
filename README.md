# InstantPay

InstantPay is an application designed to facilitate quick and easy money transfers between users. Users can send money to each other using an initial dummy balance. This README provides an overview of the project and instructions for deploying the frontend part of the application using Vercel.

## Backend

The backend of InstantPay is built using the following technologies:

- **Express**: Express is used as the HTTP server to handle incoming requests and responses.
- **Mongoose**: Mongoose is an ODM (Object Data Modeling) library for MongoDB. It is used to connect the application to the MongoDB database.
- **Zod**: Zod is used for input validation to ensure that the data sent to the backend is valid and meets the specified criteria.
- **JWT Tokens**: JSON Web Tokens (JWT) are used for authentication and authorization. They are issued to users upon successful login and used to authenticate subsequent requests.

## Frontend

The frontend of InstantPay is built using the following technologies:

- **React**: React is a popular JavaScript library for building user interfaces. It provides a component-based architecture that makes it easy to develop and maintain complex UIs.
- **Tailwind CSS**: Tailwind CSS is used for styling the frontend components. It provides a utility-first approach to CSS, allowing for rapid development and easy customization of styles.

## Deploying Frontend in Vercel

[Vercel](https://vercel.com/) is a platform for deploying serverless functions and static websites. Follow the steps below to deploy the frontend part of InstantPay using Vercel:

1. **Sign up or Log in**: If you don't have a Vercel account, you'll need to sign up. If you already have an account, log in to your Vercel account.

2. **Install Vercel CLI (Command Line Interface)**: You'll need the Vercel CLI to deploy your project from the command line. If you haven't installed it yet, you can do so by running the following command:

3. **Navigate to the Frontend Directory**: Open your terminal or command prompt and navigate to the directory where your frontend code is located.

4. **Initialize Vercel**: Run the following command to initialize Vercel in your project directory:

This command will prompt you to log in to your Vercel account (if you're not already logged in) and guide you through the project setup process.

5. **Deploy to Vercel**: Once Vercel is initialized, you can deploy your project by running the following command:

This command will build your project and deploy it to Vercel's platform. Once the deployment is complete, you'll receive a URL where your frontend application is hosted.

6. **Access Your Deployed Application**: You can now access your deployed InstantPay frontend application using the provided URL. Share this URL with your users to allow them to access the application and start sending money to each other.

That's it! You've successfully deployed the frontend part of InstantPay to Vercel.



