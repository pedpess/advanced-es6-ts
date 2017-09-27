import { NegotiationController } from './controllers/NegotiationController';
const controller = new NegotiationController();

$('.form').submit(controller.add.bind(controller));
$('#import-button').click(controller.importNegotiations.bind(controller));
