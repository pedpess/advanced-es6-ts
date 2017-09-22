import {NegotiationController} from './controllers/NegotiationController';

let NegotiationController = new NegotiationController();

document.querySelector('.form').onsubmit = negotiationController.add.bind(negotiationController);
document.querySelector('[type=button]').onclick = negotiationController.delete.bind(negotiationController);
