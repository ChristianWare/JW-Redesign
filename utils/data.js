import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Chris",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Amy",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Johnnie Walker Blue Label",
      slug: "johnnie-walker-blue-label",
      label: "blue",
      image: "/images/blue.webp",
      price: 219.99,
      size: "750ml",
      countInStock: 20,
      description: "A popular Whiskey.",
    },
    {
      name: "Johnnie Walker Red Label",
      slug: "johnnie-walker-red-label",
      label: "red",
      image: "/images/red.webp",
      price: 33.99,
      size: "1.75L",
      countInStock: 20,
      description: "A popular Whiskey.",
    },
    {
      name: "Johnnie Walker Green Label",
      slug: "johnnie-walker-green-label",
      label: "green",
      image: "/images/green.webp",
      price: 64.99,
      size: "750ml",
      countInStock: 20,
      description: "A popular Whiskey.",
    },
  ],
};

export default data;
