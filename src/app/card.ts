export class Card {
    constructor(
        public status?: string,
        public title?: string,
        public description?: string,
        public owner?: string,
        public date?: string,
        public priority?: number
    ) { }
}