import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";


describe("Product repository test", () => {
    let sequelize: Sequelize;
    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "City 1", "zipcode", 20);
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({ where: {id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            zipCode: customer.address.zipCode
        });
    });

    it("should update a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", "City 1", "zipcode", 20);
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({ where: {id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            zipCode: customer.address.zipCode,
            city: customer.address.city
        });

        customer.changeName("Customer 2");
        await customerRepository.update(customer);
        const productModel2 = await CustomerModel.findOne({ where: {id: "1" } });
        expect(productModel2.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            zipCode: customer.address.zipCode,
            city: customer.address.city
        });
    });

    it("should find a customer by id", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", "City 1", "zipcode", 20);
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerFound = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(customerFound);
    });

    it("shold throw an error when customer is not found", async() => {
        const customerRepository = new CustomerRepository();

        expect(async() => {
            await customerRepository.find("456ABC");
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", "City 1", "zipcode 1", 1);
        customer.changeAddress(address);
        customer.addRewardPoints(10);
        customer.activate();
        await customerRepository.create(customer);
        
        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 2", "City 2", "zipcode 2", 2);
        customer2.changeAddress(address2);
        customer2.addRewardPoints(20);
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();
        const customers = [ customer, customer2 ];

        expect(foundCustomers).toHaveLength(2);
        expect(customers).toContainEqual(customer);
        expect(customers).toContainEqual(customer2);
    });
});