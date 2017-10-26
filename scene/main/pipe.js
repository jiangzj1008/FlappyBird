class Pipe extends GeImage {
    constructor(game) {
        super(game, 'pipe1')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.life = 1
        this.skipCount = 60
        this.score = false
    }
    update() {
        this.skipCount--
        if (this.x < -this.w) {
            // this.x = 200 * 3 - this.w
            this.life--
        }
        this.x -= this.speed
    }
    draw() {
        var context = this.game.context
        context.save()
        var w2 = this.w/2
        var h2 = this.h/2
        context.translate(this.x + w2, this.y + h2)
        var scaleX = this.flipX ? -1 : 1
        var scaleY = this.flipY ? -1 : 1
        context.scale(scaleX, scaleY)
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)
        context.restore()
    }
}
