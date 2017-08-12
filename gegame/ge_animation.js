class GeAnimation {
    constructor(game, name, frameNum) {
        this.game = game
        this.frames = []
        for (var i = 1; i <= frameNum; i++) {
            var name = `${name}${i}`
            var t = game.textureByName(name)
            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = frameNum
        this.frameNum = frameNum
    }
    static new(game, name, frameNum) {
        return new this(game, name, frameNum)
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            console.log();
            this.frameCount = this.frameNum
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
        }
    }
    draw() {
        this.game.drawImage(this)
    }
}
