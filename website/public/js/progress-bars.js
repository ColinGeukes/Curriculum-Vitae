const pointToFill = Math.PI * 1.5;

const COLOR_BACKGROUND = '#ECECEC';
const UPDATE_SPEED = 40;

class ProgressBar {
	static SKILL_LEVELS = ['Novice', 'Beginner', 'Competent', 'Proficient', 'Expert'];
	static SKILL_COLORS = ['#fbb7aa', '#ffd5aa', '#fee9b2', '#eaf0b4', '#b2f7b6'];

	constructor(parent, percentage, spokes = 0, textDisplay = ProgressBar.textProgression, colorDisplay = ProgressBar.progressSingle('#3bf32c')) {
		this.percentage = percentage;
		this.spokes = spokes;
		this.textDisplay = textDisplay;
		this.colorDisplay = colorDisplay;
		this.no = 0;
		this.diff = 0;

		console.log(parent);

		// Add the progress bar div to the parent.
		$(parent).prepend('<div class="circle-progress-bar"><div></div><canvas></canvas><p></p></div>');

		// Keep track of all elements that we want to alter.
		this.element = $(parent + " .circle-progress-bar");
		this.ctx = $(parent + " .circle-progress-bar canvas")[0].getContext('2d');
		this.txt = $(parent + " .circle-progress-bar p");

		// Initial draw.
		this.fillCounter(false);
	}

	start() {
		this.incrementEvent = setInterval(this.fillCounter.bind(this), UPDATE_SPEED);
	}

	fillCounter(increment = true) {
		// Smooth the canvas.
		this.ctx.webkitImageSmoothingEnabled = true;

		// Increment the canvas
		if (increment) {
			this.no++;
			if (this.no >= this.percentage) {
				clearTimeout(this.incrementEvent);     //fill is a variable that call the function fillcounter()
				this.no = this.percentage;
			}
		}

		// Retrieving and calculating values.
		const cw = Math.floor(this.element.width());// counter.canvas.width;
		const ch = Math.floor(this.element.height());//counter.canvas.height;
		const lineWidth = cw * 0.08;
		const spokeWidth = cw * 0.05;
		const outerSpacing = cw * 0.09 - lineWidth / 2;

		// Updating values.
		this.ctx.canvas.width = cw;
		this.ctx.canvas.height = ch;
		this.diff = ((this.no / 100) * Math.PI * 2 * 10);

		// Change the text that is being displayed, using a provided function.
		this.txt.text(this.textDisplay(this.no));

		// Clear the previous canvas
		this.ctx.clearRect(0, 0, cw, ch);

		// Render the progression.
		this.ctx.lineWidth = lineWidth;
		this.ctx.strokeStyle = this.colorDisplay(this.no);
		this.ctx.beginPath();
		this.ctx.arc(cw / 2, cw / 2, (cw - lineWidth) / 2 - outerSpacing, pointToFill, this.diff / 10 + pointToFill);    //arc(x,y,radius,start,stop)
		this.ctx.stroke();

		// Render the segments of the progress bar.
		if (this.spokes > 0) {
			const spokeLength = cw / 2;
			const center = cw / 2;

			this.ctx.lineWidth = spokeWidth;
			this.ctx.beginPath();
			for (let i = 0; i < this.spokes; i++) {
				const rotation = (1 + 2 * (i / this.spokes)) * Math.PI;

				this.ctx.moveTo(cw / 2, cw / 2);
				this.ctx.lineTo(cw / 2 * (1 + Math.sin(rotation)), cw / 2 * (1 + Math.cos(rotation)));
			}
			this.ctx.strokeStyle = "#bbb";
			this.ctx.stroke();
		}

		// Render the central circle on top.
		this.ctx.beginPath();
		this.ctx.fillStyle = COLOR_BACKGROUND;
		this.ctx.moveTo(125, 35);
		this.ctx.arc(cw / 2, cw / 2, (cw - 2 * lineWidth) / 2 - outerSpacing, 0, 2 * Math.PI);
		this.ctx.fill();
	}

	static textProgression(value) {
		return value + '%';
	}

	static progressSingle(color) {
		return function (value) {
			return color;
		};
	}

	static progressArray(array) {
		return function (value) {
			return array[Math.min(Math.floor(value / (100 / array.length)), array.length - 1)];
		}
	}

	static gradiantColor(r1, g1, b1, r2, g2, b2) {
		const rDiff = (r1 - r2) / 100;
		const gDiff = (g1 - g2) / 100;
		const bDiff = (b1 - b2) / 100;

		return function (value) {
			return 'rgb(' + (r1 - rDiff * value) + ',' + (g1 - gDiff * value) + ',' + (b1 - bDiff * value) + ')'
		}
	}
}
