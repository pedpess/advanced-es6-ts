import {NegotiationController} from './controllers/NegotiationController';
import {currentInstance} from './controllers/NegotiationController';

let negotiationController = currentInstance();

document.querySelector('.form').onsubmit = negotiationController.add.bind(negotiationController);
document.querySelector('[type=button]').onclick = negotiationController.delete.bind(negotiationController);
