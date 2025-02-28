# DevConnect

DevConnect is a platform designed to help developers find collaborators for their projects. It allows users to post projects, connect with others, and build great software together. The app includes features like user authentication, posting projects, commenting, bookmarking, and filtering based on tech stacks.

## Features

- **User Authentication**: OAuth with GitHub or email-based signup.
- **User Profiles**: Users can create and manage profiles.
- **Post a Project**: Users can post project ideas, request help, or showcase their work.
- **Comment & Collaborate**: Other users can comment on projects and join as collaborators.
- **Tech Stack Tags**: Filter projects based on tech stack (e.g., Rust, Bun, TypeScript).
- **Bookmark Projects**: Save projects for later review or collaboration.

## Tech Stack

- **Frontend**: Built with Next.js, React, and Zod for form validation.
- **Backend**: Rust, with Diesel ORM for database interactions.
- **Database**: Prisma (for initial schema design, to be adapted for Rust).
- **Authentication**: NextAuth (for GitHub OAuth and email-based sign-up).
- **Other Libraries**: TanStack Query, tRPC, Zustand.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/) (for the frontend).
- Install [Rust](https://www.rust-lang.org/) (for the backend).
- Install [PostgreSQL](https://www.postgresql.org/) (or your preferred database).