import { Time } from '@angular/common';
import { Moment, Duration } from 'moment';

export class Todo {

    id: number;
    name: string;
    details: string;
    done: boolean;
    date: Date;
    timeStart: Date;
    timeEnd: Moment;
    timeSpan: Duration;
}