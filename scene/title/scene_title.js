class SceneTitle extends GeScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.elements = {
            backgrounds: [],
            player: [],
        }
        this.setupBackground()
        this.setupPlayer()
    }
    setupBackground() {
        var game = this.game
        for (var i = 0; i < 3; i++) {
            var bg = Background.new(game)
            bg.x = 288 * i
            this.addElement(bg, 'backgrounds')
        }
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
        g.registerAction('a', function(){
            p.moveLeft()
        })
        g.registerAction('d', function(){
            p.moveRight()
        })
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
                    elements.splice(j, 1)
                }
            }
        }
    }
    update() {
        var types = Object.keys(this.elements)
        for (var i = 0; i < types.length; i++) {
            var type = types[i]
            var elements = this.elements[type]
            for (var j = 0; j < elements.length; j++) {
                var e = elements[j]
                e.update()
            }
        }
    }
}
