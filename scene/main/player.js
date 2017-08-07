class Player extends GeImage {
    constructor(game) {
        super(game, 'bird1')
        this.setup()
    }
    setup() {
        this.frames = ['bird1', 'bird2', 'bird3']
        this.life = 1
        this.x = (500 - this.w) / 2
        this.y = 500 - this.h - 50
        this.speed = 10
        this.count = 0
        this.cooldown = 3
    }
    move(x) {
        if (x < 0) {
            x = 0
        } else if (x > 500 - this.w) {
            x = 500 - this.w
        }
        this.x = x
    }
    moveLeft() {
        this.move((this.x - this.speed))
    }
    moveRight() {
        this.move((this.x + this.speed))
    }
    die() {
        var d = PlayerDie.new(this.game)
        d.x = this.x
        d.y = this.y
        this.scene.addElement(d, 'dead')
    }
    update() {
        if (this.cooldown == 0) {
            var num = this.count % this.frames.length
            var name = this.frames[num]
            this.texture = this.game.textureByName(name)
            this.count++
            this.cooldown = 3
        }
        this.cooldown--
    }
}
