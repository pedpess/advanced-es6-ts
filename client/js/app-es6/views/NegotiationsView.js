import {View} from './View';

export class NegotiationsView extends View {

    constructor(element) {
        super(element);
    }

    template(model) {
        return `
        <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th onclick="negotiationController.order('date')">DATA</th>
                <th onclick="negotiationController.order('quantity')">QUANTITY</th>
                <th onclick="negotiationController.order('value')">VALUE</th>
                <th onclick="negotiationController.order('volume')">VOLUME</th>
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
