# My Blog Website

This is a full-stack blog website built with modern technologies. The frontend is developed using React with TypeScript, while the backend utilizes Prisma ORM with a PostgreSQL database. The backend is deployed on Cloudflare Workers using the Hono library, and the frontend is hosted on Vercel.
**Visit the website:** [https://blog-website-jet-theta.vercel.app/]


## Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Prisma ORM
- PostgreSQL
- Hono
- Cloudflare Workers

### Common Types
- A shared package containing common types used across the frontend and backend for better type safety.

## Project Structure

The project is organized into three main folders:

1. **frontend**: Contains the React application code, including components, pages, hooks, and configurations.
2. **backend**: Houses the backend code, including Prisma models, database migrations, and API routes.
3. **common**: Contains the shared types package published to npm for better type safety across the frontend and backend.

## Getting Started

To get the project up and running locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Install dependencies for the frontend, backend, and common types package:
   - `cd frontend && npm install`
   - `cd ../backend && npm install`
   - `cd ../common && npm install`
3. Configure database: For Backend create .env with DATABASE_URL="<your_remote_postgres_url>"
4. Follow the Prisma documentation to generate an Accelerate connection string, and update the 
   backend/wrangler.toml file with this connection string in the DATABASE_URL variable.
   Optionally, consider changing the JWT password for added security.
5. Create a file named .env in your frontend directory and set the VITE_REACT_APP_BACKEND_URL
   variable to the URL of your backend server. Update the URL based on your deployment environment
   (cloud worker or local server).
   eg. VITE_REACT_APP_BACKEND_URL="http://localhost:8787"
6. Start the development servers:
   - Frontend: `cd frontend && npm run dev`
   - Backend: `cd backend && npm run dev`


## Deployment

The frontend is deployed on Vercel, and the backend is deployed on Cloudflare Workers using Wrangler.

## Contributing

Contributions are welcome! Please follow the [contributing guidelines](CONTRIBUTING.md) when submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).