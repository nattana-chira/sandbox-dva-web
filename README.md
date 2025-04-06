## Getting Started

Copy .env
```bash
cp .env.example .env
```

Option 1: run the development server:
```bash
npm install
npm run dev
```

Option 2: run on docker container:
```bash
docker-compose up
```

Web running on http://localhost:3000

## Description

- NextJs for frontend  
- Redux for state management  
- TailwindCss for DOM styling  
- Yup for form validation
- Date-Fns for date format
- Docker for deployment

## Project Structure
```bash
project/
├── uploads/                 # Public assets (for Next.js frontend)
├── src/                     # Source code
│   ├── app/                 # Auto route by project structure. Server component in app/ contains no logic
│   │   └── page.tsx
│   ├── feature/             # Seperate each modules by web page
│   │   ├── _shared/x        # Share components/hooks between feature
│   │   ├── home/      
│   │   │   ├── components/  # Components in /home feature
│   │   │   ├── .interfaces  # Interfaces/Types 
│   │   │   └── .schemas     # Form data schema
│   │   ├── login/           
│   │   └── register/        
│   └── libs/                # Libraries
│       ├── api/             # API resources from back end
│       ├── redux/           # Redux - state management
│       └── utils/           # Helper function
├── .env                     # Environment variables
```

