import { Record } from "immutable";
import firebase from 'firebase';

export interface ConcertInterface {
    id: string
    date: Date
    lieu: String
    sale: String
    link: String
};

const ConcertDefaultProps: ConcertInterface = {
    id: '',
    date: new Date(),
    lieu: 'Paris',
    sale: 'Arena Accord Hotel',
    link: 'https://google.com'
};

class Concert extends Record(ConcertDefaultProps) implements ConcertInterface {

    constructor(doc: firebase.firestore.DocumentSnapshot) {
        let data = Object.assign({ 'id': doc.id }, doc.data());
        console.log(data);
        data['date'] = new Date(data['date']['seconds'] * 1000);
        super(data);
    }

    public get formatedDate(): string {
        let day = this.date.getDate().toString()
        if (day.length === 1) day = `0${day}`;
        let month = (this.date.getMonth() + 1).toString();
        if (month.length === 1) month = `0${month}`;


        return `${day}/${month}/${this.date.getFullYear()}`;
    }
}

export default Concert;



