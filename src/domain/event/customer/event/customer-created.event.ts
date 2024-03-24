import EventInterface from "../../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;
    eventType: string;

    constructor(customer: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = customer;
        this.eventType = 'customer.created';
    }
}