import {View} from './View';
import {DateHelper} from '../helpers/DateHelper'
import {currentInstance} from '../controllers/NegotiationController';

export class NegotiationsView extends View {

    constructor(element) {
        super(element);

        element.addEventListener('click', function (event) {
            if (event.target.nodeName == 'TH') {

                currentInstance().order(event.target.textContent.toLowerCase());

            }
        });
    }

    template(model) {
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
        ${model.negotiations
                .map(
                n => `
          <tr>
          <td>${DateHelper.dateToText(n.date)}</td>
          <td>${n.quantity}</td>
          <td>${n.value}</td>
          <td>${n.volume}</td>
          </tr>
          `).join("")}
        </tbody>
        <tfoot>
        <td colspan="3"></td>
        <td>${
            model.totalVolume
            }
        </td>
        </tfoot>
    </table>
        `;
    }
}

let negotiationController = new NegotiationController();
export function currentInstance() {

    return negotiationController;
}
