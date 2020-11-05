export class NLDate {

    static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    static stringify(date) {
        let stringified = `${String(date.day)}-${date.monthName}-${date.year}`;
        return stringified;
    }

    static getPrettyPrint(date) {
        return `${date.monthName} ${date.day}, ${date.year}`;
    }

    static isDateEqual(nlDate1, nlDate2) {
        let isEqual = (NLDate.stringify(nlDate1) === NLDate.stringify(nlDate2));
        return (isEqual);
    }

    /** Returns true if 'date1' is earlier or equal to 'date2', false otherwise */
    static isDateOnOrEarlier(date1, date2) {
        if (date1.year < date2.year) return true;
        if (date1.year > date2.year) return false;

        // Years are equal
        if (date1.month < date2.month) return true;
        if (date1.month > date2.month) return false;

        // Months are equal
        if (date1.day < date2.day) return true;
        if (date1.day > date2.day) return false;

        // Dates are equal
        return true;
    }

    date;
    day;
    month;
    year;
    monthName;

    constructor(date) {
        if (date) {
            this.date = date;
            this.parseDate(date);
        }
    };

    now() {
        return this.parseDate(new Date());
    };

    parseDate(date) {
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear().toString();
        this.monthName = NLDate.months[this.month];
        return this;
    }
}

