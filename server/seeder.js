const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('./models/categoryModel');
const Product = require('./models/productModel');  // Add this line
const connectDB = require('./config/db');

const categories = [
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Books' },
  { name: 'Home & Kitchen' },
  { name: 'Toys & Games' },
  { name: 'Sports' },
  { name: 'Beauty & Health' },
  { name: 'Automotive' },
  { name: 'Office Supplies' },
  { name: 'Food & Beverages' }
];

// Sample products for seeding
const products = [
  // Electronics
  {
    name: 'iPhone 13 Pro',
    description: 'Latest Apple smartphone with advanced camera system',
    quantity: 50,
  },
  {
    name: 'Samsung Galaxy S22',
    description: 'Flagship Android smartphone with stunning display',
    quantity: 45,
  },
  {
    name: 'Sony PlayStation 5',
    description: 'Next-generation gaming console with stunning graphics',
    quantity: 30,
  },
  {
    name: 'Dell XPS 15 Laptop',
    description: 'Premium laptop with 4K display and powerful performance',
    quantity: 25,
  },
  {
    name: 'Apple Watch Series 7',
    description: 'Advanced smartwatch with health monitoring features',
    quantity: 60,
  },
  
  // Clothing
  {
    name: 'Nike Air Max',
    description: 'Comfortable athletic shoes with air cushioning',
    quantity: 100,
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'Classic straight fit jeans with button fly',
    quantity: 80,
  },
  {
    name: 'Adidas Originals T-Shirt',
    description: 'Cotton t-shirt with iconic trefoil logo',
    quantity: 120,
  },
  {
    name: 'North Face Puffer Jacket',
    description: 'Warm winter jacket with down insulation',
    quantity: 45,
  },
  {
    name: 'Zara Slim Fit Blazer',
    description: 'Modern tailored blazer for professional occasions',
    quantity: 35,
  },
  
  // Books
  {
    name: 'Harry Potter Complete Collection',
    description: 'All seven books in the Harry Potter series',
    quantity: 30,
  },
  {
    name: 'To Kill a Mockingbird',
    description: 'Classic novel by Harper Lee exploring racial injustice',
    quantity: 50,
  },
  {
    name: 'The Alchemist',
    description: 'Paulo Coelho\'s masterpiece about following your dreams',
    quantity: 65,
  },
  {
    name: 'Atomic Habits',
    description: 'James Clear\'s guide to building good habits and breaking bad ones',
    quantity: 70,
  },
  {
    name: '1984',
    description: 'George Orwell\'s dystopian social science fiction classic',
    quantity: 40,
  },
  
  // Home & Kitchen
  {
    name: 'Kitchen Aid Mixer',
    description: 'Professional stand mixer for baking enthusiasts',
    quantity: 20,
  },
  {
    name: 'Ninja Air Fryer',
    description: 'Versatile air fryer for healthier cooking',
    quantity: 35,
  },
  {
    name: 'Dyson V11 Vacuum',
    description: 'Cordless vacuum cleaner with powerful suction',
    quantity: 25,
  },
  {
    name: 'Le Creuset Dutch Oven',
    description: 'Premium enameled cast iron cookware for slow cooking',
    quantity: 15,
  },
  {
    name: 'Nespresso Coffee Machine',
    description: 'Automatic coffee maker for barista-quality espresso',
    quantity: 40,
  },
  
  // Toys & Games
  {
    name: 'LEGO Star Wars Millennium Falcon',
    description: 'Detailed building set of the iconic Star Wars spaceship',
    quantity: 25,
  },
  {
    name: 'Nintendo Switch',
    description: 'Versatile gaming console for home and portable play',
    quantity: 35,
  },
  {
    name: 'Monopoly Board Game',
    description: 'Classic property trading game for the whole family',
    quantity: 50,
  },
  {
    name: 'Barbie Dreamhouse',
    description: 'Luxurious doll house with multiple rooms and accessories',
    quantity: 20,
  },
  {
    name: 'Hot Wheels 50-Pack',
    description: 'Collection of die-cast toy cars in various designs',
    quantity: 30,
  },
  
  // Sports
  {
    name: 'Wilson Basketball',
    description: 'Official size and weight basketball for indoor/outdoor play',
    quantity: 40,
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Thick non-slip exercise mat for yoga and fitness',
    quantity: 75,
  },
  {
    name: 'Fitbit Charge 5',
    description: 'Advanced fitness tracker with heart rate monitoring',
    quantity: 50,
  },
  {
    name: 'Coleman Camping Tent',
    description: '4-person weatherproof tent for outdoor adventures',
    quantity: 20,
  },
  {
    name: 'Titleist Pro V1 Golf Balls',
    description: 'Professional quality golf balls for distance and control',
    quantity: 100,
  },
  
  // Beauty & Health
  {
    name: 'Dyson Airwrap',
    description: 'Multi-styling tool for different hair types and styles',
    quantity: 15,
  },
  {
    name: 'SK-II Facial Treatment Essence',
    description: 'Luxury skincare product with pitera for skin renewal',
    quantity: 25,
  },
  {
    name: 'Electric Toothbrush Pro',
    description: 'Sonic toothbrush with multiple cleaning modes',
    quantity: 45,
  },
  {
    name: 'Massage Gun Deep Tissue',
    description: 'Percussion massager for muscle recovery and pain relief',
    quantity: 30,
  },
  {
    name: 'Digital Bathroom Scale',
    description: 'Precise weight measurement with smartphone connectivity',
    quantity: 40,
  },
  
  // Automotive
  {
    name: 'Car Dash Cam',
    description: '4K resolution dashboard camera with night vision',
    quantity: 35,
  },
  {
    name: 'OBD2 Scanner Tool',
    description: 'Diagnostic scanner for checking engine codes and performance',
    quantity: 50,
  },
  {
    name: 'Leather Seat Covers',
    description: 'Premium seat covers for car interior upgrade',
    quantity: 25,
  },
  {
    name: 'Portable Car Jump Starter',
    description: 'Emergency battery booster with USB charging ports',
    quantity: 40,
  },
  {
    name: 'Premium Car Wax',
    description: 'Long-lasting protective wax for vehicle exterior',
    quantity: 60,
  },
  
  // Office Supplies
  {
    name: 'Mechanical Keyboard',
    description: 'Ergonomic keyboard with customizable RGB lighting',
    quantity: 30,
  },
  {
    name: 'Adjustable Standing Desk',
    description: 'Electric height-adjustable desk for work comfort',
    quantity: 15,
  },
  {
    name: 'Moleskine Notebook',
    description: 'Classic hardcover notebook with premium paper',
    quantity: 100,
  },
  {
    name: 'Document Scanner Portable',
    description: 'Compact scanner for digitizing documents on the go',
    quantity: 20,
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Adjustable chair with lumbar support for long work hours',
    quantity: 25,
  },
  
  // Food & Beverages
  {
    name: 'Single Origin Coffee Beans',
    description: 'Specialty grade coffee beans from Ethiopia',
    quantity: 40,
  },
  {
    name: 'Artisanal Chocolate Box',
    description: 'Assorted handmade chocolates with various flavors',
    quantity: 30,
  },
  {
    name: 'Organic Matcha Green Tea',
    description: 'Premium grade Japanese matcha powder',
    quantity: 25,
  },
  {
    name: 'Truffle Infused Olive Oil',
    description: 'Gourmet olive oil with black truffle essence',
    quantity: 20,
  },
  {
    name: 'Aged Balsamic Vinegar',
    description: 'Traditional Italian balsamic aged in wooden barrels',
    quantity: 15,
  }
];

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();
    
    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    
    // Map category names to IDs for easier reference
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });
    
    // Assign categories to products
    const productsWithCategories = products.map(product => {
      let assignedCategories = [];
      
      // Assign categories based on product name/description
      if (
        product.name.includes('iPhone') || 
        product.name.includes('Galaxy') || 
        product.name.includes('PlayStation') || 
        product.name.includes('Laptop') || 
        product.name.includes('Watch') ||
        product.name.includes('Nintendo') ||
        product.name.includes('Keyboard') ||
        product.name.includes('Scanner')
      ) {
        assignedCategories.push(categoryMap['Electronics']);
      }
      
      if (
        product.name.includes('Nike') || 
        product.name.includes('Jeans') || 
        product.name.includes('T-Shirt') || 
        product.name.includes('Jacket') || 
        product.name.includes('Blazer')
      ) {
        assignedCategories.push(categoryMap['Clothing']);
      }
      
      if (
        product.name.includes('Harry Potter') || 
        product.name.includes('Mockingbird') || 
        product.name.includes('Alchemist') || 
        product.name.includes('Habits') || 
        product.name.includes('1984') ||
        product.name.includes('Notebook')
      ) {
        assignedCategories.push(categoryMap['Books']);
      }
      
      if (
        product.name.includes('Kitchen') || 
        product.name.includes('Air Fryer') || 
        product.name.includes('Vacuum') || 
        product.name.includes('Dutch Oven') || 
        product.name.includes('Coffee Machine')
      ) {
        assignedCategories.push(categoryMap['Home & Kitchen']);
      }
      
      if (
        product.name.includes('LEGO') || 
        product.name.includes('Nintendo') || 
        product.name.includes('Monopoly') || 
        product.name.includes('Barbie') || 
        product.name.includes('Hot Wheels')
      ) {
        assignedCategories.push(categoryMap['Toys & Games']);
      }
      
      if (
        product.name.includes('Nike') || 
        product.name.includes('Basketball') || 
        product.name.includes('Yoga') || 
        product.name.includes('Fitbit') || 
        product.name.includes('Camping') ||
        product.name.includes('Golf')
      ) {
        assignedCategories.push(categoryMap['Sports']);
      }
      
      if (
        product.name.includes('Dyson Air') || 
        product.name.includes('SK-II') || 
        product.name.includes('Toothbrush') || 
        product.name.includes('Massage') || 
        product.name.includes('Bathroom Scale')
      ) {
        assignedCategories.push(categoryMap['Beauty & Health']);
      }
      
      if (
        product.name.includes('Car') || 
        product.name.includes('OBD2') || 
        product.name.includes('Seat') || 
        product.name.includes('Jump Starter') || 
        product.name.includes('Wax')
      ) {
        assignedCategories.push(categoryMap['Automotive']);
      }
      
      if (
        product.name.includes('Keyboard') || 
        product.name.includes('Desk') || 
        product.name.includes('Notebook') || 
        product.name.includes('Scanner') || 
        product.name.includes('Chair')
      ) {
        assignedCategories.push(categoryMap['Office Supplies']);
      }
      
      if (
        product.name.includes('Coffee') || 
        product.name.includes('Chocolate') || 
        product.name.includes('Tea') || 
        product.name.includes('Olive Oil') || 
        product.name.includes('Vinegar')
      ) {
        assignedCategories.push(categoryMap['Food & Beverages']);
      }
      
      // If no categories assigned, assign a random one to avoid empty categories
      if (assignedCategories.length === 0) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        assignedCategories.push(categoryMap[randomCategory.name]);
      }
      
      return {
        ...product,
        categories: assignedCategories
      };
    });
    
    // Insert products with category associations
    await Product.insertMany(productsWithCategories);

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();  // Add this line

    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
