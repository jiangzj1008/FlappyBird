class Player extends GeImage {
    constructor(game) {
        super(game, 'stand1')
        this.setup()
    }
    setup() {
        this.life = 1
        this.x = (500 - this.w) / 2
        this.y = 500 - this.h - 50
        this.speed = 3
        this.count = 0
        this.cooldown = 5
        this.jump = false
        this.framesRun = this.setupFrames('run')
        this.framesStand = this.setupFrames('stand')
        this.framesJump = this.setupFrames('jump')
        this.frames = this.framesStand
        this.setupPlayerEvent()
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
    setupPlayerEvent() {
        var g = this.game
        var p = this
        g.registerAction('a', function(status){
            p.moveLeft(status)
        })
        g.registerAction('d', function(status){
            p.moveRight(status)
        })
        g.registerAction('k', function(status){
            // p.jump(status)
        })
    }
    moveLeft() {
        this.move((this.x - this.speed))
    }
    moveRight() {
        this.move((this.x + this.speed))
    }
    jump() {
        
    }
    action() {
        var g = this.game
        var keydowns = g.keydowns
        var actions = g.actions
        // 根据按键组合改变状态
        this.frames = this.framesStand
        if (keydowns['a'] == 'down' || keydowns['d'] == 'down') {
            this.frames = this.framesRun
        }
        if ((keydowns['a'] == 'down' && keydowns['k'] == 'down') || (keydowns['d'] == 'down' && keydowns['k'] == 'down')) {
            this.frames = this.framesJump
        }
        // 根据按键控制动作
        if (keydowns['a'] == 'down') {
            this.moveLeft()
        } else if (keydowns['d'] == 'down') {
            this.moveRight()
        }
    }
    update() {
        this.action()
        var frames = this.frames
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
