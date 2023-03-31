// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"engine/game.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var Game =
/** @class */
function () {
  function Game(width, height, context, keyListener, entityManager, collisionManager, positionManager, gameLoop) {
    var _this = this;

    this.width = width;
    this.height = height;
    this.context = context;
    this.keyListener = keyListener;
    this.entityManager = entityManager;
    this.collisionManager = collisionManager;
    this.positionManager = positionManager;
    this.gameLoop = gameLoop;
    this._scale = 3;
    this.showCollisionBoxes = false;
    this.activateDebugMode = debounce(200, function () {
      return _this.keyListener.isKeyDown('F1');
    }, function () {
      return _this.showCollisionBoxes = !_this.showCollisionBoxes;
    });
  }

  Game.prototype.run = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.setup()];

          case 1:
            _a.sent();

            this.gameLoop.run(function (dt) {
              return _this.update(dt, _this.keyListener, _this.collisionManager, _this.entityManager, _this.positionManager);
            }, function () {
              return _this.render(_this.context);
            });
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Game.prototype.setup = function () {
    return __awaiter(this, void 0, Promise, function () {
      var promises;
      return __generator(this, function (_a) {
        promises = [this.keyListener.setup()];
        Promise.all(promises);
        return [2
        /*return*/
        ];
      });
    });
  };

  ;

  Game.prototype.addEntity = function (entity) {
    this.entityManager.addEntity(entity);
  };

  Game.prototype.update = function (dt, kl, cl, em, pm) {
    for (var _i = 0, _a = this.entityManager.getEntities(); _i < _a.length; _i++) {
      var entity = _a[_i];
      entity.update(dt, kl, cl, em, pm);
    }

    this.activateDebugMode(dt);
  };

  Game.prototype.render = function (context) {
    for (var _i = 0, _a = this.positionManager.getPositionables().slice(0).sort(function (a, b) {
      return a.z - b.z;
    }); _i < _a.length; _i++) {
      var entity = _a[_i];
      entity.render(context);
    }

    if (this.showCollisionBoxes) {
      this.collisionManager.render(context);
    }
  };

  return Game;
}();

exports.Game = Game;

function debounce(debounceKeyInputMs, condition, action) {
  var currentDebounceMs = 0;
  var debounce = false;
  return function (dt) {
    currentDebounceMs += dt * 1000;

    if (currentDebounceMs >= debounceKeyInputMs) {
      debounce = false;
      currentDebounceMs = 0;
    }

    if (condition() && !debounce) {
      action();
      debounce = true;
      currentDebounceMs = 0;
    }
  };
}
},{}],"engine/image-utils.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadImageFromUrl = void 0;

function loadImageFromUrl(url) {
  return __awaiter(this, void 0, Promise, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , new Promise(function (resolve) {
        var img = new Image();
        img.src = url;

        img.onload = function () {
          resolve(img);
        };
      })];
    });
  });
}

exports.loadImageFromUrl = loadImageFromUrl;
},{}],"constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TILES = void 0;
exports.TILES = {
  'floor': {
    x: 328,
    y: 461,
    width: 16,
    height: 16
  },
  'unbreakable-brick': {
    x: 294,
    y: 461,
    width: 16,
    height: 16
  },
  'brick': {
    x: 311,
    y: 461,
    width: 16,
    height: 16
  },
  's-bomb': {
    x: 379,
    y: 563,
    width: 16,
    height: 16
  },
  'm-bomb': {
    x: 396,
    y: 563,
    width: 16,
    height: 16
  },
  'l-bomb': {
    x: 413,
    y: 563,
    width: 16,
    height: 16
  },
  'explosion-center-1': {
    x: 345,
    y: 512,
    width: 16,
    height: 16
  },
  'explosion-center-2': {
    x: 362,
    y: 512,
    width: 16,
    height: 16
  },
  'explosion-center-3': {
    x: 379,
    y: 512,
    width: 16,
    height: 16
  },
  'explosion-center-4': {
    x: 396,
    y: 512,
    width: 16,
    height: 16
  },
  'explosion-center-5': {
    x: 345,
    y: 529,
    width: 16,
    height: 16
  },
  'explosion-horizontal-1': {
    x: 277,
    y: 512,
    width: 16,
    height: 16
  },
  'explosion-horizontal-2': {
    x: 277,
    y: 529,
    width: 16,
    height: 16
  },
  'explosion-horizontal-3': {
    x: 277,
    y: 546,
    width: 16,
    height: 16
  },
  'explosion-horizontal-4': {
    x: 311,
    y: 512,
    width: 16,
    height: 16
  },
  'explosion-horizontal-5': {
    x: 311,
    y: 529,
    width: 16,
    height: 16
  },
  'explosion-vertical-1': {
    x: 362,
    y: 529,
    width: 16,
    height: 16
  },
  'explosion-vertical-2': {
    x: 379,
    y: 529,
    width: 16,
    height: 16
  },
  'explosion-vertical-3': {
    x: 396,
    y: 546,
    width: 16,
    height: 16
  },
  'explosion-vertical-4': {
    x: 311,
    y: 546,
    width: 16,
    height: 16
  },
  'explosion-vertical-5': {
    x: 328,
    y: 546,
    width: 16,
    height: 16
  },
  'explosion-left-1': {
    x: 345,
    y: 478,
    width: 16,
    height: 16
  },
  'explosion-left-2': {
    x: 328,
    y: 478,
    width: 16,
    height: 16
  },
  'explosion-left-3': {
    x: 311,
    y: 478,
    width: 16,
    height: 16
  },
  'explosion-left-4': {
    x: 294,
    y: 478,
    width: 16,
    height: 16
  },
  'explosion-left-5': {
    x: 277,
    y: 478,
    width: 16,
    height: 16
  },
  'explosion-right-1': {
    x: 294,
    y: 512,
    width: 16,
    height: 16
  },
  'explosion-right-2': {
    x: 294,
    y: 529,
    width: 16,
    height: 16
  },
  'explosion-right-3': {
    x: 294,
    y: 546,
    width: 16,
    height: 16
  },
  'explosion-right-4': {
    x: 328,
    y: 512,
    width: 16,
    height: 16
  },
  'explosion-right-5': {
    x: 328,
    y: 529,
    width: 16,
    height: 16
  }
};
},{}],"engine/draw-utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawSprite = void 0;

function drawSprite(context, image, scale, spr, x, y) {
  context.drawImage(image, spr.x, spr.y, spr.width, spr.height, x, y, spr.width * scale, spr.height * scale);
}

exports.drawSprite = drawSprite;
},{}],"solid-tile.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SolidTile = void 0;

var constants_1 = require("./constants");

var draw_utils_1 = require("./engine/draw-utils");

var SolidTile =
/** @class */
function () {
  function SolidTile(image, _tilekey, scale, _x, _y) {
    this.image = image;
    this._tilekey = _tilekey;
    this.scale = scale;
    this._x = _x;
    this._y = _y;
    this.collisionBox = {
      height: 16 * this.scale,
      width: 16 * this.scale,
      xPos: this._x,
      yPos: this._y
    };
  }

  Object.defineProperty(SolidTile.prototype, "x", {
    get: function get() {
      return this._x;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SolidTile.prototype, "y", {
    get: function get() {
      return this._y;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SolidTile.prototype, "z", {
    get: function get() {
      return 1;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SolidTile.prototype, "tilekey", {
    get: function get() {
      return this._tilekey;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SolidTile.prototype, "solid", {
    get: function get() {
      return true;
    },
    enumerable: false,
    configurable: true
  });

  SolidTile.prototype.getCollisionBox = function () {
    return this.collisionBox;
  };

  SolidTile.prototype.update = function (_dt, _kl) {};

  SolidTile.prototype.render = function (context) {
    (0, draw_utils_1.drawSprite)(context, this.image, this.scale, constants_1.TILES[this._tilekey], this._x, this._y);
  };

  return SolidTile;
}();

exports.SolidTile = SolidTile;
},{"./constants":"constants.ts","./engine/draw-utils":"engine/draw-utils.ts"}],"game-map.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameMap = void 0;

var solid_tile_1 = require("./solid-tile");

var constants_1 = require("./constants");

var draw_utils_1 = require("./engine/draw-utils");

var GameMap =
/** @class */
function () {
  function GameMap(sprite, scale, screenWidth, screenHeight) {
    this.sprite = sprite;
    this.scale = scale;
    this._floorTile = constants_1.TILES['floor'];
    this.hasBeenInitialized = false;
    this._tileCountX = Math.ceil(screenWidth / (this._floorTile.width * this.scale));
    this._tileCountY = Math.ceil(screenHeight / (this._floorTile.height * this.scale));
    this._map = GameMap.generateMap(this._tileCountY, this._tileCountX);
  }

  Object.defineProperty(GameMap.prototype, "x", {
    get: function get() {
      return 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GameMap.prototype, "y", {
    get: function get() {
      return 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GameMap.prototype, "z", {
    get: function get() {
      return 0;
    },
    enumerable: false,
    configurable: true
  });

  GameMap.prototype.update = function (_dt, _kl, _ch, em, _pm) {
    if (!this.hasBeenInitialized) {
      for (var y = 0; y < this._tileCountY; y++) {
        for (var x = 0; x < this._tileCountX; x++) {
          if (this._map[y][x] === 'brick') {
            em.addEntity(new solid_tile_1.SolidTile(this.sprite, 'brick', this.scale, x * this.scale * 16, y * this.scale * 16));
          }

          if (this._map[y][x] === 'unbreakable-brick') {
            em.addEntity(new solid_tile_1.SolidTile(this.sprite, 'unbreakable-brick', this.scale, x * this.scale * 16, y * this.scale * 16));
          }
        }
      }

      this.hasBeenInitialized = true;
    }
  };

  GameMap.prototype.render = function (context) {
    this.drawFloor(context, this.sprite);
  };

  GameMap.prototype.drawFloor = function (context, image) {
    for (var y = 0; y < this._tileCountY; y++) {
      for (var x = 0; x < this._tileCountX; x++) {
        (0, draw_utils_1.drawSprite)(context, image, this.scale, constants_1.TILES['floor'], x * this._floorTile.width * this.scale, y * this._floorTile.height * this.scale);
      }
    }
  };

  GameMap.generateEmptyMap = function (rows, columns) {
    var map = new Array(rows);

    for (var i = 0; i < map.length; i++) {
      map[i] = new Array(columns);
    }

    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < columns; x++) {
        map[y][x] = 'floor';
      }
    }

    return map;
  };

  GameMap.generateMapWithUnbreakableWalls = function (rows, columns) {
    var emptyMap = GameMap.generateEmptyMap(rows, columns);

    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < columns; x++) {
        if (x === 0 || y === 0 || y === rows - 1 || x === columns - 1) {
          emptyMap[y][x] = 'unbreakable-brick';
        }

        if (x % 2 === 0 && y % 2 === 0) {
          emptyMap[y][x] = 'unbreakable-brick';
        }
      }
    }

    return emptyMap;
  };

  GameMap.generateMap = function (rows, columns) {
    var mapWithWalls = GameMap.generateMapWithUnbreakableWalls(rows, columns);
    var omittedTiles = [// Top Left
    [1, 1], [2, 1], [1, 2], // Top Right
    [columns - 2, 1], [columns - 3, 1], [columns - 2, 2], // Bottom Left
    [1, rows - 2], [2, rows - 2], [1, rows - 3], // Bottom Right
    [columns - 2, rows - 2], [columns - 3, rows - 2], [columns - 2, rows - 3]];

    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < columns; x++) {
        var putBreakableWall = Math.random() > 0.2;

        if (mapWithWalls[y][x] !== 'floor') {
          continue;
        }

        if (putBreakableWall) {
          mapWithWalls[y][x] = 'brick';
        }
      }
    }

    for (var _i = 0, omittedTiles_1 = omittedTiles; _i < omittedTiles_1.length; _i++) {
      var _a = omittedTiles_1[_i],
          x = _a[0],
          y = _a[1];
      mapWithWalls[y][x] = 'floor';
    }

    return mapWithWalls;
  };

  return GameMap;
}();

exports.GameMap = GameMap;
},{"./solid-tile":"solid-tile.ts","./constants":"constants.ts","./engine/draw-utils":"engine/draw-utils.ts"}],"explosion.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Explosion = void 0;

var constants_1 = require("./constants");

var draw_utils_1 = require("./engine/draw-utils");

var Explosion =
/** @class */
function () {
  function Explosion(image, scale, _x, _y, animDirection) {
    this.image = image;
    this.scale = scale;
    this._x = _x;
    this._y = _y;
    this.animDirection = animDirection;
    this._frames = {
      center: ['explosion-center-1', 'explosion-center-2', 'explosion-center-3', 'explosion-center-4', 'explosion-center-5'],
      horizontal: ['explosion-horizontal-1', 'explosion-horizontal-2', 'explosion-horizontal-3', 'explosion-horizontal-4', 'explosion-horizontal-5'],
      vertical: ['explosion-vertical-1', 'explosion-vertical-2', 'explosion-vertical-3', 'explosion-vertical-4', 'explosion-vertical-5'],
      left: ['explosion-left-1', 'explosion-left-2', 'explosion-left-3', 'explosion-left-4', 'explosion-left-5'],
      right: ['explosion-right-1', 'explosion-right-2', 'explosion-right-3', 'explosion-right-4', 'explosion-right-5'],
      top: [],
      bottom: []
    };
    this.msInCurrentFrame = 0;
    this.msPerFrame = 50;
    this._frameIndex = 0;
    this.currentMs = 0;
    this.keepAliveForMs = 250;
  }

  Object.defineProperty(Explosion.prototype, "solid", {
    get: function get() {
      return false;
    },
    enumerable: false,
    configurable: true
  });

  Explosion.prototype.getCollisionBox = function () {
    return {
      height: 8 * this.scale,
      width: 8 * this.scale,
      xPos: this.x + 4 * this.scale,
      yPos: this.y + 4 * this.scale
    };
  };

  Object.defineProperty(Explosion.prototype, "x", {
    get: function get() {
      return this._x;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Explosion.prototype, "y", {
    get: function get() {
      return this._y;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Explosion.prototype, "z", {
    get: function get() {
      return 5;
    },
    enumerable: false,
    configurable: true
  });

  Explosion.prototype.update = function (dt, kl, ch, em, pm) {
    this.currentMs += dt * 1000;
    this.msInCurrentFrame += dt * 1000;

    if (this.msInCurrentFrame >= this.msPerFrame) {
      this.msInCurrentFrame -= this.msPerFrame;
      this._frameIndex = (this._frameIndex + 1) % this._frames[this.animDirection].length;
    }

    if (this.currentMs >= this.keepAliveForMs) {
      em.removeEntity(this);
    }
  };

  Explosion.prototype.render = function (context) {
    (0, draw_utils_1.drawSprite)(context, this.image, this.scale, constants_1.TILES[this._frames[this.animDirection][this._frameIndex]], this.x, this.y);
  };

  return Explosion;
}();

exports.Explosion = Explosion;
},{"./constants":"constants.ts","./engine/draw-utils":"engine/draw-utils.ts"}],"bomb.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bomb = void 0;

var solid_tile_1 = require("./solid-tile");

var constants_1 = require("./constants");

var draw_utils_1 = require("./engine/draw-utils");

var explosion_1 = require("./explosion");

var player_1 = require("./player");

var Bomb =
/** @class */
function () {
  function Bomb(image, scale, _x, _y, range) {
    this.image = image;
    this.scale = scale;
    this._x = _x;
    this._y = _y;
    this.range = range;
    this._frames = ['s-bomb', 'm-bomb', 'l-bomb'];
    this._currentFrame = 0;
    this._solid = false;
    this._exploded = false;
    this.msInCurrentFrame = 0;
    this.msPerFrame = 300;
    this.currentExplosionTimeInMs = 0;
    this.explosionTimeInMs = this.msPerFrame * this._frames.length * 2;
    this._incrementing = true;
  }

  Object.defineProperty(Bomb.prototype, "solid", {
    get: function get() {
      return this._solid;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bomb.prototype, "exploded", {
    get: function get() {
      return this._exploded;
    },
    enumerable: false,
    configurable: true
  });

  Bomb.prototype.getCollisionBox = function () {
    var width = 16 * this.scale;
    var height = 16 * this.scale;
    return {
      xPos: this.x + width / 4,
      yPos: this.y + height / 4,
      width: width / 2,
      height: height / 2
    };
  };

  Bomb.prototype.update = function (dt, _kl, ch, em, _pm) {
    this.notSolidUntilPlayerMovesOutside(ch);
    this.msInCurrentFrame += dt * 1000;
    this.currentExplosionTimeInMs += dt * 1000;

    if (this.currentExplosionTimeInMs >= this.explosionTimeInMs) {
      em.removeEntity(this);
      this._exploded = true;
      var startingX = Math.floor(this.x);
      var startingY = Math.floor(this.y);
      this.explosionLogic(ch, em, startingX, startingY, 1, 0);
      this.explosionLogic(ch, em, startingX, startingY, -1, 0);
      this.explosionLogic(ch, em, startingX, startingY, 0, 1);
      this.explosionLogic(ch, em, startingX, startingY, 0, -1);
    }

    if (this.msInCurrentFrame >= this.msPerFrame) {
      this.msInCurrentFrame -= this.msPerFrame;

      if (this._currentFrame === this._frames.length - 1) {
        this._incrementing = false;
      }

      if (this._currentFrame === 0) {
        this._incrementing = true;
      }

      if (this._incrementing) {
        this._currentFrame += 1;
      } else {
        this._currentFrame -= 1;
      }
    }
  };

  Bomb.getCellsToPutExplosions = function (ch, startingX, startingY, tilesize, scale, rangeMax, iterationsMax, directionX, directionY) {
    var result = [];
    var width = tilesize * scale;
    var height = tilesize * scale;
    var box = {
      xPos: startingX + width / 4,
      yPos: startingY + height / 4,
      width: width / 2,
      height: height / 2
    };
    var collisions = ch.findCollisions(box);
    var iterationCount = 0;
    var isCollisionWithUnbreakable = collisions.some(function (x) {
      return x.with instanceof solid_tile_1.SolidTile && x.with.tilekey === 'unbreakable-brick';
    });
    var brickFound = false;

    while (!isCollisionWithUnbreakable && iterationCount <= iterationsMax && iterationCount <= rangeMax && !brickFound) {
      var element = [startingX, startingY, []];

      for (var _i = 0, collisions_1 = collisions; _i < collisions_1.length; _i++) {
        var collidable = collisions_1[_i].with;

        if (collidable instanceof solid_tile_1.SolidTile && collidable.tilekey === 'brick') {
          element[2].push(collidable);
          brickFound = true;
        }

        if (collidable instanceof player_1.Player) {
          element[2].push(collidable);
        }
      }

      startingX += tilesize * scale * directionX;
      startingY += tilesize * scale * directionY;
      box = {
        xPos: startingX + width / 4,
        yPos: startingY + height / 4,
        width: width / 2,
        height: height / 2
      };
      collisions = ch.findCollisions(box);
      isCollisionWithUnbreakable = collisions.some(function (x) {
        return x.with instanceof solid_tile_1.SolidTile && x.with.tilekey === 'unbreakable-brick';
      });
      brickFound = collisions.some(function (x) {
        return x.with instanceof solid_tile_1.SolidTile && x.with.tilekey === 'brick';
      });
      iterationCount++;
      result.push(element);
    }

    return result;
  };

  Bomb.prototype.explosionLogic = function (ch, em, startingX, startingY, directionX, directionY) {
    var maxIteration = 10;
    var iterationCount = 0;
    var currentAnimDirection = 'center';
    var explosion = new explosion_1.Explosion(this.image, this.scale, startingX, startingY, currentAnimDirection);
    var collisions = ch.findCollisions(explosion);
    var isCollisionWithUnbreakable = collisions.some(function (x) {
      return x.with instanceof solid_tile_1.SolidTile && x.with.tilekey === 'unbreakable-brick';
    });
    var brickFound = false;

    while (!isCollisionWithUnbreakable && iterationCount <= maxIteration && iterationCount <= this.range && !brickFound) {
      em.addEntity(explosion);

      for (var _i = 0, collisions_2 = collisions; _i < collisions_2.length; _i++) {
        var collidable = collisions_2[_i].with;

        if (collidable instanceof solid_tile_1.SolidTile && collidable.tilekey === 'brick') {
          em.removeEntity(collidable);
          brickFound = true;
        }

        if (collidable instanceof player_1.Player) {
          em.removeEntity(collidable);
        }
      }

      startingX += 16 * this.scale * directionX;
      startingY += 16 * this.scale * directionY;
      explosion = new explosion_1.Explosion(this.image, this.scale, startingX, startingY, currentAnimDirection);
      collisions = ch.findCollisions(explosion);
      isCollisionWithUnbreakable = collisions.some(function (x) {
        return x.with instanceof solid_tile_1.SolidTile && x.with.tilekey === 'unbreakable-brick';
      });
      var temp = brickFound;
      brickFound = collisions.some(function (x) {
        return x.with instanceof solid_tile_1.SolidTile && x.with.tilekey === 'brick';
      });
      iterationCount++;

      if (isCollisionWithUnbreakable || iterationCount >= maxIteration || iterationCount >= this.range || brickFound) {
        if (directionX === 1) {
          currentAnimDirection = 'right';
        }

        if (directionX === -1) {
          currentAnimDirection = 'left';
        }
      } else {
        if (directionX !== 0 && directionY === 0) {
          currentAnimDirection = 'horizontal';
        }

        if (directionY !== 0 && directionX === 0) {
          currentAnimDirection = 'vertical';
        }
      }

      brickFound = temp;
      explosion = new explosion_1.Explosion(this.image, this.scale, startingX, startingY, currentAnimDirection);
    }
  };

  Bomb.prototype.notSolidUntilPlayerMovesOutside = function (ch) {
    if (this.solid) {
      return;
    }

    var collisionWithPlayer = ch.findCollisions(this).some(function (x) {
      return x.with instanceof player_1.Player;
    });

    if (!collisionWithPlayer) {
      this._solid = true;
    }
  };

  Bomb.prototype.render = function (context) {
    (0, draw_utils_1.drawSprite)(context, this.image, this.scale, constants_1.TILES[this._frames[this._currentFrame]], this._x, this._y);
  };

  Object.defineProperty(Bomb.prototype, "x", {
    get: function get() {
      return this._x;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bomb.prototype, "y", {
    get: function get() {
      return this._y;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Bomb.prototype, "z", {
    get: function get() {
      return 1;
    },
    enumerable: false,
    configurable: true
  });
  return Bomb;
}();

exports.Bomb = Bomb;
},{"./solid-tile":"solid-tile.ts","./constants":"constants.ts","./engine/draw-utils":"engine/draw-utils.ts","./explosion":"explosion.ts","./player":"player.ts"}],"engine/game-animation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameAnimation = void 0;

var GameAnimation =
/** @class */
function () {
  function GameAnimation(spritesheet, frameIndexes, msPerFrame) {
    this.spritesheet = spritesheet;
    this.frameIndexes = frameIndexes;
    this.msPerFrame = msPerFrame;
    this.currentFrameIndex = 0;
    this.msInCurrentFrame = 0;
    this.currentXIndex = 0;
    this.currentYIndex = 0;
  }

  GameAnimation.prototype.update = function (delta) {
    this.msInCurrentFrame += delta * 1000;

    if (this.msInCurrentFrame >= this.msPerFrame) {
      this.msInCurrentFrame -= this.msPerFrame;
      this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frameIndexes.length;
    }

    var _a = this.frameIndexes[this.currentFrameIndex],
        xIndex = _a[0],
        yIndex = _a[1];
    this.currentXIndex = xIndex;
    this.currentYIndex = yIndex;
  };

  GameAnimation.prototype.render = function (context, x, y, width, height) {
    this.spritesheet.render(context, this.currentXIndex, this.currentYIndex, x, y, width, height);
  };

  return GameAnimation;
}();

exports.GameAnimation = GameAnimation;
},{}],"engine/spritesheet.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spritesheet = void 0;

var Spritesheet =
/** @class */
function () {
  function Spritesheet(image, spriteWidth, spriteHeight) {
    this.image = image;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
  }

  Spritesheet.prototype.render = function (context, xIndex, yIndex, x, y, width, height) {
    context.drawImage(this.image, xIndex * this.spriteWidth, yIndex * this.spriteHeight, this.spriteWidth, this.spriteHeight, x, y, width, height);
  };

  return Spritesheet;
}();

exports.Spritesheet = Spritesheet;
},{}],"player.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var bomb_1 = require("./bomb");

var game_animation_1 = require("./engine/game-animation");

var spritesheet_1 = require("./engine/spritesheet");

var Direction;

(function (Direction) {
  Direction[Direction["Up"] = 0] = "Up";
  Direction[Direction["Right"] = 1] = "Right";
  Direction[Direction["Down"] = 2] = "Down";
  Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));

var Player =
/** @class */
function () {
  function Player(_x, _y, playerSpritesheet, bombSpritesheet, scale, controlMapping) {
    this._x = _x;
    this._y = _y;
    this.bombSpritesheet = bombSpritesheet;
    this.scale = scale;
    this.controlMapping = controlMapping;
    this.maxAmountOfBombs = 1;
    this.placedBombs = [];
    this.bombRange = 2;
    this.velX = 0;
    this.velY = 0;
    this.width = 32;
    this.height = 32;
    this.speed = 200;
    this.spritesheet = new spritesheet_1.Spritesheet(playerSpritesheet, 32, 32);
    this.playerAnimations = {
      'idle-up': new game_animation_1.GameAnimation(this.spritesheet, [[0, 0]], 200),
      'idle-right': new game_animation_1.GameAnimation(this.spritesheet, [[0, 1]], 200),
      'idle-down': new game_animation_1.GameAnimation(this.spritesheet, [[0, 2]], 200),
      'idle-left': new game_animation_1.GameAnimation(this.spritesheet, [[0, 3]], 200),
      'walking-up': new game_animation_1.GameAnimation(this.spritesheet, [[0, 0], [1, 0], [2, 0]], 200),
      'walking-right': new game_animation_1.GameAnimation(this.spritesheet, [[0, 1], [1, 1], [2, 1]], 200),
      'walking-down': new game_animation_1.GameAnimation(this.spritesheet, [[0, 2], [1, 2], [2, 2]], 200),
      'walking-left': new game_animation_1.GameAnimation(this.spritesheet, [[0, 3], [1, 3], [2, 3]], 200)
    };
    this.currentAnimation = this.playerAnimations['walking-down'];
    this.currentDirection = Direction.Down;
  }

  Object.defineProperty(Player.prototype, "solid", {
    get: function get() {
      return true;
    },
    enumerable: false,
    configurable: true
  });

  Player.prototype.getCollisionBox = function () {
    return {
      xPos: this._x + 15,
      yPos: this._y + 47,
      width: this.width,
      height: this.height - 10
    };
  };

  Object.defineProperty(Player.prototype, "x", {
    get: function get() {
      return this._x;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Player.prototype, "y", {
    get: function get() {
      return this._y;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Player.prototype, "z", {
    get: function get() {
      return 10;
    },
    enumerable: false,
    configurable: true
  });

  Player.prototype.update = function (dt, kl, ch, em, pm) {
    this.velX = 0;
    this.velY = 0;
    this.placedBombs = this.placedBombs.filter(function (x) {
      return !x.exploded;
    });

    if (kl.isAnyKeyDown(this.controlMapping.left)) {
      this.velX = -this.speed * dt;
    }

    if (kl.isAnyKeyDown(this.controlMapping.right)) {
      this.velX = this.speed * dt;
    }

    if (kl.isAnyKeyDown(this.controlMapping.up)) {
      this.velY = -this.speed * dt;
    }

    if (kl.isAnyKeyDown(this.controlMapping.down)) {
      this.velY = this.speed * dt;
    }

    if (kl.isAnyKeyDown(this.controlMapping.bomb) && this.placedBombs.length < this.maxAmountOfBombs) {
      var collisionBox = this.getCollisionBox();
      var gridX = Math.floor((collisionBox.xPos + collisionBox.width / 2) / (16 * this.scale)) * 16 * this.scale;
      var gridY = Math.floor(collisionBox.yPos / (16 * this.scale)) * 16 * this.scale;

      if (!pm.getPositionablesAt(gridX, gridY).some(function (x) {
        return x instanceof bomb_1.Bomb;
      })) {
        var bomb = new bomb_1.Bomb(this.bombSpritesheet, this.scale, gridX, gridY, this.bombRange);
        em.addEntity(bomb);
        this.placedBombs.push(bomb);
      }
    }

    if (this.velX !== 0 && this.velY !== 0) {
      var lkp_1 = kl.lastKeyPressed;

      if (this.controlMapping.left.some(function (x) {
        return x === lkp_1;
      }) || this.controlMapping.right.some(function (x) {
        return x === lkp_1;
      })) {
        this.velY = 0;
      }

      if (this.controlMapping.up.some(function (x) {
        return x === lkp_1;
      }) || this.controlMapping.down.some(function (x) {
        return x === lkp_1;
      })) {
        this.velX = 0;
      }
    }

    var _a = Player.calculateCollision(ch, this, this.velX, this.velY),
        newVelX = _a[0],
        newVelY = _a[1];

    this.velX = newVelX;
    this.velY = newVelY;
    this._x += this.velX;
    this._y += this.velY;
    this.currentDirection = Player.getDirection(this.currentDirection, this.velX, this.velY);
    this.currentAnimation = Player.getCurrentAnimation(this.playerAnimations, this.currentDirection, this.velX, this.velY);
    this.currentAnimation.update(dt);
  };

  Player.prototype.render = function (context) {
    this.currentAnimation.render(context, this._x, this._y, 32 * this.scale, 32 * this.scale);
  };

  Player.calculateCollision = function (ch, driver, velX, velY) {
    var collisionsX = ch.testMovement(driver, velX, 0);
    var _a = [velX, velY],
        newVelX = _a[0],
        newVelY = _a[1];

    if (collisionsX.length > 0) {
      newVelX = 0;
    }

    var collisionsY = ch.testMovement(driver, 0, velY);

    if (collisionsY.length > 0) {
      newVelY = 0;
    }

    return [newVelX, newVelY];
  };

  Player.getDirection = function (currentDirection, velX, velY) {
    if (velX > 0) {
      return Direction.Right;
    } else if (velX < 0) {
      return Direction.Left;
    }

    if (velY > 0) {
      return Direction.Down;
    } else if (velY < 0) {
      return Direction.Up;
    }

    return currentDirection;
  };

  Player.getCurrentAnimation = function (playerAnimations, currentDirection, velX, velY) {
    if (velX > 0) {
      return playerAnimations['walking-right'];
    } else if (velX < 0) {
      return playerAnimations['walking-left'];
    }

    if (velY > 0) {
      return playerAnimations['walking-down'];
    } else if (velY < 0) {
      return playerAnimations['walking-up'];
    }

    switch (currentDirection) {
      case Direction.Right:
        return playerAnimations['idle-right'];

      case Direction.Left:
        return playerAnimations['idle-left'];

      case Direction.Down:
        return playerAnimations['idle-down'];

      case Direction.Up:
        return playerAnimations['idle-up'];
    }

    ;
  };

  return Player;
}();

exports.Player = Player;
},{"./bomb":"bomb.ts","./engine/game-animation":"engine/game-animation.ts","./engine/spritesheet":"engine/spritesheet.ts"}],"player-controls.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTROLS = void 0;
exports.CONTROLS = [{
  'up': ['w', 'W'],
  'down': ['s', 'S'],
  'left': ['a', 'A'],
  'right': ['d', 'D'],
  'bomb': ['c', 'C']
}, {
  'up': ['ArrowUp'],
  'down': ['ArrowDown'],
  'left': ['ArrowLeft'],
  'right': ['ArrowRight'],
  'bomb': ['Enter']
}];
},{}],"bomberman-game.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BombermanGame = void 0;

var game_1 = require("./engine/game");

var image_utils_1 = require("./engine/image-utils");

var game_map_1 = require("./game-map");

var player_1 = require("./player");

var player_controls_1 = require("./player-controls");

var BombermanGame =
/** @class */
function (_super) {
  __extends(BombermanGame, _super);

  function BombermanGame(context, width, height, keyListener, entityManager, collisionHandler, positionManager, gameLoop) {
    var _this = _super.call(this, width, height, context, keyListener, entityManager, collisionHandler, positionManager, gameLoop) || this;

    _this.tilesize = 16;
    return _this;
  }

  BombermanGame.prototype.setup = function () {
    return __awaiter(this, void 0, Promise, function () {
      var tileset, map, player, _a, _b, player2, _c, _d;

      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _super.prototype.setup.call(this);

            return [4
            /*yield*/
            , (0, image_utils_1.loadImageFromUrl)('sprites/bomberman-tileset.png')];

          case 1:
            tileset = _e.sent();
            map = new game_map_1.GameMap(tileset, this._scale, this.width, this.height);
            _a = player_1.Player.bind;
            _b = [void 0, this.tilesize * this._scale, this.tilesize * this._scale * .5];
            return [4
            /*yield*/
            , (0, image_utils_1.loadImageFromUrl)('sprites/bomberman-atlas.png')];

          case 2:
            player = new (_a.apply(player_1.Player, _b.concat([_e.sent(), tileset, this._scale, player_controls_1.CONTROLS[0]])))();
            _c = player_1.Player.bind;
            _d = [void 0, this.tilesize * this._scale * (this.width / (this.tilesize * this._scale) - 2), this.tilesize * this._scale * .5];
            return [4
            /*yield*/
            , (0, image_utils_1.loadImageFromUrl)('sprites/bomberman-atlas.png')];

          case 3:
            player2 = new (_c.apply(player_1.Player, _d.concat([_e.sent(), tileset, this._scale, player_controls_1.CONTROLS[1]])))();
            this.addEntity(map);
            this.addEntity(player);
            this.addEntity(player2);
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  return BombermanGame;
}(game_1.Game);

exports.BombermanGame = BombermanGame;
},{"./engine/game":"engine/game.ts","./engine/image-utils":"engine/image-utils.ts","./game-map":"game-map.ts","./player":"player.ts","./player-controls":"player-controls.ts"}],"engine/collision-manager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollisionManager = void 0;

var CollisionManager =
/** @class */
function () {
  function CollisionManager() {
    this.collidables = [];
  }

  CollisionManager.prototype.addCollidable = function (collidable) {
    this.collidables.push(collidable);
  };

  CollisionManager.prototype.removeCollidable = function (collidable) {
    var index = this.collidables.findIndex(function (x) {
      return x === collidable;
    });
    this.collidables.splice(index, 1);
  };

  CollisionManager.prototype.testMovement = function (driverCollidable, velX, velY) {
    return this.findCollisions(driverCollidable, velX, velY).filter(function (x) {
      return x.with.solid;
    });
  };

  CollisionManager.prototype.findCollisions = function (driverCollidable, xOffset, yOffset) {
    if (xOffset === void 0) {
      xOffset = 0;
    }

    if (yOffset === void 0) {
      yOffset = 0;
    }

    var result = [];

    for (var _i = 0, _a = this.collidables; _i < _a.length; _i++) {
      var collidable = _a[_i];
      var collision = this.findCollision(driverCollidable, collidable, xOffset, yOffset);

      if (collision) {
        result.push(collision);
      }
    }

    return result;
  };

  CollisionManager.prototype.findCollision = function (driverCollidableOrBox, otherCollidable, xOffset, yOffset) {
    if (xOffset === void 0) {
      xOffset = 0;
    }

    if (yOffset === void 0) {
      yOffset = 0;
    }

    var driverCollisionBox;

    if (this.isCollidable(driverCollidableOrBox)) {
      if (driverCollidableOrBox === otherCollidable) {
        return null;
      } else {
        driverCollisionBox = driverCollidableOrBox.getCollisionBox();
      }
    } else {
      driverCollisionBox = driverCollidableOrBox;
    }

    driverCollisionBox.xPos += xOffset;
    driverCollisionBox.yPos += yOffset;
    var collidableCollisionBox = otherCollidable.getCollisionBox();
    var rightCollision = driverCollisionBox.xPos <= collidableCollisionBox.xPos && driverCollisionBox.xPos + driverCollisionBox.width >= collidableCollisionBox.xPos;
    var leftCollision = collidableCollisionBox.xPos <= driverCollisionBox.xPos && collidableCollisionBox.xPos + collidableCollisionBox.width >= driverCollisionBox.xPos;
    var topCollision = driverCollisionBox.yPos <= collidableCollisionBox.yPos && driverCollisionBox.yPos + driverCollisionBox.height >= collidableCollisionBox.yPos;
    var bottomCollision = collidableCollisionBox.yPos <= driverCollisionBox.yPos && collidableCollisionBox.yPos + collidableCollisionBox.height >= driverCollisionBox.yPos;

    if ((rightCollision || leftCollision) && (topCollision || bottomCollision)) {
      return {
        with: otherCollidable,
        bottom: bottomCollision,
        left: leftCollision,
        right: rightCollision,
        top: topCollision
      };
    }

    return null;
  };

  CollisionManager.prototype.render = function (context) {
    for (var _i = 0, _a = this.collidables; _i < _a.length; _i++) {
      var collidable = _a[_i];
      var box = collidable.getCollisionBox();
      context.strokeStyle = 'blue';
      context.lineWidth = 3;
      context.strokeRect(box.xPos, box.yPos, box.width, box.height);
    }
  };

  CollisionManager.prototype.isCollidable = function (entity) {
    return entity.getCollisionBox !== undefined;
  };

  return CollisionManager;
}();

exports.CollisionManager = CollisionManager;
},{}],"engine/entity-manager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityManager = void 0;

var EntityManager =
/** @class */
function () {
  function EntityManager(collisionManager, positionManager) {
    this.collisionManager = collisionManager;
    this.positionManager = positionManager;
    this.entities = [];
  }

  EntityManager.prototype.addEntity = function (entity) {
    this.entities.push(entity);

    if (this.collisionManager.isCollidable(entity)) {
      this.collisionManager.addCollidable(entity);
    }

    if (this.positionManager.isPositionable(entity)) {
      this.positionManager.addPositionable(entity);
    }
  };

  EntityManager.prototype.removeEntity = function (entity) {
    var index = this.entities.findIndex(function (x) {
      return x === entity;
    });
    this.entities.splice(index, 1);

    if (this.collisionManager.isCollidable(entity)) {
      this.collisionManager.removeCollidable(entity);
    }

    if (this.positionManager.isPositionable(entity)) {
      this.positionManager.removePositionable(entity);
    }
  };

  EntityManager.prototype.getEntities = function () {
    return this.entities;
  };

  return EntityManager;
}();

exports.EntityManager = EntityManager;
},{}],"engine/time-utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimestampMs = void 0;

function getTimestampMs() {
  return new Date().getTime();
}

exports.getTimestampMs = getTimestampMs;
},{}],"engine/game-loop.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowDomGameLoop = void 0;

var time_utils_1 = require("./time-utils");

var WindowDomGameLoop =
/** @class */
function () {
  function WindowDomGameLoop() {
    this._sumDeltas = 0;
    this._frames = 0;
    this._lastTime = 0;
  }

  WindowDomGameLoop.prototype.run = function (updateFunction, renderFunction) {
    var _this = this;

    this._lastTime = (0, time_utils_1.getTimestampMs)();
    this.updateFunction = updateFunction;
    this.renderFunction = renderFunction;
    window.requestAnimationFrame(function () {
      _this.loop();
    });
  };

  WindowDomGameLoop.prototype.loop = function () {
    var _this = this;

    if (!this.updateFunction || !this.renderFunction) {
      throw Error('Game loop was not initialized');
    }

    var currentTime = (0, time_utils_1.getTimestampMs)();
    var dt = (currentTime - this._lastTime) / 1000;
    this._lastTime = currentTime;
    this._sumDeltas += dt;
    this._frames += 1;

    if (this._sumDeltas >= 1) {
      this._sumDeltas = 0;
      this._frames = 0;
    }

    this.updateFunction(dt);
    this.renderFunction();
    window.requestAnimationFrame(function () {
      return _this.loop();
    });
  };

  return WindowDomGameLoop;
}();

exports.WindowDomGameLoop = WindowDomGameLoop;
},{"./time-utils":"engine/time-utils.ts"}],"engine/key-listener.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyListener = void 0;

var KeyListener =
/** @class */
function () {
  function KeyListener(canvasEl) {
    this.canvasEl = canvasEl;
    this._keyStates = {};
  }

  KeyListener.prototype.setup = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        this.canvasEl.addEventListener('keydown', function (e) {
          e.preventDefault();
          _this._keyStates[e.key] = true;
          _this._lastKeyPressed = e.key;
        });
        this.canvasEl.addEventListener('keyup', function (e) {
          e.preventDefault();
          _this._keyStates[e.key] = false;
        });
        return [2
        /*return*/
        ];
      });
    });
  };

  KeyListener.prototype.isKeyDown = function (key) {
    return this._keyStates[key] === true;
  };

  KeyListener.prototype.isAnyKeyDown = function (keys) {
    var _this = this;

    return keys.some(function (key) {
      return _this.isKeyDown(key);
    });
  };

  Object.defineProperty(KeyListener.prototype, "lastKeyPressed", {
    get: function get() {
      return this._lastKeyPressed;
    },
    enumerable: false,
    configurable: true
  });
  return KeyListener;
}();

exports.KeyListener = KeyListener;
},{}],"engine/position-manager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PositionManager = void 0;

var PositionManager =
/** @class */
function () {
  function PositionManager() {
    this.positionables = [];
  }

  PositionManager.prototype.addPositionable = function (positionable) {
    this.positionables.push(positionable);
  };

  PositionManager.prototype.removePositionable = function (positionable) {
    var index = this.positionables.findIndex(function (x) {
      return x === positionable;
    });
    this.positionables.splice(index, 1);
  };

  PositionManager.prototype.getPositionables = function () {
    return this.positionables;
  };

  PositionManager.prototype.getPositionablesAt = function (x, y) {
    return this.positionables.filter(function (p) {
      return p.x === x && p.y === y;
    });
  };

  PositionManager.prototype.getPositionablesBetween = function (x0, y0, x1, y1) {
    return this.positionables.filter(function (p) {
      return p.x >= x0 && p.y >= y0 && p.x <= x1 && p.y <= y1;
    });
  };

  PositionManager.prototype.isPositionable = function (entity) {
    var positionable = entity;
    return positionable.x !== undefined && positionable.y !== undefined;
  };

  return PositionManager;
}();

exports.PositionManager = PositionManager;
},{}],"bootstrap.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var bomberman_game_1 = require("./bomberman-game");

var collision_manager_1 = require("./engine/collision-manager");

var entity_manager_1 = require("./engine/entity-manager");

var game_loop_1 = require("./engine/game-loop");

var key_listener_1 = require("./engine/key-listener");

var position_manager_1 = require("./engine/position-manager");

function bootstrap() {
  return __awaiter(this, void 0, void 0, function () {
    var canvasEl, context, collisionManager, positionManager, game;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          canvasEl = document.getElementById('game-canvas');

          if (!canvasEl) {
            console.error('Couldn\'t find the canvas element');
            return [2
            /*return*/
            ];
          }

          context = canvasEl.getContext('2d');

          if (!context) {
            console.error('Couldn\'t get the context');
            return [2
            /*return*/
            ];
          }

          canvasEl.focus();
          context.imageSmoothingEnabled = false;
          collisionManager = new collision_manager_1.CollisionManager();
          positionManager = new position_manager_1.PositionManager();
          game = new bomberman_game_1.BombermanGame(context, canvasEl.width, canvasEl.height, new key_listener_1.KeyListener(canvasEl), new entity_manager_1.EntityManager(collisionManager, positionManager), collisionManager, positionManager, new game_loop_1.WindowDomGameLoop());
          return [4
          /*yield*/
          , game.run()];

        case 1:
          _a.sent();

          return [2
          /*return*/
          ];
      }
    });
  });
}

bootstrap();
},{"./bomberman-game":"bomberman-game.ts","./engine/collision-manager":"engine/collision-manager.ts","./engine/entity-manager":"engine/entity-manager.ts","./engine/game-loop":"engine/game-loop.ts","./engine/key-listener":"engine/key-listener.ts","./engine/position-manager":"engine/position-manager.ts"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "3094" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
        parents.push(k);
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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bootstrap.ts"], null)
//# sourceMappingURL=/bootstrap.e2109142.js.map