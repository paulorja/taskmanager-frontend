export class Card {
    constructor(
        public status_id?: string,
        public title?: string,
        public description?: string,
        public member?: string,
        public memberImgUrl?: string,
        public date?: string,
        public priority_id?: string
    ) { }
}