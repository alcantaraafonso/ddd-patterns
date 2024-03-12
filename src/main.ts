import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer('1', 'John Doe', new Address('123 Main St', 'Anytown', '12345', 10));
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 100, 1);
const item2 = new OrderItem('2', 'Item 2', 200, 2);

const order = new Order('1', customer._id, [item1, item2]);