import { Negotiation } from './../models/Negotiation';
import { View } from './View';

export class MessageView extends View<string> {

    constructor(element) {
        super(element);
    }

    template(model: string): string {
        return `<p class ="alert alert-info">${model}</p>`;
    }
}
