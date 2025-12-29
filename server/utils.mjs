
export function translateDayEngToIta(dayEng) {

    switch(dayEng) {
        case 'Monday':
            return 'Lunedì';
        case 'Tuesday':
            return 'Martedì';
        case 'Wednesday':
            return 'Mercoledì';
        case 'Thursday':
            return 'Giovedì';
        case 'Friday':
            return 'Venerdì';
        case 'Saturday':
            return 'Sabato';
        case 'Sunday':
            return 'Domenica';
        default:
            return dayEng;
    }

}