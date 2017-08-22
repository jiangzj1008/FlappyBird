class SceneTitle extends GeScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.score = 0
        this.elements = {
            backgrounds: [],
            title: [],
            player: [],
        }
        this.setupBackground()
        this.setupTitle()
        this.setupPlayer()
        this.setupPlayerEvent()
    }
    setupBackground() {
        var game = this.game
        for (var i = 0; i < 3; i++) {
            var bg = Background.new(game)
            bg.x = 288 * i
            this.addElement(bg, 'backgrounds')
        }
    }
    setupTitle() {
        var game = this.game
        var title = Title.new(game, 'begining')
        this.addElement(title, 'title')
    }
    setupPlayer() {
        var game = this.game
        this.player = Player.new(game)
        this.player.gy = 0
        this.addElement(this.player, 'player')
    }
    setupPlayerEvent() {
        var g = this.game
        var self = this
        g.registerAction('k', function(keyStatus){
            var s = Scene.new(g)
            s.elements.backgrounds = self.elements.backgrounds
            g.replaceScene(s)
        })
    }
    drawTips() {
        var text = '按k开始游戏'
        this.game.drawText(text, 0, 25)
    }
    draw() {
        var types = Object.keys(this.elements)
        for (var i = 0; i < types.length; i++) {
            var type = types[i]
            var elements = this.elements[type]
            for (var j = 0; j < elements.length; j++) {
                var e = elements[j]
                this.game.drawImage(e)
            }
        }
        this.drawTips()
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
        this.player.rotation = 0
    }
}
