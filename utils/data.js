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
      abv: 40,
      size: "750 ML",
      countInStock: 20,
      description:
        "Created from the rarest and most expensive whiskies in the world, individually numbered and produced in limited quantities. Johnnie Walker Blue has the authentic character and flavor of a traditional 19th century blend with traces of smoke, honey and spice on the silky finish.",
      taste: "Rich, Smoke, Honey, Spice, Long",
    },
    {
      name: "Johnnie Walker Red Label",
      slug: "johnnie-walker-red-label",
      label: "red",
      image: "/images/red.webp",
      price: 33.99,
      abv: 40,
      size: "1.75 L",
      countInStock: 20,
      description:
        "One of the world's best selling Scotch whiskies. Fresh and robust, this powerful combination of spicy, smoky malts and lingering, lighter grains is perfect for mixing. A distinctive strength of character and a fullness of flavor provides international appeal.",
      taste: "Light, Spice, Smoke, Oak, Balanced",
    },
    {
      name: "Johnnie Walker Green Label",
      slug: "johnnie-walker-green-label",
      label: "green",
      image: "/images/green.webp",
      price: 64.99,
      abv: 43,
      size: "750 ML",
      countInStock: 20,
      description:
        "A dynamic blend of Island and Speyside malts, each aged at least 15 years. The taste juxtaposes fresh fruit with wood smoke, pepper, deep vanilla and sandalwood. Perfectly balanced combination of only single malt whiskies that evokes the outdoors with its vibrant fresh flavor.",
      taste: "Rich, Wood, Fruit, Balanced",
    },
    {
      name: "Johnnie Walker Black Label",
      slug: "johnnie-walker-black-label",
      label: "black",
      image: "/images/black.webp",
      price: 59.99,
      abv: 40,
      size: "1.75 L",
      countInStock: 20,
      description:
        "The original Walker family blend, handcrafted from as many as 40 of the finest Scotch whiskies aged a minimum of 12 years, for a smooth and robust blend. Rich smoky malt, peat and sherry fruit character deliver a satisfyingly complex flavor on the long, lingering finish.",
      taste: "Rich, Smoke, Oak, Balanced",
    },
    {
      name: "Johnnie Walker Gold Label",
      slug: "johnnie-walker-gold-label",
      label: "gold",
      image: "/images/gold.webp",
      price: 64.99,
      abv: 40,
      size: "750 ML",
      countInStock: 20,
      description:
        "A skillful fusion of rare aged whiskies inspired by the notes originally kept by Sir Alexander Walker. Crafted from only a small number of Scotland's most renowned distilleries. Exceptionally smooth, creamy and delicate. Available in limited edition bottle. Perfect for gifts.",
      taste: "Medium, Tropical Fruit, Vanilla, Long",
    },
    {
      name: "Johnnie Walker 18 Years",
      slug: "johnnie-walker-18-years",
      label: "specialty",
      image: "/images/18years.webp",
      price: 64.99,
      abv: 40,
      size: "750 ML",
      countInStock: 20,
      description:
        "Introducing Johnnie Walker 18 Year Old - The Platinum Blend. Chosen from up to 18 unique Walker whiskies matured for a minimum of 18 years to create this blended scotch with a unique, rich, fruity-sweet character balanced with subtle smokiness and incredible smoothness.",
      taste:
        "Honeyed cereals, Cadbury's Fruit and Nut, distant bonfire smoke, clementine and spring blossom.",
    },
    {
      name: "Johnnie Walker King George V",
      slug: "johnnie-walker-king-george-v",
      label: "specialty",
      image: "/images/king.webp",
      price: 699.99,
      abv: 43,
      size: "750 ML",
      countInStock: 20,
      description:
        "Named for the king who awarded Johnnie Walker a royal warrant to supply his house with Scotch. Balance of peat, smoke, and lighter aromatic fruit flavors from a variety of oak casks. Extremely limited quantities, packaged in a crystal decanter with certificate of authenticity.",
      taste: "Rich, Peat, Smoke, Fruit, Balanced",
    },
  ],
};

export default data;
