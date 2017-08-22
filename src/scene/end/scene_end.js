class SceneEnd extends GeScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.score = 0
        this.elements = {
            backgrounds: [],
            title: [],
            pipes: [],
            player: [],
        }
        this.setupTitle()
        this.setupPlayerEvent()
    }
    setupTitle() {
        var game = this.game
        var title = Title.new(game, 'ending')
        this.addElement(title, 'title')
    }
    setupPlayerEvent() {
        var g = this.game
        var self = this
        g.registerAction('r', function(keyStatus){
            var s = SceneTitle.new(g)
            g.replaceScene(s)
        })
    }
    drawTips() {
        var text = '按r重新开始游戏'
        this.game.drawText(text, 0, 25)
    }
    drawScore() {
        var text = '得分：' + this.score
        this.game.drawText(text, 100, 270)
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
        this.drawScore()
    }
    update() {
        return
    }
}
