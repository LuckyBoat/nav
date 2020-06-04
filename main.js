parcelRequire = (function (modules, cache, entry, globalName) {
  var previousRequire = typeof parcelRequire === "function" && parcelRequire;
  var nodeRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        var currentRequire =
          typeof parcelRequire === "function" && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        if (previousRequire) {
          return previousRequire(name, true);
        }

        if (nodeRequire && typeof name === "string") {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = "MODULE_NOT_FOUND";
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      });
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  parcelRequire = newRequire;

  if (error) {
    throw error;
  }

  return newRequire;
})(
  {
    epB2: [
      function (require, module, exports) {
        var $siteList = $(".siteList");
        var $lastLi = $siteList.find("li.last");
        var x = localStorage.getItem("x");
        var xObject = JSON.parse(x);
        var hashMap = xObject || [
          {
            logo: "A",
            url: "https://www.acfun.cn",
          },
          {
            logo: "B",
            url: "https://www.bilibili.com",
          },
        ];

        var simplifyUrl = function simplifyUrl(url) {
          return url
            .replace("https://", "")
            .replace("http://", "")
            .replace("www.", "")
            .replace(/\/.*/, ""); // 删除 / 开头的内容
        };

        var render = function render() {
          $siteList.find("li:not(.last)").remove();
          hashMap.forEach(function (node, index) {
            var $li = $(
              '<li>\n      <div class="site">\n        <div class="logo">'
                .concat(node.logo, '</div>\n        <div class="link">')
                .concat(
                  simplifyUrl(node.url),
                  '</div>\n        <div class="close">\n          <svg class="icon">\n            <use xlink:href="#icon-close"></use>\n          </svg>\n        </div>\n      </div>\n    </li>'
                )
            ).insertBefore($lastLi);
            $li.on("click", function () {
              window.open(node.url);
            });
            $li.on("click", ".close", function (e) {
              e.stopPropagation(); // 阻止冒泡

              hashMap.splice(index, 1);
              render();
            });
          });
        };

        render();
        $(".addButton").on("click", function () {
          var url = window.prompt("请问你要添加的网址是啥？");

          if (url.indexOf("http") !== 0) {
            url = "https://" + url;
          }

          console.log(url);
          hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url,
          });
          render();
        });

        window.onbeforeunload = function () {
          var string = JSON.stringify(hashMap);
          localStorage.setItem("x", string);
        };

        $(document).on("keypress", function (e) {
          var key = e.key;

          for (var i = 0; i < hashMap.length; i++) {
            if (hashMap[i].logo.toLowerCase() === key) {
              window.open(hashMap[i].url);
            }
          }
        });
      },
      {},
    ],
  },
  {},
  ["epB2"],
  null
);
