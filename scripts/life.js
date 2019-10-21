var space = document.getElementById('pentacorn-in-space');
var spaceParams = { fullscreen: true };
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

        this.run();
        this.draw();
    }

    run() { 
        state = {};

        for (i = 0; i < this.params.number; i++) {
            state = this.stateTransition(state)
            this.draw();
        }
    }

    stateTransition(state) {
        if (state = null) {
            state = {
                x: this.middleX,
                y: this.middleY,
                size: this.params.size,
            }
        } else {
            state = {
                x: state.x + this.params.translateX,
                y: state.y + this.params.translateY,
                size: state.size * this.params.translateSize,
            }
        }

        return state;
    }

    draw() {
        this.two.makeCircle(this.middleX, this.middleY, this.params.size);
        this.two.update();
    }   
}

// Get params
function getParams() {
    return {
        size: 100
    };
}

seq = new Sequencer(drawTwo, getParams());



// // two has convenience methods to create shapes.
// var circle = drawTwo.makeCircle(720, 100, 50);
// var rect = drawTwo.makeRectangle(213, 100, 100, 100);

// // The object returned has many stylable properties:

// // Don't forget to tell two to render everything
// // to the screen
// drawTwo.update();

// circle.fill = '#FF8000';
// circle.stroke = 'orangered'; // Accepts all valid css color
// circle.linewidth = 5;

// rect.fill = 'rgb(0, 200, 255)';
// rect.opacity = 0.75;
// rect.noStroke();

// drawTwo.update();