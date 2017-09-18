/* Código simplório, apenas para fornecer o serviço para a aplicação */

var api = require('../api');

module.exports  = function(app) {

    app.route('/negotiations/week')
        .get(api.listWeek);

    app.route('/negotiations/weekbefore')
        .get(api.listWeekBefore);

    app.route('/negotiations/weekbeforemore')
        .get(api.listWeekBeforeMore);

    app.route('/negotiations')
        .post(api.addNegotiation);
};
