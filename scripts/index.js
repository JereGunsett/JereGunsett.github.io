class Carousel {
    constructor(items, active) {
        this.items = items;
        this.active = active;
        this.direction = '';
        this.rightClick = this.moveRight.bind(this);
        this.leftClick = this.moveLeft.bind(this);
        this.render();
    }

    generateItems() {
        var items = [];
        var level;
        console.log(this.active);
        for (var i = this.active - 2; i < this.active + 3; i++) {
            var index = i;
            if (i < 0) {
                index = this.items.length + i;
            } else if (i >= this.items.length) {
                index = i % this.items.length;
            }
            level = this.active - i;
            items.push(new Item(this.items[index], level));
        }
        return items;
    }

    moveLeft() {
        var newActive = this.active;
        newActive--;
        this.active = newActive < 0 ? this.items.length - 1 : newActive;
        this.direction = 'left';
        this.render();
    }

    moveRight() {
        var newActive = this.active;
        this.active = (newActive + 1) % this.items.length;
        this.direction = 'right';
        this.render();
    }

    render() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div id="carousel" class="noselect">
                <div class="arrow arrow-left" onclick="carousel.leftClick()"><i class="fi-arrow-left"></i></div>
                ${this.generateItems().map(item => item.render()).join('')}
                <div class="arrow arrow-right" onclick="carousel.rightClick()"><i class="fi-arrow-right"></i></div>
            </div>
        `;
    }
}

class Item {
    constructor(id, level) {
        this.id = id;
        this.level = level;
    }

    render() {
        const className = 'item level' + this.level;
        return `
            <div class="${className}">
                ${this.id}
            </div>
        `;
    }
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const carousel = new Carousel(items, 0);