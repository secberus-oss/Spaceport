"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.join");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

require("regenerator-runtime/runtime");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _inquirer = _interopRequireDefault(require("inquirer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var runScript = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var appDir, detectSpaceport, configFile, spaceportConfig, parsedConfig;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            appDir = _path["default"].resolve(process.cwd());
            detectSpaceport = _fs["default"].readdirSync(process.cwd());
            configFile = detectSpaceport.find(function (file) {
              return file.match('spaceport') !== null;
            });
            configFile = false;

            if (configFile) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return _inquirer["default"].prompt({
              name: 'Config_Location',
              type: 'input',
              message: 'Unable to detect spaceport configuration file.\nPlease input the path to the configuration, or press enter to continue'
            }).then(function (val) {
              console.log(val);

              if (val.Config_Location === '' || typeof val.Config_Location === 'undefined') {
                return null;
              }

              return val.Config_Location;
            })["catch"](function (err) {
              console.log(err);
              process.stderr.write('Unable to locate file from input path. Path should start at root of project.');
              return false;
            });

          case 7:
            configFile = _context.sent;

            if (typeof configFile === 'boolean' || configFile === null) {
              process.exit(0);
            }

          case 9:
            spaceportConfig = false;

            if (configFile !== undefined) {
              spaceportConfig = configFile.match(/(\.js\b)/) ? require(_path["default"].resolve(appDir, configFile)) : _fs["default"].readFileSync(_path["default"].join(appDir, configFile));
            }

            if (!spaceportConfig) {
              process.exit(0);
            }

            if (spaceportConfig instanceof Buffer) {
              try {
                spaceportConfig = JSON.parse(spaceportConfig.toString('utf8'));
              } catch (err) {
                console.error(err);
                process.exit();
              }
            } // Exit if invalid type


            if (typeof spaceportConfig === 'boolean' || spaceportConfig === null || spaceportConfig instanceof Buffer) {
              process.stdout.write('Spaceport config error');
              process.stdout.write(JSON.stringify(spaceportConfig));
              process.exit(1);
            }

            parsedConfig = spaceportConfig;

            if ('inputPath' in parsedConfig) {
              console.log('Input path selected');
            }

            if ('outputPath' in parsedConfig) {
              console.log('Output path selected');
            } else {
              console.log('No output path, defaulting to /p');
            }

            if ('retainParentFolderStructure' in parsedConfig) {
              console.log('Retaining parent folder structure');
            }

            if ('modules' in parsedConfig) {
              console.log('Retaining output ');
            }

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function runScript() {
    return _ref.apply(this, arguments);
  };
}();

runScript();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3JrZXJzL2luZGV4LnRzIl0sIm5hbWVzIjpbInJ1blNjcmlwdCIsImFwcERpciIsInBhdGgiLCJyZXNvbHZlIiwicHJvY2VzcyIsImN3ZCIsImRldGVjdFNwYWNlcG9ydCIsImZzIiwicmVhZGRpclN5bmMiLCJjb25maWdGaWxlIiwiZmluZCIsImZpbGUiLCJtYXRjaCIsImlucXVpcmVyIiwicHJvbXB0IiwibmFtZSIsInR5cGUiLCJtZXNzYWdlIiwidGhlbiIsInZhbCIsImNvbnNvbGUiLCJsb2ciLCJDb25maWdfTG9jYXRpb24iLCJlcnIiLCJzdGRlcnIiLCJ3cml0ZSIsImV4aXQiLCJzcGFjZXBvcnRDb25maWciLCJ1bmRlZmluZWQiLCJyZXF1aXJlIiwicmVhZEZpbGVTeW5jIiwiam9pbiIsIkJ1ZmZlciIsIkpTT04iLCJwYXJzZSIsInRvU3RyaW5nIiwiZXJyb3IiLCJzdGRvdXQiLCJzdHJpbmdpZnkiLCJwYXJzZWRDb25maWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUztBQUFBLHFFQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNWQyxZQUFBQSxNQURVLEdBQ0RDLGlCQUFLQyxPQUFMLENBQWFDLE9BQU8sQ0FBQ0MsR0FBUixFQUFiLENBREM7QUFFVkMsWUFBQUEsZUFGVSxHQUVRQyxlQUFHQyxXQUFILENBQWVKLE9BQU8sQ0FBQ0MsR0FBUixFQUFmLENBRlI7QUFHWkksWUFBQUEsVUFIWSxHQUcrQkgsZUFBZSxDQUFDSSxJQUFoQixDQUFxQixVQUFBQyxJQUFJLEVBQUk7QUFDMUUscUJBQU9BLElBQUksQ0FBQ0MsS0FBTCxDQUFXLFdBQVgsTUFBNEIsSUFBbkM7QUFDRCxhQUY4QyxDQUgvQjtBQU9oQkgsWUFBQUEsVUFBVSxHQUFHLEtBQWI7O0FBUGdCLGdCQVNYQSxVQVRXO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBVUtJLHFCQUNoQkMsTUFEZ0IsQ0FDVDtBQUNOQyxjQUFBQSxJQUFJLEVBQUUsaUJBREE7QUFFTkMsY0FBQUEsSUFBSSxFQUFFLE9BRkE7QUFHTkMsY0FBQUEsT0FBTyxFQUNMO0FBSkksYUFEUyxFQU9oQkMsSUFQZ0IsQ0FPWCxVQUFBQyxHQUFHLEVBQUk7QUFDWEMsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlGLEdBQVo7O0FBQ0Esa0JBQ0VBLEdBQUcsQ0FBQ0csZUFBSixLQUF3QixFQUF4QixJQUNBLE9BQU9ILEdBQUcsQ0FBQ0csZUFBWCxLQUErQixXQUZqQyxFQUdFO0FBQ0EsdUJBQU8sSUFBUDtBQUNEOztBQUNELHFCQUFPSCxHQUFHLENBQUNHLGVBQVg7QUFDRCxhQWhCZ0IsV0FpQlYsVUFBQUMsR0FBRyxFQUFJO0FBQ1pILGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRSxHQUFaO0FBQ0FuQixjQUFBQSxPQUFPLENBQUNvQixNQUFSLENBQWVDLEtBQWYsQ0FDRSw4RUFERjtBQUdBLHFCQUFPLEtBQVA7QUFDRCxhQXZCZ0IsQ0FWTDs7QUFBQTtBQVVkaEIsWUFBQUEsVUFWYzs7QUFrQ2QsZ0JBQUksT0FBT0EsVUFBUCxLQUFzQixTQUF0QixJQUFtQ0EsVUFBVSxLQUFLLElBQXRELEVBQTREO0FBQzFETCxjQUFBQSxPQUFPLENBQUNzQixJQUFSLENBQWEsQ0FBYjtBQUNEOztBQXBDYTtBQXVDWkMsWUFBQUEsZUF2Q1ksR0F1QzBDLEtBdkMxQzs7QUF5Q2hCLGdCQUFJbEIsVUFBVSxLQUFLbUIsU0FBbkIsRUFBOEI7QUFDNUJELGNBQUFBLGVBQWUsR0FBR2xCLFVBQVUsQ0FBQ0csS0FBWCxDQUFpQixVQUFqQixJQUNkaUIsT0FBTyxDQUFDM0IsaUJBQUtDLE9BQUwsQ0FBYUYsTUFBYixFQUFxQlEsVUFBckIsQ0FBRCxDQURPLEdBRWRGLGVBQUd1QixZQUFILENBQWdCNUIsaUJBQUs2QixJQUFMLENBQVU5QixNQUFWLEVBQWtCUSxVQUFsQixDQUFoQixDQUZKO0FBR0Q7O0FBRUQsZ0JBQUksQ0FBQ2tCLGVBQUwsRUFBc0I7QUFDcEJ2QixjQUFBQSxPQUFPLENBQUNzQixJQUFSLENBQWEsQ0FBYjtBQUNEOztBQUVELGdCQUFJQyxlQUFlLFlBQVlLLE1BQS9CLEVBQXVDO0FBQ3JDLGtCQUFJO0FBQ0ZMLGdCQUFBQSxlQUFlLEdBQUdNLElBQUksQ0FBQ0MsS0FBTCxDQUFXUCxlQUFlLENBQUNRLFFBQWhCLENBQXlCLE1BQXpCLENBQVgsQ0FBbEI7QUFDRCxlQUZELENBRUUsT0FBT1osR0FBUCxFQUFZO0FBQ1pILGdCQUFBQSxPQUFPLENBQUNnQixLQUFSLENBQWNiLEdBQWQ7QUFDQW5CLGdCQUFBQSxPQUFPLENBQUNzQixJQUFSO0FBQ0Q7QUFDRixhQTFEZSxDQTJEaEI7OztBQUNBLGdCQUNFLE9BQU9DLGVBQVAsS0FBMkIsU0FBM0IsSUFDQUEsZUFBZSxLQUFLLElBRHBCLElBRUFBLGVBQWUsWUFBWUssTUFIN0IsRUFJRTtBQUNBNUIsY0FBQUEsT0FBTyxDQUFDaUMsTUFBUixDQUFlWixLQUFmLENBQXFCLHdCQUFyQjtBQUNBckIsY0FBQUEsT0FBTyxDQUFDaUMsTUFBUixDQUFlWixLQUFmLENBQXFCUSxJQUFJLENBQUNLLFNBQUwsQ0FBZVgsZUFBZixDQUFyQjtBQUNBdkIsY0FBQUEsT0FBTyxDQUFDc0IsSUFBUixDQUFhLENBQWI7QUFDRDs7QUFFS2EsWUFBQUEsWUF0RVUsR0FzRWVaLGVBdEVmOztBQXdFaEIsZ0JBQUksZUFBZVksWUFBbkIsRUFBaUM7QUFDL0JuQixjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBWjtBQUNEOztBQUVELGdCQUFJLGdCQUFnQmtCLFlBQXBCLEVBQWtDO0FBQ2hDbkIsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVo7QUFDRCxhQUZELE1BRU87QUFDTEQsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0NBQVo7QUFDRDs7QUFFRCxnQkFBSSxpQ0FBaUNrQixZQUFyQyxFQUFtRDtBQUNqRG5CLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1DQUFaO0FBQ0Q7O0FBRUQsZ0JBQUksYUFBYWtCLFlBQWpCLEVBQStCO0FBQzdCbkIsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUJBQVo7QUFDRDs7QUF4RmU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBVHJCLFNBQVM7QUFBQTtBQUFBO0FBQUEsR0FBZjs7QUEyRkFBLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgaW5xdWlyZXIgZnJvbSAnaW5xdWlyZXInO1xuaW1wb3J0IHsgcmNDb25maWcgfSBmcm9tICcuLi90eXBlcy9TcGFjZXBvcnRUeXBlcyc7XG5jb25zdCBydW5TY3JpcHQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGFwcERpciA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpKTtcbiAgY29uc3QgZGV0ZWN0U3BhY2Vwb3J0ID0gZnMucmVhZGRpclN5bmMocHJvY2Vzcy5jd2QoKSk7XG4gIGxldCBjb25maWdGaWxlOiBzdHJpbmcgfCBib29sZWFuIHwgdW5kZWZpbmVkID0gZGV0ZWN0U3BhY2Vwb3J0LmZpbmQoZmlsZSA9PiB7XG4gICAgcmV0dXJuIGZpbGUubWF0Y2goJ3NwYWNlcG9ydCcpICE9PSBudWxsO1xuICB9KTtcblxuICBjb25maWdGaWxlID0gZmFsc2U7XG5cbiAgaWYgKCFjb25maWdGaWxlKSB7XG4gICAgY29uZmlnRmlsZSA9IGF3YWl0IGlucXVpcmVyXG4gICAgICAucHJvbXB0KHtcbiAgICAgICAgbmFtZTogJ0NvbmZpZ19Mb2NhdGlvbicsXG4gICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgJ1VuYWJsZSB0byBkZXRlY3Qgc3BhY2Vwb3J0IGNvbmZpZ3VyYXRpb24gZmlsZS5cXG5QbGVhc2UgaW5wdXQgdGhlIHBhdGggdG8gdGhlIGNvbmZpZ3VyYXRpb24sIG9yIHByZXNzIGVudGVyIHRvIGNvbnRpbnVlJyxcbiAgICAgIH0pXG4gICAgICAudGhlbih2YWwgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyh2YWwpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdmFsLkNvbmZpZ19Mb2NhdGlvbiA9PT0gJycgfHxcbiAgICAgICAgICB0eXBlb2YgdmFsLkNvbmZpZ19Mb2NhdGlvbiA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbC5Db25maWdfTG9jYXRpb247XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKFxuICAgICAgICAgICdVbmFibGUgdG8gbG9jYXRlIGZpbGUgZnJvbSBpbnB1dCBwYXRoLiBQYXRoIHNob3VsZCBzdGFydCBhdCByb290IG9mIHByb2plY3QuJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbmZpZ0ZpbGUgPT09ICdib29sZWFuJyB8fCBjb25maWdGaWxlID09PSBudWxsKSB7XG4gICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfVxuICB9XG5cbiAgbGV0IHNwYWNlcG9ydENvbmZpZzogcmNDb25maWcgfCBCdWZmZXIgfCBib29sZWFuIHwgbnVsbCA9IGZhbHNlO1xuXG4gIGlmIChjb25maWdGaWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBzcGFjZXBvcnRDb25maWcgPSBjb25maWdGaWxlLm1hdGNoKC8oXFwuanNcXGIpLylcbiAgICAgID8gcmVxdWlyZShwYXRoLnJlc29sdmUoYXBwRGlyLCBjb25maWdGaWxlKSlcbiAgICAgIDogZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihhcHBEaXIsIGNvbmZpZ0ZpbGUpKTtcbiAgfVxuXG4gIGlmICghc3BhY2Vwb3J0Q29uZmlnKSB7XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG5cbiAgaWYgKHNwYWNlcG9ydENvbmZpZyBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuICAgIHRyeSB7XG4gICAgICBzcGFjZXBvcnRDb25maWcgPSBKU09OLnBhcnNlKHNwYWNlcG9ydENvbmZpZy50b1N0cmluZygndXRmOCcpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgpO1xuICAgIH1cbiAgfVxuICAvLyBFeGl0IGlmIGludmFsaWQgdHlwZVxuICBpZiAoXG4gICAgdHlwZW9mIHNwYWNlcG9ydENvbmZpZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgc3BhY2Vwb3J0Q29uZmlnID09PSBudWxsIHx8XG4gICAgc3BhY2Vwb3J0Q29uZmlnIGluc3RhbmNlb2YgQnVmZmVyXG4gICkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdTcGFjZXBvcnQgY29uZmlnIGVycm9yJyk7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoSlNPTi5zdHJpbmdpZnkoc3BhY2Vwb3J0Q29uZmlnKSk7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkQ29uZmlnOiByY0NvbmZpZyA9IHNwYWNlcG9ydENvbmZpZztcblxuICBpZiAoJ2lucHV0UGF0aCcgaW4gcGFyc2VkQ29uZmlnKSB7XG4gICAgY29uc29sZS5sb2coJ0lucHV0IHBhdGggc2VsZWN0ZWQnKTtcbiAgfVxuXG4gIGlmICgnb3V0cHV0UGF0aCcgaW4gcGFyc2VkQ29uZmlnKSB7XG4gICAgY29uc29sZS5sb2coJ091dHB1dCBwYXRoIHNlbGVjdGVkJyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ05vIG91dHB1dCBwYXRoLCBkZWZhdWx0aW5nIHRvIC9wJyk7XG4gIH1cblxuICBpZiAoJ3JldGFpblBhcmVudEZvbGRlclN0cnVjdHVyZScgaW4gcGFyc2VkQ29uZmlnKSB7XG4gICAgY29uc29sZS5sb2coJ1JldGFpbmluZyBwYXJlbnQgZm9sZGVyIHN0cnVjdHVyZScpO1xuICB9XG5cbiAgaWYgKCdtb2R1bGVzJyBpbiBwYXJzZWRDb25maWcpIHtcbiAgICBjb25zb2xlLmxvZygnUmV0YWluaW5nIG91dHB1dCAnKTtcbiAgfVxufTtcblxucnVuU2NyaXB0KCk7XG4iXX0=