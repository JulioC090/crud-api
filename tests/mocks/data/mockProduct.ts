import Product from '@/entities/Product';
import { faker } from '@faker-js/faker/locale/en_US';

export const mockProduct = (): Product => {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words({ min: 1, max: 3 }),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    price: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
  };
};

export const mockProducts = (amount: number): Array<Product> => {
  return new Array(amount).fill({}).map(mockProduct);
};

export const mockProductId = (): Product['id'] => {
  return faker.string.uuid();
};

export const mockProductWithoutId = (): Omit<Product, 'id'> => {
  return {
    name: faker.lorem.words({ min: 1, max: 3 }),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    price: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
  };
};

export const mockProductWithoutIdAndName = (): Omit<Product, 'id' | 'name'> => {
  return {
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    price: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
  };
};

export const mockProductWithoutIdAndDescription = (): Omit<
  Product,
  'id' | 'description'
> => {
  return {
    name: faker.lorem.words({ min: 1, max: 3 }),
    price: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
  };
};

export const mockProductWithoutIdAndPrice = (): Omit<
  Product,
  'id' | 'price'
> => {
  return {
    name: faker.lorem.words({ min: 1, max: 3 }),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
  };
};

export const mockProductWithoutIdAndEmptyName = (): Omit<Product, 'id'> => {
  return {
    name: '',
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    price: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
  };
};

export const mockProductWithoutIdAndEmptyDescription = (): Omit<
  Product,
  'id'
> => {
  return {
    name: faker.lorem.words({ min: 1, max: 3 }),
    description: '',
    price: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
  };
};

export const mockProductWithOnlyName = (): Partial<Product> => {
  return {
    name: faker.lorem.words({ min: 1, max: 3 }),
  };
};

export const mockProductWithOnlyDescription = (): Partial<Product> => {
  return {
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
  };
};

export const mockProductWithOnlyPrice = (): Partial<Product> => {
  return {
    price: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
  };
};

export const mockProductWithoutIdAndInvalidPrice = (): Partial<Product> => {
  return {
    name: faker.lorem.words({ min: 1, max: 3 }),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    price: faker.number.float({ min: -10000, max: -1, fractionDigits: 2 }),
  };
};
