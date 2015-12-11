// Conway's Game of Life
// Luke Mitchell
// github.com/lukem512

// Globals (sorry!)
var width = 100;
var height = 100;
var ticks = 0;

var cells = new Array(width);
for (var x = 0; x < width; x++) {
  cells[x] = new Array(height);
}

// Return the number of neighbours to cell (x,y)
function neighbours (x, y) {
    var n = 0;

    if (x > 0) {
        if (y > 0)
            if (cells[x-1][y-1]) n++;
        if (y < height - 1)
            if (cells[x-1][y+1]) n++;
        if (cells[x-1][y  ]) n++;
    }

    if (y > 0)
        if (cells[x  ][y-1]) n++;
    if (y < height - 1)
        if (cells[x  ][y+1]) n++;

    if (x < width-1) {
        if (y > 0)
            if (cells[x+1][y-1]) n++;
        if (y < height - 1)
           if (cells[x+1][y+1]) n++;
        if (cells[x+1][y  ]) n++;
    }

    return n;
}

function print(ctx) {
    pixelSize = 10;

    ctx.save();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            if (cells[x][y])
                ctx.fillStyle = "#000000";
            else
                ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(x, y, 1, 1);
        }
    }
    ctx.restore();
}

// Seed
function seed() {
    for (var x = 0; x < width; x++)
        for (var y = 0; y < height; y++)
            cells[x][y] = false;

    var bx = 30;
    var by = 30;

    cells[bx+4][by] = true;

    cells[bx+2][by+1] = true;
    cells[bx+3][by+1] = true;
    cells[bx+4][by+1] = true;
    
    cells[bx+1][by+2] = true;

    cells[bx+1][by+3] = true;
    cells[bx+4][by+3] = true;
    cells[bx+5][by+3] = true;
    cells[bx+6][by+3] = true;

    cells[bx  ][by+4] = true;
    cells[bx+1][by+4] = true;
    cells[bx+3][by+4] = true;
    cells[bx+7][by+4] = true;

    cells[bx+3][by+5] = true;
    cells[bx+7][by+5] = true;

    cells[bx+3][by+6] = true;
    cells[bx+7][by+6] = true;

    cells[bx+3][by+7] = true;
    cells[bx+7][by+7] = true;
    cells[bx+9][by+7] = true;
    cells[bx+10][by+7] = true;

    cells[bx+4][by+8] = true;
    cells[bx+5][by+8] = true;
    cells[bx+6][by+8] = true;
    cells[bx+9][by+8] = true;

    cells[bx+9][by+9] = true;

    cells[bx+6][by+10] = true;
    cells[bx+7][by+10] = true;
    cells[bx+8][by+10] = true;
    
    cells[bx+6][by+11] = true;
}

// Tick
function tick() {
    var next = new Array(width);
    for (var x = 0; x < width; x++)
      next[x] = new Array(height);
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            next[x][y] = cells[x][y];
            var n = neighbours(x, y);
            if (cells[x][y]) {
                if (n < 2) next[x][y] = false;
                if (n > 3) next[x][y] = false;
            } else {
                if (n == 3) next[x][y] = true;
            }
        }
    }
    cells = next;
    ticks++;
}

