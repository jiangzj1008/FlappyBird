class Player extends GeImage {
    constructor(game) {
        super(game, 'run1')
        this.setup()
    }
    setup() {
        this.life = 1
        this.x = (500 - this.w) / 2
        this.y = 500 - this.h - 50
        this.speed = 10
        this.count = 0
        this.cooldown = 5
        this.framesRun = this.setupFrames('run')
        this.framesStand = this.setupFrames('stand')
    }
    setupFrames(name) {
        var arr = []
        var keys = Object.keys(this.game.images)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            if (key.indexOf(name) == 0) {
                arr.push(key)
            }
        }
        return arr
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
    update() {
        var frames = this.framesStand
        if (this.cooldown == 0) {
            var num = this.count % frames.length
            var name = frames[num]
            this.texture = this.game.textureByName(name)
            this.count++
            this.cooldown = 5
        }
        this.cooldown--
    }
}
