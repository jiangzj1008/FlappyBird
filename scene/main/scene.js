class Scene extends GeScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.score = 0
        this.elements = {
            backgrounds: [],
            pipes: [],
            player: [],
        }
        this.setupPlayer()
        this.setupPipe()
    }
    setupPipe() {
        this.pipeBetween = 200
        this.pipeSpace = 200
        var game = this.game
        for (var i = 0; i < 3; i++) {
            var p1 = Pipe.new(game)
            var p2 = Pipe.new(game)
            p1.x = this.pipeBetween * i + 350
            p2.x = p1.x
            p1.y = this.randomBetween(-400, -200)
            p2.y = p1.y + this.pipeSpace + p1.h
            p2.flipY = true
            this.addElement(p1, 'pipes')
            this.addElement(p2, 'pipes')
        }
    }
    addNewPipe() {
        var game = this.game
        var p1 = Pipe.new(game)
        var p2 = Pipe.new(game)
        p1.x = this.pipeBetween + 350
        p2.x = p1.x
        p1.y = this.randomBetween(-400, -200)
        p2.y = p1.y + this.pipeSpace + p1.h
        p2.flipY = true
        this.addElement(p1, 'pipes')
        this.addElement(p2, 'pipes')
    }
    setupPlayer() {
        var game = this.game
        this.player = Player.new(game)
        this.addElement(this.player, 'player')
        this.setupPlayerEvent()
    }
    setupPlayerEvent() {
        var g = this.game
        var p = this.player
        g.registerAction('a', function(keyStatus){
            p.moveLeft(keyStatus)
        })
        g.registerAction('d', function(keyStatus){
            p.moveRight(keyStatus)
        })
        g.registerAction('j', function(keyStatus){
            p.jump(keyStatus)
        })
    }
    drawScore() {
        var text = '得分：' + this.score
        this.game.drawText(text, 0, 25)
    }
    detect() {
        var bird = this.player
        var pipes = this.elements.pipes
        for (var i = 0; i < pipes.length; i++) {
            var p = pipes[i]
            if (bird.collide(p)) {
                bird.life--
            }
        }
        if (bird.life <= 1) {
            var self = this
            self.update = function() {}
            setTimeout(function () {
                self.end()
            }, 1000)
        }
    }

    end() {
        var g = this.game
        var self = this
        var s = SceneEnd.new(g)
        s.elements.backgrounds = self.elements.backgrounds
        s.score = self.score
        g.replaceScene(s)
    }


    draw() {
        var types = Object.keys(this.elements)
        for (var i = 0; i < types.length; i++) {
            var type = types[i]
            var elements = this.elements[type]
            for (var j = 0; j < elements.length; j++) {
                var e = elements[j]
                if (e.life > 0) {
                    this.game.drawImage(e)
                } else {
                    this.score++
                    this.addNewPipe()
                    elements.splice(j, 2)
                }
            }
        }
        this.drawScore()
    }
    update() {
        if (window.paused) {
            return
        }
        var types = Object.keys(this.elements)
        for (var i = 0; i < types.length; i++) {
            var type = types[i]
            var elements = this.elements[type]
            for (var j = 0; j < elements.length; j++) {
                var e = elements[j]
                e.update()
            }
        }
        this.detect()
    }
}
