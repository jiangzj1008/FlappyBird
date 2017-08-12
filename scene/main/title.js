class Title extends GeImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }
    setup() {
        this.x = (300 - this.w) / 2
        this.y = (512- this.h) / 2 - 50
    }
    update() {
    }
}
