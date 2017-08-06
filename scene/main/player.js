class PlayerDie extends GeImage {
    constructor(game) {
        super(game, 'player')
        this.name = 'player_die'
        this.setup()
    }
    setup() {
        this.life = 1
        this.changeCount = 1
        this.changeTimes = 4
        this.cooldown = 3
        var name = this.name + this.changeCount
        this.texture = this.game.textureByName(name)
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        } else {
            if (this.changeCount < this.changeTimes) {
                var name = this.name + (this.changeCount + 1)
                this.texture = this.game.textureByName(name)
                this.changeCount++
                this.cooldown = 3
            } else {
                this.life = 0
            }
        }
    }
}

class Player extends GeImage {
    constructor(game) {
        super(game, 'bird1')
        this.setup()
    }
    setup() {
        this.life = 1
        this.x = (500 - this.w) / 2
        this.y = 800 - this.h - 50
        this.speed = 15
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

    }
}
