export class DateHelper {

    constructor() {
        throw new Error('DateHelper dont instantiate');
    }

    static textToDate(text) {
        if (!/\d{2}\/\d{2}\/\d{4}/.test(text)) {
            throw new Error('Date should be dd/mm/aaaa');
        }
        return new Date(...text.split('-').map((item, index) => item - index % 2));
    }

    static dateToText(date) {

        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
}
