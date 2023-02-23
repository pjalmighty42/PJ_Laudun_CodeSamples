# The Job Search App

This is a demo, proof of concept I had decided to work on for various reasons:

- I wanted to drill in my experience working with GraphQL from my previous role (Carters)
- I wanted to work on a demo to show using the MERN stack ( <3 the MERN stack)
- I needed a better way to keep track of Job Applications (to automate having to use Excel)

## The Stack

The stack for this application is as follows:

- MERN stack
  - MongoDB, ExpressJS, React, Nodejs
  - The React portion is more React/Typescript
  - The backend is MongoDB with Mongoose handling the middleware
  - And I am using Apollo to handle dealing with GraphQL (as well as state management through it's caching)
  - The UI framework for this project is MaterialUI
  - The reversioning is obviously Git

## The App

The application is a simple Single Page Application (SPA) with all the functionality happening on the main page.

This is intentional as I had a simple need to manage my application submissions in an automative manner. As such I only needed a single page, with a table, and a way to Create Read Update and Delete (CRUD) items in the table.

## In the future

I am going to remove the Mongo portion and just use something like json-server as the "backend." Just so it could be more demo-able and so that turn it into a bit of a SaaS (Software as a Service) sort of thing.

If I go that route, I will use this to learn how to create Node Packages for a release.

Till then, thanks for reading this!
