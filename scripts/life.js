var space = document.getElementById('pentacorn-in-space');
var spaceParams = { fullscreen: false };
var drawTwo = new Two(spaceParams).appendTo(space);

class Sequencer { 
    two = null;
    params = null;

    // Internal
    middleX = 0;
    middleY = 0;

    constructor(two, params) {
        this.middleX = parseInt(two.width / 2, 10);
        this.middleY = parseInt(two.height / 2, 10);

        // Save params
        this.params = params;

        // Save two drawing library
        this.two = two;
    }

    start() { 
        this.run();
    }

    run() { 
        let state = null;

        for (let i = 0; i < this.params.number; i++) {
            state = this.stateTransition(state)
            this.draw(state);
        }
        this.two.update();
    }

    stateTransition(state) {
        if (state == null) {
            state = {
                x: this.middleX,
                y: this.middleY,
                size: this.params.size,
                rotation: 0,
                colorStroke: this.params.colorStroke,
                colorFill: this.params.colorFill,
            }
        } else {
            state = {
                x: state.x + this.params.translateX,
                y: state.y + this.params.translateY,
                size: state.size * this.params.translateSize,
                rotation: state.rotation + this.params.translateRotation,
                colorStroke: state.colorStroke,
                colorFill: state.colorFill,
            }
        }

        return state;
    }

    draw(state) {
        let poly = this.two.makePolygon(state.x, state.y, state.size, 4);
        poly.fill = state.colorFill;
        poly.stroke = state.colorStroke;
        poly.linewidth = 3;
        poly.rotation = state.rotation;
    }   
}

// Get params from the UI
function getParams() {
    return {
        size: parseInt($('#size').val(), 10),
        translateX: parseInt($('#translateX').val(), 10),
        translateY: parseInt($('#translateY').val(), 10),
        number: parseInt($('#number').val(), 10),
        translateSize: $('#translateSize').val(),
        translateRotation: Math.PI * parseInt($('#translateRotation').val(), 10) / 180,
        colorFill: colorFillRGBA,
        colorStroke: colorStrokeRGBA,
    };
}

redraw = () => {
    console.log('.');
    drawTwo.clear();
    let seq = new Sequencer(drawTwo, getParams());
    seq.start();
}

// Setup color picker
iro.use(iroTransparencyPlugin);
let colorFill = new iro.ColorPicker('#colorFill', {
    width: 120,
    transparency: true,
})
let colorStroke = new iro.ColorPicker('#colorStroke', {
    width: 120,
    transparency: true, 
})
let colorFillRGBA, colorStrokeRGBA
let pickColor = () => {
    colorFillRGBA = colorFill.color.rgbaString
    colorStrokeRGBA = colorStroke.color.rgbaString
}
pickColor()

// Setup change events
$(function () {
    redraw();
    $('#size,#translateSize,#translateX,#translateY,#translateRotation,#number').on('input', redraw);
    colorFill.on('color:change', () => { pickColor(); redraw(); });
    colorStroke.on('color:change', () => { pickColor(); redraw(); });
});