
import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../event/customer-created.event";

export default class CustomerCreatedMessage1 implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é a primeira console.log do evento: CustomerCreated")
    }
    
}