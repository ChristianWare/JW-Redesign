# Johnnie Walker E-Commerce Redesign

## Project Description

Johinne Walks is an e-commerce store, inspired by the current Johnnie Walker website. It showcases the different labels that Johnnie Walker currently has to offer, including the popular Blue, Red, and Green labels.

###### Images

Item Details
![Item Details](https://johnniewalks.com/images/s1.png)

Order Details
![Order Details Page](https://johnniewalks.com/images/s2.png)

#### User Functionalities

Users can browse any authorized page to make purchases with Paypal, or a sample Debit Card provided by the site. They can edit their profile, and view their order history. The Order History screen allows you to see the payment and shipping status of each purchase made. And Account is needed in order to place an order. If Users are not logged in by the time they reach the shipping page during the ordering process, the are automatically rerouted to the login page, where they can log in or register for a new account.

#### Amin Functionalities

In addition to user functionalities, the Administrator has access to the Admin Dashboard. Here they can see the total number of sales made, orders placed, products sold, and users enrolled. They also have access to the orders, products, and users screens:

- The Orders screen lists all of the orders placed by each customer. Here they can view the details of each order, update shipment status, and update the payment status as well.

- The Products screen allows the Admin to view all of the current products on the site. Here they can create new products, edit existing ones, and delete them as well. This feature is what truly makes this a CRUD application. When new products are created, the images are uploaded to a Cloudinary server.

- The Users screen showcases all of the existing users and whether or not they have administrative access.

Here is what the Admin Dashboard looks like:

![Admin Dashboard](https://johnniewalks.com/images/s5.png)

## The Process

1. Think of concept and execution, sketch out ideas on paper.
1. Get design inspiration from existing e-commerce sites. Use Dribbble and Behance as references.
1. Set up Design system in global styles sheet.
1. Add needed Fonts, Images and SVG icons.
1. Build the Front End with some sample products.
1. Setup Mongo Atlas Database and connect to application.
1. Download necessary NMP dependencies
1. Build backend API Routes
1. Create CRUD (create, read, update, delete) functionalities to build new products, delete sample data.
1. Build application to completion
1. Deploy application to vercel

## Technologies

The tech Stack used for this project was MERN. (MongoDB, Express, React, Node). Next.js was used for the Front End. I chose to build the app using the MERN stack since it's entirely based on JavaScript. So I am only using one programing language, in opposed to bringing in another server side language, like Python.

###### Next.js

I chose to use Next.js because of it's Server Side Rendering (SSR) capabilities. In a traditional React app, a large bundle of JavaScript is sent to the client and is rendered once it has loaded. Next.js's SSR will render a frontend application on the server. The main benefit of this is for Search Engine Optimization (SEO).

###### MongoDB

I used MongoDB as the database since it is easy to create and store unstructured data, by creating a schema for a product, user, or an order. I stored my Mongo credentials in a ".env" file so that my API keys aren't exposed on the Front End. When it was time to deploy, I simply input those API keys in environment variables on Vercel’s hosting platform. I used mongoose for my ORM so that I would be able to easily access the data from MongoDB.

###### Node.js

Node was used to handle all of the /api routes, which already comes out of the box with Next.js. So there was no need to build a separate node backend.

## Deployment

Deploying Next.js apps on Vercel is very simple. Once you create an account and log into your dashboard, select the "Add New" button in the upper right hand corner of the site and select "Project". From here, you can connect to whichever Git Repository you want, and import an existing repo. After this, select a project, input your environment variables, if any, and hit deploy. Done.

In addition to its simplicity, you may want to consider using Vercel to host Next.js apps because not every host supports all Next.js SSR and incremental static regeneration. The majority of them support only true pre-generated sites and don’t offer a solution for server-side code, and thus don’t support some of the greatest Next.js features.

## Vercel Features

Some of the Vercel/Next.js features used on this site:

- getServerSideProps ( ) - I used this because I wanted each page to be pre-rendered on each request from the server. I
- params - the slug pages utilizes a dynamic route, so the route parameters are stored in params, which is actually coming from "context". So access them, I had to use params. My slug page’s name was set to [slug].js, the parameters will be { slug: … }. Here is an example:

First, run the development server:

```bash
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  const similar = await Product.find({ label: product.label }).lean();
  // await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
      similar: similar.map(db.convertDocToObj),
    },
  };
}
```

###### Advantages of getServerSideProps( )

Using GetServerSideProps anyone to improve their SEO, since the data is rendered before it reaches the client.

The data is refreshed every time the user loads the page, allowing them to view the updated information at all times.

## Who Would Benefit

Anyone can benefit from using Vercel. If you are a developer who has as website for themselves, or for clients that have businesses that need to have good SEO, then Vercel is great for hosting Static Sites that are available on the server. They are also good for websites that provides information that gets updated often, like an e-commerce site, or a stock data site.

Vercel makes it easy for Developers to build, preview, and ship fast loading websites. They can push code to Github and get a site running in minutes. Plus, Vercel is backed by a smart CDN that helps static sites load fas, and ensures that sites are always live.

If you are a business with a Software Engineering or Development team, then Vercel will work great for you as well. They have:

- easily scalable websites and cloud services
- Seamless integration with Github
- Faster website development compared to other options

Overall, anyone who needs a static website to promote their business, or a complex web app with constantly changing data, will be thrilled to use Vercel.

## Thank You

Thank you for taking the time to view my project, I hope you enjoyed it! Please give it a star.
