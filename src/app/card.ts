export class Card {
    constructor(
        public status?: string,
        public title?: string,
        public description?: string,
        public member?: string,
        public memberImgUrl?: string,
        public date?: string,
        public priority?: string
    ) { }
}