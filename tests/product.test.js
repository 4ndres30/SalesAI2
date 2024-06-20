const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Product = require('../src/models/Product');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salesai_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Product API', () => {
    beforeEach(async () => {
        await Product.deleteMany({});
    });

    it('should create a product', async () => {
        const res = await request(app)
            .post('/products')
            .send({
                name: 'Test Product',
                price: 100,
                description: 'Test Description',
                category: 'Test Category',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get all products', async () => {
        const product = new Product({
            name: 'Test Product',
            price: 100,
            description: 'Test Description',
            category: 'Test Category',
        });
        await product.save();

        const res = await request(app).get('/products');

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Agrega más pruebas para actualizar y eliminar productos
});
