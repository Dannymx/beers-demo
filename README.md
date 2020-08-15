# Beers demo
I made this JAMstack demo to show different tools and frameworks working together.

The stack and tools mainly used here are:

- Next.js (frontend)
- Strapi (backend)
- GraphQL using the Apollo Client
- Facebook and Google authentication
- Tailwind CSS

## Setup the project
To view this project in action do the following:

### Backend
- `npm install` module dependencies.
- Create a `.env` file. You can use the `.env.example` provided.
- `npm run develop` to get the project installed
- Create an initial admin account to login
- Create a Beer and Category Collection Types with the following fields.
- Category:
  - name (Text)
  - slug (UID) based on the name
- Beer:
  - name (Text)
  - image (Media)
  - Relationship with Category (Beer has one Category)
- Create a couple of categories and add a beers to each category.
- Enable Facebook and Google authentication in roles & permissions.
- You will need client id and client secret for the providers.
- Set the redirect URL to your frontend like this `http://localhost:3000/login`

### Frontend
- `npm install` module dependencies.
- Create a `.env.local` file. You can use the `.env.example.local` provided.

That's all you need to get the project up and running.

After doing that you will have too see how fast  statically generated pages are, and also how the Apollo Client caches queries once they have been fetched for the first time.

