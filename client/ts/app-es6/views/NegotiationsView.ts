import { View } from './View';
import { NegotiationController } from './../controllers/NegotiationController';
import { NegotiationList } from './../models/NegotiationList';
import { DateHelper } from '../helpers/DateHelper'

export class NegotiationsView extends View<NegotiationList>{


    template(model: NegotiationList): string {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTITY</th>
                    <th>VALUE</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

        <tbody>
            ${model.negotiations.map(negotiation =>
                `
                <tr>
                    <td>${DateHelper.dateToText(negotiation.date)}</td>
                    <td>${negotiation.quantity}</td>
                    <td>${negotiation.value}</td>
                    <td>${negotiation.volume}</td>
                </tr>
                `).join("")}
        </tbody>
        <tfoot>
            <td colspan="3"></td>
            <td>
                ${model.totalVolume}
            </td>
        </tfoot>
        </table>
        `;
    }
}
