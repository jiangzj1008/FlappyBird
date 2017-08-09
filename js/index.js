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
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var inputImg = function(images, name, num) {
    for (var i = 1; i < num + 1; i++) {
        var n = name + i
        var path = 'img/' + n + '.png'
        images[n] = path
    }
}

var __main = function() {
    var images = {
        background: 'img/bg.png',
    }
    inputImg(images, 'bird', 3)
    inputImg(images, 'run', 6)
    inputImg(images, 'stand', 4)

    var game = GeGame.instance(30, images, function(g) {
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
