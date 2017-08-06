class Background extends GeImage {
    constructor(game) {
        super(game, 'background')
        this.setup()
    }
    setup() {
        this.speed = 2
        this.life = 1
        this.skipCount = 144
    }
    update() {
        this.skipCount--
        if (this.skipCount == 0) {
            this.x += 288
            this.skipCount = 144
        }
        this.x -= this.speed
    }
}
