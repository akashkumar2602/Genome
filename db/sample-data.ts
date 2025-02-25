import { hashSync } from 'bcrypt-ts-edge';
// Import the hashSync function from the bcrypt-ts-edge library 

const sampleData = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: hashSync('123456', 10),
      role: 'admin',
      loyalityId: '550e8400-e29b-41d4-a716-446655440000',
      loyalityType: 'gold',
      phoneNumber: '1234567890',
      gender: 'Male',
      age: '35',
      dob: '1989-01-15',
      city: 'New York',
      state: 'NY',
      country: 'USA',
    },
    {
      name: 'Jane',
      email: 'jane@example.com',
      password: hashSync('123456', 10),
      role: 'user',
      loyalityId: '550e8400-e29b-41d4-a716-446655440001',
      loyalityType: 'gold',
      phoneNumber: '0987654321',
      gender: 'Female',
      age: '30',
      dob: '1994-03-22',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    },
    {
      name: 'John1',
      email: 'admin1@example.com',
      password: hashSync('123456', 10),
      role: 'admin',
      loyalityId: '550e8400-e29b-41d4-a716-446655440002',
      loyalityType: 'gold',
      phoneNumber: '1122334455',
      gender: 'Male',
      age: '40',
      dob: '1984-07-10',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
    },
    {
      name: 'Jane1',
      email: 'jane1@example.com',
      password: hashSync('123456', 10),
      role: 'user',
      loyalityId: '550e8400-e29b-41d4-a716-446655440003',
      loyalityType: 'gold',
      phoneNumber: '5566778899',
      gender: 'Female',
      age: '28',
      dob: '1996-09-05',
      city: 'Houston',
      state: 'TX',
      country: 'USA',
    },
    {
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      password: hashSync('123456', 10),
      role: 'admin',
      loyalityId: '550e8400-e29b-41d4-a716-446655440010',
      loyalityType: 'platinum',
      phoneNumber: '+1 415 555 1234',
      gender: 'Male',
      age: '42',
      dob: '1982-06-21',
      city: 'San Francisco',
      state: 'California',
      country: 'USA',
    },
    {
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      password: hashSync('123456', 10),
      role: 'user',
      loyalityId: '550e8400-e29b-41d4-a716-446655440011',
      loyalityType: 'gold',
      phoneNumber: '+1 312 555 5678',
      gender: 'Female',
      age: '36',
      dob: '1988-09-14',
      city: 'Chicago',
      state: 'Illinois',
      country: 'USA',
    },
    {
      name: 'Robert Williams',
      email: 'robert.williams@example.com',
      password: hashSync('123456', 10),
      role: 'admin',
      loyalityId: '550e8400-e29b-41d4-a716-446655440012',
      loyalityType: 'diamond',
      phoneNumber: '+1 212 555 7890',
      gender: 'Male',
      age: '50',
      dob: '1974-02-11',
      city: 'New York',
      state: 'New York',
      country: 'USA',
    },
    {
      name: 'Sophia Martinez',
      email: 'sophia.martinez@example.com',
      password: hashSync('123456', 10),
      role: 'user',
      loyalityId: '550e8400-e29b-41d4-a716-446655440013',
      loyalityType: 'silver',
      phoneNumber: '+1 512 555 3456',
      gender: 'Female',
      age: '29',
      dob: '1995-07-30',
      city: 'Austin',
      state: 'Texas',
      country: 'USA',
    },

    // European Users (6 Extra)
    {
      name: 'Tomáš Novák',
      email: 'tomas.novak@example.cz',
      password: hashSync('123456', 10),
      role: 'user',
      loyalityId: '550e8400-e29b-41d4-a716-446655440014',
      loyalityType: 'gold',
      phoneNumber: '+420 608 123 456',
      gender: 'Male',
      age: '34',
      dob: '1990-04-18',
      city: 'Prague',
      state: 'Prague Region',
      country: 'Czech Republic',
    },
    {
      name: 'Elena Petrova',
      email: 'elena.petrova@example.ru',
      password: hashSync('123456', 10),
      role: 'user',
      loyalityId: '550e8400-e29b-41d4-a716-446655440015',
      loyalityType: 'platinum',
      phoneNumber: '+7 911 987 6543',
      gender: 'Female',
      age: '40',
      dob: '1984-01-25',
      city: 'Moscow',
      state: 'Moscow Oblast',
      country: 'Russia',
    },
    {
      name: 'Noah Schneider',
      email: 'noah.schneider@example.at',
      password: hashSync('123456', 10),
      role: 'admin',
      loyalityId: '550e8400-e29b-41d4-a716-446655440016',
      loyalityType: 'diamond',
      phoneNumber: '+43 660 1234567',
      gender: 'Male',
      age: '46',
      dob: '1978-08-12',
      city: 'Vienna',
      state: 'Vienna',
      country: 'Austria',
    },
    {
      name: 'Amélie Laurent',
      email: 'amelie.laurent@example.be',
      password: hashSync('123456', 10),
      role: 'user',
      loyalityId: '550e8400-e29b-41d4-a716-446655440017',
      loyalityType: 'gold',
      phoneNumber: '+32 485 654 321',
      gender: 'Female',
      age: '31',
      dob: '1993-05-08',
      city: 'Brussels',
      state: 'Brussels-Capital',
      country: 'Belgium',
    },
    {
      name: 'Björn Eriksson',
      email: 'bjorn.eriksson@example.no',
      password: hashSync('123456', 10),
      role: 'admin',
      loyalityId: '550e8400-e29b-41d4-a716-446655440018',
      loyalityType: 'silver',
      phoneNumber: '+47 90 123 456',
      gender: 'Male',
      age: '53',
      dob: '1971-06-20',
      city: 'Oslo',
      state: 'Oslo',
      country: 'Norway',
    },
    {
      name: 'Katarina Novak',
      email: 'katarina.novak@example.hr',
      password: hashSync('123456', 10),
      role: 'user',
      loyalityId: '550e8400-e29b-41d4-a716-446655440019',
      loyalityType: 'gold',
      phoneNumber: '+385 91 654 321',
      gender: 'Female',
      age: '27',
      dob: '1997-09-10',
      city: 'Zagreb',
      state: 'Zagreb County',
      country: 'Croatia',
    },
  ],
  products: [
    {
      name: 'Polo Sporting Stretch Shirt',
      slug: 'polo-sporting-stretch-shirt',
      category: "Men's Dress Shirts",
      description: 'Classic Polo style with modern comfort',
      images: [
        '/images/sample-products/p1-1.jpg',
        '/images/sample-products/p1-2.jpg',
      ],
      price: 59.99,
      brand: 'Polo',
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: 'banner-1.jpg',
    },
    {
      name: 'Brooks Brothers Long Sleeved Shirt',
      slug: 'brooks-brothers-long-sleeved-shirt',
      category: "Men's Dress Shirts",
      description: 'Timeless style and premium comfort',
      images: [
        '/images/sample-products/p2-1.jpg',
        '/images/sample-products/p2-2.jpg',
      ],
      price: 85.9,
      brand: 'Brooks Brothers',
      rating: 4.2,
      numReviews: 8,
      stock: 10,
      isFeatured: true,
      banner: 'banner-2.jpg',
    },
    {
      name: 'Tommy Hilfiger Classic Fit Dress Shirt',
      slug: 'tommy-hilfiger-classic-fit-dress-shirt',
      category: "Men's Dress Shirts",
      description: 'A perfect blend of sophistication and comfort',
      images: [
        '/images/sample-products/p3-1.jpg',
        '/images/sample-products/p3-2.jpg',
      ],
      price: 99.95,
      brand: 'Tommy Hilfiger',
      rating: 4.9,
      numReviews: 3,
      stock: 0,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'Calvin Klein Slim Fit Stretch Shirt',
      slug: 'calvin-klein-slim-fit-stretch-shirt',
      category: "Men's Dress Shirts",
      description: 'Streamlined design with flexible stretch fabric',
      images: [
        '/images/sample-products/p4-1.jpg',
        '/images/sample-products/p4-2.jpg',
      ],
      price: 39.95,
      brand: 'Calvin Klein',
      rating: 3.6,
      numReviews: 5,
      stock: 10,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'Polo Ralph Lauren Oxford Shirt',
      slug: 'polo-ralph-lauren-oxford-shirt',
      category: "Men's Dress Shirts",
      description: 'Iconic Polo design with refined oxford fabric',
      images: [
        '/images/sample-products/p5-1.jpg',
        '/images/sample-products/p5-2.jpg',
      ],
      price: 79.99,
      brand: 'Polo',
      rating: 4.7,
      numReviews: 18,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'Polo Classic Pink Hoodie',
      slug: 'polo-classic-pink-hoodie',
      category: "Men's Sweatshirts",
      description: 'Soft, stylish, and perfect for laid-back days',
      images: [
        '/images/sample-products/p6-1.jpg',
        '/images/sample-products/p6-2.jpg',
      ],
      price: 99.99,
      brand: 'Polo',
      rating: 4.6,
      numReviews: 12,
      stock: 8,
      isFeatured: true,
      banner: null,
    },
  ]
};

export default sampleData;
