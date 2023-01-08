# Gearbox Publishing development assesment
This application was built using create-t3-app because I am familiar with the framework, and it has a fairly quick setup for creating a new application. I will be accessing a MYSQL database instance which is local to my machine for the development process.

## Deployment
This application is deployed at [Gearbox Dev Test](https://gearbox-dev.vercel.app/) and can be accessed by selecting the Link. I chose this method of delpoyment because Vercel works very nicely with nextJS and github.
The Database is a MYSQL instance deployed using an RDS instance from AWS. I chose MYSQL because I have familiarity with relational databases in MYSQL, Postgres, and Oracle.

## Testing Locally:
1. Install Node (version 16+)
2. Adjust any vercel routes to localhost:3000 (there are only 2 of these routes and would be replaced by ENV vars or other in the future)
3. `npm install` - Install all dependencies
4. `npm run dev` - Run development server (runs on port 3000 by default)

## What would I improve?
1. Currently, the Add Game feature will perform a window refresh after comitting a record to the database. I would adjust this to add the game to the list of existing games which are rendered on the screen, rather than needed to perform a refresh.
2. I would add proper authentication/authorization so that a User would need to have an Admin role to access the /admin route and perform CRUD operations to the database.
3. I would add proper image storage, rather than simply storing an image_url. This could potentially incorporate S3 or another file storage solution.

### Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
If you are not familiar with the different technologies used in this project, please refer to the respective docs.

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!


