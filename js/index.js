var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var inputPng = function(images, name, number) {
    for (var i = 1; i <= number; i++) {
        var key = name + i
        var value = `img/${key}.png`
        images[key] = value
    }
}

var __main = function() {
    var images = {
        background: 'img/bg.png',
        begining: 'img/begining.png',
        ending: 'img/ending.png',
    }

    inputPng(images, 'bird', 3)
    inputPng(images, 'pipe', 1)


    var game = GeGame.instance(30, images, function(g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
