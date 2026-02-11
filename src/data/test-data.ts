export const TestData = {
  BASE_URL: process.env.BASE_URL || 'https://automationexercise.com',
  REGISTERED_USER: {
    email: process.env.TEST_USER_EMAIL || 'testuser_auto@example.com',
    password: process.env.TEST_USER_PASSWORD || 'Test@12345',
    name: process.env.TEST_USER_NAME || 'TestUser',
  },
  INVALID_USER: {
    email: 'invalid_nonexistent_user@fakeemail.com',
    password: 'WrongPassword123!',
  },
  SEARCH_TERMS: {
    tshirt: 'T-shirt',
    dress: 'Dress',
    top: 'Top',
    jeans: 'Jeans',
    shirt: 'Shirt',
    saree: 'Saree',
  },
  CATEGORIES: {
    women: { name: 'Women', subCategories: ['Dress', 'Tops', 'Saree'] },
    men: { name: 'Men', subCategories: ['Tshirts', 'Jeans'] },
    kids: { name: 'Kids', subCategories: ['Dress', 'Tops & Shirts'] },
  },
  BRANDS: ['Polo', 'H&M', 'Madame', 'Mast & Harbour', 'Babyhug', 'Allen Solly Junior', 'Kookie Kids', 'Biba'],
  COUNTRIES: ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'],
} as const;
