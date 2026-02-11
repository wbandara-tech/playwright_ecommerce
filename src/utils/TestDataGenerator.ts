import { faker } from '@faker-js/faker';
import { SignupFormData } from '../pages/SignupPage';
import { PaymentData } from '../pages/PaymentPage';

export class TestDataGenerator {
  static generateEmail(): string {
    const timestamp = Date.now();
    return `testuser_${timestamp}@mail.com`;
  }

  static generateName(): string { return faker.person.firstName(); }

  static generateSignupData(overrides?: Partial<SignupFormData>): SignupFormData {
    return {
      title: 'Mr',
      name: faker.person.firstName(),
      password: 'Test@12345',
      day: '15',
      month: '6',
      year: '1995',
      newsletter: true,
      specialOffers: true,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'United States',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode('#####'),
      mobileNumber: faker.phone.number({ style: 'national' }),
      ...overrides,
    };
  }

  static generatePaymentData(overrides?: Partial<PaymentData>): PaymentData {
    return {
      nameOnCard: faker.person.fullName(),
      cardNumber: '4100000000000100',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2030',
      ...overrides,
    };
  }

  static generateContactData() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      subject: faker.lorem.sentence(4),
      message: faker.lorem.paragraph(2),
    };
  }

  static generateReviewData() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      review: faker.lorem.paragraph(1),
    };
  }
}
