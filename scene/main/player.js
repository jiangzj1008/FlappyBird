class Player extends GeImage {
    constructor(game) {
        super(game, 'bird1')
        this.setup()
    }
    setup() {
        this.life = 2
        this.x = (300 - this.w) / 2
        this.y = (512- this.h) / 2
        this.speed = 5
        this.gy = 1
        this.vy = 0
        this.setupFrames('bird', 3)
    }
    setupFrames(name, frameNum) {
        var game = this.game
        this.frames = []
        for (var i = 1; i <= frameNum; i++) {
            var n = `${name}${i}`
            var t = game.textureByName(n)
            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = frameNum
        this.frameNum = frameNum
    }
    move(x) {
        if (x < 0) {
            x = 0
        } else if (x > 300 - this.w) {
            x = 300 - this.w
        }
        this.x = x
    }
    moveLeft(status) {
        if (status == 'down') {
            this.flipX = true
            this.move((this.x - this.speed))
        }
    }
    moveRight(status) {
        if (status == 'down') {
            this.flipX = false
            this.move((this.x + this.speed))
        }
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        // if (this.life < 2) {
        //     return
        // }
        // vy
        this.vy += this.gy
        this.y += this.vy
        if (this.y > 512) {
            this.life--
        }
        // rotation
        if (this.rotation < 45) {
            this.rotation += 5
        } else {
            this.rotation = 45
        }
        // frame
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = this.frameNum
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
        }
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
