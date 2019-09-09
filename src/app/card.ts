export class Card {
    constructor(
        public id?: number,
        public status_id?: number,
        public title?: string,
        public description?: string,
        public member_id?: number,
        public date?: string,
        public priority_id?: number
    ) { }
}