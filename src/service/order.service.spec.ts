import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should get total of all orders", () => {

        const order_item1 = new OrderItem("1", "item 1", 100, "product 1", 1);
        const order_item2 = new OrderItem("2", "item 2", 200, "product 2", 2);

        
        const order1 = new Order("1", "Customer 1", [order_item1]);
        const order2 = new Order("2", "Customer 1", [order_item2]);
        
        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });
});
