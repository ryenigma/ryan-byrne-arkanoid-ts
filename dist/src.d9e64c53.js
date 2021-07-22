// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var CanvasView = /** @class */function () {
    function CanvasView(canvasName) {
        this.canvas = document.querySelector(canvasName);
        this.context = this.canvas.getContext('2d');
        this.scoreDisplay = document.querySelector('#score');
        this.start = document.querySelector('#start');
        this.info = document.querySelector('#info');
    }
    CanvasView.prototype.clear = function () {
        var _a;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    CanvasView.prototype.initStartButton = function (startFunction) {
        var _this = this;
        var _a;
        (_a = this.start) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            return startFunction(_this);
        });
    };
    CanvasView.prototype.drawScore = function (score) {
        if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
    };
    CanvasView.prototype.drawInfo = function (text) {
        if (this.info) this.info.innerHTML = text;
    };
    CanvasView.prototype.drawSprite = function (brick) {
        var _a;
        if (!brick) return;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(brick.image, brick.pos.x, brick.pos.y, brick.width, brick.height);
    };
    CanvasView.prototype.drawBricks = function (bricks) {
        var _this = this;
        bricks.forEach(function (brick) {
            return _this.drawSprite(brick);
        });
    };
    return CanvasView;
}();
exports.CanvasView = CanvasView;
},{}],17:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Ball = /** @class */function () {
    function Ball(speed, ballSize, position, image) {
        this.ballSize = ballSize;
        this.position = position;
        this.ballImage = new Image();
        this.ballSize = ballSize;
        this.position = position;
        this.speed = {
            x: speed,
            y: -speed
        };
        this.ballImage.src = image;
    }
    Object.defineProperty(Ball.prototype, "width", {
        // Getters
        get: function get() {
            return this.ballSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "height", {
        get: function get() {
            return this.ballSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "pos", {
        get: function get() {
            return this.position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "image", {
        get: function get() {
            return this.ballImage;
        },
        enumerable: false,
        configurable: true
    });
    // Methods
    Ball.prototype.changeYDirection = function () {
        this.speed.y = -this.speed.y;
    };
    Ball.prototype.changeXDirection = function () {
        this.speed.x = -this.speed.x;
    };
    Ball.prototype.moveBall = function () {
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
    };
    return Ball;
}();
exports.Ball = Ball;
},{}],18:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Paddle = /** @class */function () {
    function Paddle(speed, paddleWidth, paddleHeight, position, image) {
        var _this = this;
        this.speed = speed;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.position = position;
        this.paddleImage = new Image();
        this.handleKeyUp = function (e) {
            if (e.code === "ArrowLeft" || e.key === "ArrowLeft") _this.moveLeft = false;
            if (e.code === "ArrowRight" || e.key === "ArrowRight") _this.moveRight = false;
        };
        this.handleKeyDown = function (e) {
            if (e.code === "ArrowLeft" || e.key === "ArrowLeft") _this.moveLeft = true;
            if (e.code === "ArrowRight" || e.key === "ArrowRight") _this.moveRight = true;
        };
        this.speed = speed;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.position = position;
        this.moveLeft = false;
        this.moveRight = false;
        this.paddleImage.src = image;
        // Event Listeners
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }
    Object.defineProperty(Paddle.prototype, "width", {
        // Getters
        get: function get() {
            return this.paddleWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "height", {
        get: function get() {
            return this.paddleHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "pos", {
        get: function get() {
            return this.position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "image", {
        get: function get() {
            return this.paddleImage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "isMovingLeft", {
        get: function get() {
            return this.moveLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "isMovingRight", {
        get: function get() {
            return this.moveRight;
        },
        enumerable: false,
        configurable: true
    });
    Paddle.prototype.movePaddle = function () {
        if (this.moveLeft) this.pos.x -= this.speed;
        if (this.moveRight) this.pos.x += this.speed;
    };
    return Paddle;
}();
exports.Paddle = Paddle;
},{}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Collision = /** @class */function () {
    function Collision() {}
    Collision.prototype.isCollidingBrick = function (ball, brick) {
        if (ball.pos.x < brick.pos.x + brick.width && ball.pos.x + ball.width > brick.pos.x && ball.pos.y < brick.pos.y + brick.height && ball.pos.y + ball.height > brick.pos.y) {
            return true;
        }
        return false;
    };
    // Check ball collision with bricks
    Collision.prototype.isCollidingBricks = function (ball, bricks) {
        var _this = this;
        var colliding = false;
        bricks.forEach(function (brick, i) {
            if (_this.isCollidingBrick(ball, brick)) {
                ball.changeYDirection();
                if (brick.energy === 1) {
                    bricks.splice(i, 1);
                } else {
                    brick.energy -= 1;
                }
                colliding = true;
            }
        });
        return colliding;
    };
    Collision.prototype.checkBallCollision = function (ball, paddle, view) {
        // 1. Check ball collision with paddle
        if (ball.pos.x + ball.width > paddle.pos.x && ball.pos.x < paddle.pos.x + paddle.width && ball.pos.y + ball.height === paddle.pos.y) {
            ball.changeYDirection();
        }
        // 2. Check ball collision with walls
        // Ball movement X constraints
        if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
            ball.changeXDirection();
        }
        // Ball movement Y constraints
        if (ball.pos.y < 0) {
            ball.changeYDirection();
        }
    };
    return Collision;
}();
exports.Collision = Collision;
},{}],12:[function(require,module,exports) {
module.exports = "/paddle.5f674d8e.png";
},{}],13:[function(require,module,exports) {
module.exports = "/ball.b1fd78ae.png";
},{}],35:[function(require,module,exports) {
module.exports = "/brick-red.f4e163db.png";
},{}],36:[function(require,module,exports) {
module.exports = "/brick-blue.eb4ac6bd.png";
},{}],37:[function(require,module,exports) {
module.exports = "/brick-green.2ac639d4.png";
},{}],38:[function(require,module,exports) {
module.exports = "/brick-yellow.3b5d3fd5.png";
},{}],39:[function(require,module,exports) {
module.exports = "/brick-purple.b6d34336.png";
},{}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LEVEL = exports.BRICK_ENERGY = exports.BRICK_IMAGES = exports.BALL_STARTY = exports.BALL_STARTX = exports.BALL_SIZE = exports.BALL_SPEED = exports.PADDLE_SPEED = exports.PADDLE_STARTX = exports.PADDLE_HEIGHT = exports.PADDLE_WIDTH = exports.BRICK_HEIGHT = exports.BRICK_WIDTH = exports.BRICK_PADDING = exports.STAGE_COLS = exports.STAGE_ROWS = exports.STAGE_PADDING = undefined;

var _brickRed = require('./images/brick-red.png');

var _brickRed2 = _interopRequireDefault(_brickRed);

var _brickBlue = require('./images/brick-blue.png');

var _brickBlue2 = _interopRequireDefault(_brickBlue);

var _brickGreen = require('./images/brick-green.png');

var _brickGreen2 = _interopRequireDefault(_brickGreen);

var _brickYellow = require('./images/brick-yellow.png');

var _brickYellow2 = _interopRequireDefault(_brickYellow);

var _brickPurple = require('./images/brick-purple.png');

var _brickPurple2 = _interopRequireDefault(_brickPurple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Grab the canvas element for calculating the brick width
// depending on canvas width
var canvas = document.querySelector('#playField');
// Constants
var STAGE_PADDING = exports.STAGE_PADDING = 10;
var STAGE_ROWS = exports.STAGE_ROWS = 20;
var STAGE_COLS = exports.STAGE_COLS = 10;
var BRICK_PADDING = exports.BRICK_PADDING = 5;
var BRICK_WIDTH = exports.BRICK_WIDTH = canvas ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING : 100;
var BRICK_HEIGHT = exports.BRICK_HEIGHT = canvas ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING : 30;
var PADDLE_WIDTH = exports.PADDLE_WIDTH = 150;
var PADDLE_HEIGHT = exports.PADDLE_HEIGHT = 25;
var PADDLE_STARTX = exports.PADDLE_STARTX = 450;
var PADDLE_SPEED = exports.PADDLE_SPEED = 10;
var BALL_SPEED = exports.BALL_SPEED = 5;
var BALL_SIZE = exports.BALL_SIZE = 20;
var BALL_STARTX = exports.BALL_STARTX = 500;
var BALL_STARTY = exports.BALL_STARTY = 400;
var BRICK_IMAGES = exports.BRICK_IMAGES = {
    1: _brickRed2.default,
    2: _brickGreen2.default,
    3: _brickYellow2.default,
    4: _brickBlue2.default,
    5: _brickPurple2.default
};
var BRICK_ENERGY = exports.BRICK_ENERGY = {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3 // Purple brick
};
// prettier-ignore
var LEVEL = exports.LEVEL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 0, 0, 5, 5, 0, 0];
},{"./images/brick-red.png":35,"./images/brick-blue.png":36,"./images/brick-green.png":37,"./images/brick-yellow.png":38,"./images/brick-purple.png":39}],40:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Brick = /** @class */function () {
    function Brick(brickWidth, brickHeight, position, brickEnergy, image) {
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        this.position = position;
        this.brickEnergy = brickEnergy;
        this.brickImage = new Image();
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        this.position = position;
        this.brickEnergy = brickEnergy;
        this.brickImage.src = image;
    }
    Object.defineProperty(Brick.prototype, "width", {
        // Getters
        get: function get() {
            return this.brickWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brick.prototype, "height", {
        get: function get() {
            return this.brickHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brick.prototype, "pos", {
        get: function get() {
            return this.position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brick.prototype, "image", {
        get: function get() {
            return this.brickImage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brick.prototype, "energy", {
        get: function get() {
            return this.brickEnergy;
        },
        // Setter
        set: function set(energy) {
            this.brickEnergy = energy;
        },
        enumerable: false,
        configurable: true
    });
    return Brick;
}();
exports.Brick = Brick;
},{}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createBricks = createBricks;

var _Brick = require('./sprites/Brick');

var _setup = require('./setup');

var __spreadArray = undefined && undefined.__spreadArray || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
        to[j] = from[i];
    }return to;
};
function createBricks() {
    return _setup.LEVEL.reduce(function (ack, element, i) {
        var row = Math.floor((i + 1) / _setup.STAGE_COLS);
        var col = i % _setup.STAGE_COLS;
        var x = _setup.STAGE_PADDING + col * (_setup.BRICK_WIDTH + _setup.BRICK_PADDING);
        var y = _setup.STAGE_PADDING + row * (_setup.BRICK_HEIGHT + _setup.BRICK_PADDING);
        if (element === 0) return ack;
        return __spreadArray(__spreadArray([], ack), [new _Brick.Brick(_setup.BRICK_WIDTH, _setup.BRICK_HEIGHT, { x: x, y: y }, _setup.BRICK_ENERGY[element], _setup.BRICK_IMAGES[element])]);
    }, []);
}
},{"./sprites/Brick":40,"./setup":14}],5:[function(require,module,exports) {
'use strict';

var _CanvasView = require('./view/CanvasView');

var _Ball = require('./sprites/Ball');

var _Paddle = require('./sprites/Paddle');

var _Collision = require('./Collision');

var _paddle = require('./images/paddle.png');

var _paddle2 = _interopRequireDefault(_paddle);

var _ball = require('./images/ball.png');

var _ball2 = _interopRequireDefault(_ball);

var _setup = require('./setup');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Level and colors

// Images
var gameOver = false;
// Helpers

var score = 0;
function setGameOver(view) {
    view.drawInfo('Game Over!');
    gameOver = false;
}
function setGameWin(view) {
    view.drawInfo('Game Won!');
    gameOver = false;
}
function gameLoop(view, bricks, paddle, ball, collision) {
    // console.log('draw');
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(ball);
    // Move Ball
    ball.moveBall();
    // Move paddle and check so it won't exit the playfield
    if (paddle.isMovingLeft && paddle.pos.x > 0 || paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width) {
        paddle.movePaddle();
    }
    collision.checkBallCollision(ball, paddle, view);
    var collidingBrick = collision.isCollidingBricks(ball, bricks);
    if (collidingBrick) {
        score += 1;
        view.drawScore(score);
    }
    // Game Over when ball leave playfield
    if (ball.pos.y > view.canvas.height) gameOver = true;
    // If game won, set gameOver and display win
    if (bricks.length === 0) return setGameWin(view);
    // Return if gameover and don't run the requestAnimationFrame
    if (gameOver) return setGameOver(view);
    requestAnimationFrame(function () {
        return gameLoop(view, bricks, paddle, ball, collision);
    });
}
function startGame(view) {
    // Reset displays
    score = 0;
    view.drawInfo('');
    view.drawScore(0);
    // Create a collision instance
    var collision = new _Collision.Collision();
    // Create all bricks
    var bricks = (0, _helpers.createBricks)();
    // Create a Ball
    var ball = new _Ball.Ball(_setup.BALL_SPEED, _setup.BALL_SIZE, { x: _setup.BALL_STARTX, y: _setup.BALL_STARTY }, _ball2.default);
    // Create a paddle
    var paddle = new _Paddle.Paddle(_setup.PADDLE_SPEED, _setup.PADDLE_WIDTH, _setup.PADDLE_HEIGHT, {
        x: _setup.PADDLE_STARTX,
        y: view.canvas.height - _setup.PADDLE_HEIGHT - 5
    }, _paddle2.default);
    gameLoop(view, bricks, paddle, ball, collision);
}
// Create a new view
var view = new _CanvasView.CanvasView('#playField');
view.initStartButton(startGame);
},{"./view/CanvasView":16,"./sprites/Ball":17,"./sprites/Paddle":18,"./Collision":11,"./images/paddle.png":12,"./images/ball.png":13,"./setup":14,"./helpers":15}],53:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '35669' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[53,5], null)
//# sourceMappingURL=/src.d9e64c53.map