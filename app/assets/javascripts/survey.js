/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "366cc5ef0276103e796e"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (!installedModules[request].parents.includes(moduleId))
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (!me.children.includes(request)) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.includes(parentId)) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (!a.includes(item)) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.includes(cb)) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pager = function () {
    function Pager(id) {
        _classCallCheck(this, Pager);

        this.id = id;
        this.node = document.getElementById(this.id);
        this.pages = document.getElementsByClassName("page");

        this.scroller = document.getElementById("survey-scroller");

        this.prev = this.node.getElementsByClassName("prev")[0];
        this.prev.addEventListener("click", this.prevPage.bind(this));
        this.next = this.node.getElementsByClassName("next")[0];
        this.next.addEventListener("click", this.nextPage.bind(this));

        this.submit = document.getElementById("survey-submitter");

        this.setPage(0);
    }

    _createClass(Pager, [{
        key: "setPage",
        value: function setPage(index) {
            if (this.index != undefined) {
                this.pages[this.index].classList.remove("showing");
            }
            if (this.index == index) return;

            this.index = index;

            this.pages[this.index].classList.add("showing");

            this.prev.style.display = null;
            this.next.style.display = null;
            this.submit.style.display = "none";
            this.prev.innerHTML = "Prev Section";
            this.next.innerHTML = "Next Section";
            if (this.index === 0) {
                this.prev.style.display = "none";
                this.next.innerHTML = "Start the Survey";
            } else if (this.index === this.pages.length - 1) {
                this.next.style.display = "none";
                this.submit.style.display = null;
            }

            // scroll the form back to the top
            this.scroller.scrollTop = 0;
        }
    }, {
        key: "nextPage",
        value: function nextPage() {
            if (this.index === this.pages.length - 1) return;
            this.setPage(this.index + 1);
        }
    }, {
        key: "prevPage",
        value: function prevPage() {
            if (this.index === 0) return;
            this.setPage(this.index - 1);
        }
    }]);

    return Pager;
}();

var Form = function () {
    function Form(id, questions, setPage) {
        _classCallCheck(this, Form);

        this.id = id;
        this.questions = questions;
        this.setPage = setPage;

        this.node = document.getElementById(this.id);
    }

    _createClass(Form, [{
        key: "submit",
        value: function submit() {
            var validities = this.questions.map(function (q) {
                return q.showAdvice();
            });
            var allValid = validities.every(function (x) {
                return x == true;
            });
            if (!allValid) {
                var index = Math.floor(validities.indexOf(true) / 2);
                this.setPage(index);
            }
        }
    }]);

    return Form;
}();

var Question = function () {
    function Question(id, text) {
        _classCallCheck(this, Question);

        this.errorMessage = "";

        this.id = id;
        this.node = document.getElementById(this.id);
        this.node.classList.add("form-group");

        var label = document.createElement("label");
        label.innerHTML = text;
        this.node.appendChild(label);

        this.answerEl = document.createElement("div");
        this.answerEl.className = "answer";
        this.node.appendChild(this.answerEl);

        var adviceEls = this.node.getElementsByClassName("advice");
        this.adviceEl = adviceEls[0];
        if (this.adviceEl == undefined) this.adviceEl = { style: {} };
    }

    _createClass(Question, [{
        key: "showAdvice",
        value: function showAdvice() {
            var isValid = this.isValid;
            if (isValid) {
                this.adviceEl.style.display = null;
                this.adviceEl.innerHTML = this.advice;
            } else {
                this.adviceEl.style.display = "none";
                this.adviceEl.innerHTML = "";
            }
            return isValid;
        }
    }, {
        key: "answer",
        get: function get() {
            console.log("getting answer for raw question....");
            return undefined;
        }
    }, {
        key: "isValid",
        get: function get() {
            return true;
        }
    }]);

    return Question;
}();

var Integer = function (_Question) {
    _inherits(Integer, _Question);

    function Integer(id, text, max, min) {
        _classCallCheck(this, Integer);

        var _this = _possibleConstructorReturn(this, (Integer.__proto__ || Object.getPrototypeOf(Integer)).apply(this, arguments));

        _this.errorMessage = "Make sure you've entered a number between " + _this.min + " and " + _this.max;


        _this.min = min ? min : 1;
        _this.max = max ? max : 100;

        var input = document.createElement("input");
        input.className = "form-control";
        input.type = "number";
        input.max = _this.max;
        input.min = _this.min;
        input.placeholder = "Enter a number from " + _this.min + " to " + _this.max + ".";
        _this.inputEl = input;

        _this.answerEl.appendChild(_this.inputEl);
        return _this;
    }

    _createClass(Integer, [{
        key: "answer",
        get: function get() {
            console.log("getting answer for integer");
            return parseInt(this.inputEl.value);
        }
    }, {
        key: "isValid",
        get: function get() {
            var answer = this.answer;
            return answer < this.max && answer > this.min;
        }
    }]);

    return Integer;
}(Question);

var Checklist = function (_Question2) {
    _inherits(Checklist, _Question2);

    function Checklist(id, text, inputs, radio, unmodifiable) {
        _classCallCheck(this, Checklist);

        var _this2 = _possibleConstructorReturn(this, (Checklist.__proto__ || Object.getPrototypeOf(Checklist)).apply(this, arguments));

        _this2.errorMessage = "Make sure to check at least one box, or add at least one custom value";

        _this2.type = radio ? "radio" : "checkbox";

        // If radio mode is set, use same name for all boxes
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var input = _step.value;

                var name = input[0];
                var text = input[1];
                var c = _this2.createCheckbox(name, text);
                _this2.answerEl.appendChild(c);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        if (unmodifiable !== true) {
            var addButton = document.createElement("div");
            addButton.innerHTML = "Don't see your option? Click to add another.";
            addButton.className = "btn btn-themed btn-sm mt-2 w-100 border-0";
            addButton.addEventListener("click", _this2.newCustomInput.bind(_this2));
            _this2.addButton = addButton;
            _this2.answerEl.appendChild(addButton);
        }
        return _this2;
    }

    _createClass(Checklist, [{
        key: "extractCustomValue",
        value: function extractCustomValue(el) {
            var i = el.getElementsByTagName("input");
            return i.value;
        }
    }, {
        key: "extractCheckboxValue",
        value: function extractCheckboxValue(el) {
            var i = el.getElementsByTagName("input");
            if (i.checked) return el.name;
        }
    }, {
        key: "removeChild",
        value: function removeChild(child) {
            this.answerEl.removeChild(child);
        }
    }, {
        key: "createCheckbox",
        value: function createCheckbox(name, text, checkbox, textNode) {
            var container = document.createElement("div");
            container.className = "checklist-item form-check btn btn-light";

            if (textNode == undefined && checkbox == undefined) {
                checkbox = document.createElement("input");
                if (this.type === "radio") {
                    checkbox.name = this.id;
                    checkbox.value = name;
                } else {
                    checkbox.name = name;
                }
                checkbox.type = this.type;
                checkbox.checked = false;

                container.addEventListener("click", function () {
                    checkbox.checked = !checkbox.checked;
                });

                textNode = document.createTextNode(" " + text);
            }

            container.appendChild(checkbox);
            container.appendChild(textNode);
            return container;
        }
    }, {
        key: "newCustomInput",
        value: function newCustomInput() {
            var remove = document.createElement("div");
            remove.className = "remove btn btn-outline-danger";
            remove.innerHTML = "&times;";
            remove.style.paddingLeft = "1px";

            var input = document.createElement("input");
            input.type = "text";
            input.className = "form-control form-control-sm";
            input.placeholder = "Enter new option here...";

            var container = this.createCheckbox("", "", remove, input);
            container.classList.add("d-flex", "align-items-center");
            remove.addEventListener("click", this.removeChild.bind(this, container));

            this.answerEl.insertBefore(container, this.addButton);

            input.focus();
        }
    }, {
        key: "answer",
        get: function get() {
            var customItems = this.node.getElementsByClassName("checklist-custom");
            customItems = [].concat(_toConsumableArray(customItems));
            var customValues = customItems.map(this.extractCustomValue, this);

            var checkboxItems = this.node.getElementsByClassName("checklist-items");
            checkboxItems = [].concat(_toConsumableArray(checkboxItems));
            var checkboxValues = checkboxItems.map(this.extractCheckboxValue, this);

            var values = customValues.concat(checkboxValues);
            return values.join("\n");
        }
    }, {
        key: "isValid",
        get: function get() {
            return this.answer === "";
        }
    }]);

    return Checklist;
}(Question);

var pager = new Pager("survey-body");

window.form = new Form("survey", [, new Integer("simultaneous-applications", "When searching for a job, roughly how many separate job applications do you tend to manage at any one time?"), new Checklist("how-tracking", "How do you normally keep track of your applications and their documents as you apply to them?", [["docs", "Word Documents / Typed Up Files (.doc, .txt, .etc)"], ["spread", "Spreadsheets (Excel, Gnumeric, etc.)"], ["paper", "Pen and Paper (Notebook, Post-Its, etc.)"]]), new Checklist("extra-documents", "What documents have been requested from you in past applications, aside from CVs?", [["cover", "Cover Letter"], ["reference", "Letter of Reference / Recommendation"], ["philosophy", "Work Philosophy"]]), new Checklist("document-creation-softwares", "What programs or softwares do you use to create documents for applications?", [["word", "Word / Google Docs / Other Office Suite Software"], ["latex", "LaTeX"], ["indesign", "InDesign / GIMP / Other Design and Artwork Software"]]), new Integer("different-cvs", "How many different CVs do you generally maintain at a given time?"), new Checklist("update-frequency", "How often do you update or change your CV's contents or layout?<br/><small class='text-muted text-normal'>(Pick the first that applies.)</small>", [["job", "For every job application"], ["skill", "Every time I acquire a new skill"], [">1pmo", "More than once a month"], [">3pmo", "More than once every 3 months"], [">1pyr", "More than once a year"], ["<1pyr", "Less than once a year"]], true, true)], pager.setPage.bind(pager));

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./main.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./main.js */"./main.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyJdLCJuYW1lcyI6WyJQYWdlciIsImlkIiwibm9kZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwYWdlcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzY3JvbGxlciIsInByZXYiLCJhZGRFdmVudExpc3RlbmVyIiwicHJldlBhZ2UiLCJiaW5kIiwibmV4dCIsIm5leHRQYWdlIiwic3VibWl0Iiwic2V0UGFnZSIsImluZGV4IiwidW5kZWZpbmVkIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5uZXJIVE1MIiwibGVuZ3RoIiwic2Nyb2xsVG9wIiwiRm9ybSIsInF1ZXN0aW9ucyIsInZhbGlkaXRpZXMiLCJtYXAiLCJxIiwic2hvd0FkdmljZSIsImFsbFZhbGlkIiwiZXZlcnkiLCJ4IiwiTWF0aCIsImZsb29yIiwiaW5kZXhPZiIsIlF1ZXN0aW9uIiwidGV4dCIsImVycm9yTWVzc2FnZSIsImxhYmVsIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiYW5zd2VyRWwiLCJjbGFzc05hbWUiLCJhZHZpY2VFbHMiLCJhZHZpY2VFbCIsImlzVmFsaWQiLCJhZHZpY2UiLCJjb25zb2xlIiwibG9nIiwiSW50ZWdlciIsIm1heCIsIm1pbiIsImFyZ3VtZW50cyIsImlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwiaW5wdXRFbCIsInBhcnNlSW50IiwidmFsdWUiLCJhbnN3ZXIiLCJDaGVja2xpc3QiLCJpbnB1dHMiLCJyYWRpbyIsInVubW9kaWZpYWJsZSIsIm5hbWUiLCJjIiwiY3JlYXRlQ2hlY2tib3giLCJhZGRCdXR0b24iLCJuZXdDdXN0b21JbnB1dCIsImVsIiwiaSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2hlY2tlZCIsImNoaWxkIiwicmVtb3ZlQ2hpbGQiLCJjaGVja2JveCIsInRleHROb2RlIiwiY29udGFpbmVyIiwiY3JlYXRlVGV4dE5vZGUiLCJwYWRkaW5nTGVmdCIsImluc2VydEJlZm9yZSIsImZvY3VzIiwiY3VzdG9tSXRlbXMiLCJjdXN0b21WYWx1ZXMiLCJleHRyYWN0Q3VzdG9tVmFsdWUiLCJjaGVja2JveEl0ZW1zIiwiY2hlY2tib3hWYWx1ZXMiLCJleHRyYWN0Q2hlY2tib3hWYWx1ZSIsInZhbHVlcyIsImNvbmNhdCIsImpvaW4iLCJwYWdlciIsIndpbmRvdyIsImZvcm0iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBLHNEQUE4QztBQUM5QztBQUNBO0FBQ0Esb0NBQTRCO0FBQzVCLHFDQUE2QjtBQUM3Qix5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LEVBQ2MsbUZBRGQsRUFFYyxDQUFDLENBQUMsT0FBRCxFQUFVLGNBQVYsQ0FBRCxFQUNDLENBQUMsV0FBRCxFQUFjLHNDQUFkLENBREQsRUFFQyxDQUFDLFlBQUQsRUFBZSxpQkFBZixDQUZELENBRmQsQ0FYNEIsRUFrQjVCLElBQUlBLFNBQUosQ0FBYyw2QkFBZCxFQUNjLDZFQURkLEVBRWMsQ0FBQyxDQUFDLE1BQUQsRUFBUyxrREFBVCxDQUFELEVBQ0MsQ0FBQyxPQUFELEVBQVUsT0FBVixDQURELEVBRUMsQ0FBQyxVQUFELEVBQWEscURBQWIsQ0FGRCxDQUZkLENBbEI0QixFQXlCNUIsSUFBTVgsT0FBTixDQUFjLGVBQWQsRUFDYyxtRUFEZCxDQXpCNEIsRUE0QjVCLElBQUlXLFNBQUosQ0FBYyxrQkFBZCxFQUNjLGtKQURkLEVBRWMsQ0FBQyxDQUFDLEtBQUQsRUFBUSwyQkFBUixDQUFELEVBQ0MsQ0FBQyxPQUFELEVBQVUsa0NBQVYsQ0FERCxFQUVDLENBQUMsT0FBRCxFQUFVLHdCQUFWLENBRkQsRUFHQyxDQUFDLE9BQUQsRUFBVSwrQkFBVixDQUhELEVBSUMsQ0FBQyxPQUFELEVBQVUsdUJBQVYsQ0FKRCxFQUtDLENBQUMsT0FBRCxFQUFVLHVCQUFWLENBTEQsQ0FGZCxFQVNjLElBVGQsRUFTbUIsSUFUbkIsQ0E1QjRCLENBQW5CLEVBc0NQK0IsTUFBTS9FLE9BQU4sQ0FBY0osSUFBZCxDQUFtQm1GLEtBQW5CLENBdENPLENBQWQsQyIsImZpbGUiOiJzdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCIzNjZjYzVlZjAyNzYxMDNlNzk2ZVwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmICghaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluY2x1ZGVzKG1vZHVsZUlkKSlcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoIW1lLmNoaWxkcmVuLmluY2x1ZGVzKHJlcXVlc3QpKSBtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJtYWluXCI7XG4gXHRcdFx0e1xuIFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5jbHVkZXMocGFyZW50SWQpKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoIWEuaW5jbHVkZXMoaXRlbSkpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluY2x1ZGVzKGNiKSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImNsYXNzIFBhZ2VyIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5wYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwYWdlXCIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zY3JvbGxlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VydmV5LXNjcm9sbGVyXCIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5ub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcmV2XCIpWzBdO1xuICAgICAgICB0aGlzLnByZXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucHJldlBhZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubmV4dCA9IHRoaXMubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmV4dFwiKVswXTtcbiAgICAgICAgdGhpcy5uZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm5leHRQYWdlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdXJ2ZXktc3VibWl0dGVyXCIpO1xuXG4gICAgICAgIHRoaXMuc2V0UGFnZSgwKTtcbiAgICB9XG5cbiAgICBzZXRQYWdlIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZXNbdGhpcy5pbmRleF0uY2xhc3NMaXN0LnJlbW92ZShcInNob3dpbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPT0gaW5kZXgpIHJldHVybjtcblxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG5cbiAgICAgICAgdGhpcy5wYWdlc1t0aGlzLmluZGV4XS5jbGFzc0xpc3QuYWRkKFwic2hvd2luZ1wiKTtcblxuICAgICAgICB0aGlzLnByZXYuc3R5bGUuZGlzcGxheSA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdWJtaXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLnByZXYuaW5uZXJIVE1MID0gXCJQcmV2IFNlY3Rpb25cIjtcbiAgICAgICAgdGhpcy5uZXh0LmlubmVySFRNTCA9IFwiTmV4dCBTZWN0aW9uXCI7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgdGhpcy5uZXh0LmlubmVySFRNTCA9IFwiU3RhcnQgdGhlIFN1cnZleVwiO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMucGFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5uZXh0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMuc3VibWl0LnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBzY3JvbGwgdGhlIGZvcm0gYmFjayB0byB0aGUgdG9wXG4gICAgICAgIHRoaXMuc2Nyb2xsZXIuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG5cbiAgICBuZXh0UGFnZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLnBhZ2VzLmxlbmd0aCAtIDEpIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuaW5kZXggKyAxKTtcbiAgICB9XG4gICAgcHJldlBhZ2UgKCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5pbmRleCAtIDEpO1xuICAgIH1cbn1cblxuY2xhc3MgRm9ybSB7XG4gICAgY29uc3RydWN0b3IgKGlkLCBxdWVzdGlvbnMsIHNldFBhZ2UpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnF1ZXN0aW9ucyA9IHF1ZXN0aW9ucztcbiAgICAgICAgdGhpcy5zZXRQYWdlID0gc2V0UGFnZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpO1xuICAgIH1cblxuICAgIHN1Ym1pdCAoKSB7XG4gICAgICAgIHZhciB2YWxpZGl0aWVzID0gdGhpcy5xdWVzdGlvbnMubWFwKHEgPT4gcS5zaG93QWR2aWNlKCkpO1xuICAgICAgICB2YXIgYWxsVmFsaWQgPSB2YWxpZGl0aWVzLmV2ZXJ5KHggPT4geCA9PSB0cnVlKTtcbiAgICAgICAgaWYgKCFhbGxWYWxpZCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcih2YWxpZGl0aWVzLmluZGV4T2YodHJ1ZSkgLyAyKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFnZShpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFF1ZXN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQsIHRleHQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWdyb3VwXCIpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBsYWJlbC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5hbnN3ZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuYW5zd2VyRWwuY2xhc3NOYW1lID0gXCJhbnN3ZXJcIjtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKHRoaXMuYW5zd2VyRWwpO1xuXG4gICAgICAgIHZhciBhZHZpY2VFbHMgPSB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImFkdmljZVwiKTtcbiAgICAgICAgdGhpcy5hZHZpY2VFbCA9IGFkdmljZUVsc1swXTtcbiAgICAgICAgaWYgKHRoaXMuYWR2aWNlRWwgPT0gdW5kZWZpbmVkKSB0aGlzLmFkdmljZUVsID0geyBzdHlsZToge30gfVxuICAgIH1cbiAgICBcbiAgICBnZXQgYW5zd2VyICgpIHsgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBhbnN3ZXIgZm9yIHJhdyBxdWVzdGlvbi4uLi5cIik7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7IFxuICAgIH1cbiAgICBnZXQgaXNWYWxpZCAoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlcnJvck1lc3NhZ2UgPSBcIlwiO1xuXG4gICAgc2hvd0FkdmljZSAoKSB7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gdGhpcy5pc1ZhbGlkO1xuICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy5hZHZpY2VFbC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYWR2aWNlRWwuaW5uZXJIVE1MID0gdGhpcy5hZHZpY2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkdmljZUVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMuYWR2aWNlRWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICB9XG59XG5cbmNsYXNzIEludGVnZXIgZXh0ZW5kcyBRdWVzdGlvbiB7XG4gICAgY29uc3RydWN0b3IgKGlkLCB0ZXh0LCBtYXgsIG1pbikge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuXG4gICAgICAgIHRoaXMubWluID0gbWluID8gbWluIDogMTtcbiAgICAgICAgdGhpcy5tYXggPSBtYXggPyBtYXggOiAxMDA7XG5cbiAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBpbnB1dC5jbGFzc05hbWUgPSBcImZvcm0tY29udHJvbFwiO1xuICAgICAgICBpbnB1dC50eXBlID0gXCJudW1iZXJcIjtcbiAgICAgICAgaW5wdXQubWF4ID0gdGhpcy5tYXg7XG4gICAgICAgIGlucHV0Lm1pbiA9IHRoaXMubWluO1xuICAgICAgICBpbnB1dC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgYSBudW1iZXIgZnJvbSBcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLm1pbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiB0byBcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLm1heCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIi5cIjtcbiAgICAgICAgdGhpcy5pbnB1dEVsID0gaW5wdXQ7XG5cbiAgICAgICAgdGhpcy5hbnN3ZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmlucHV0RWwpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgYW5zd2VyICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXR0aW5nIGFuc3dlciBmb3IgaW50ZWdlclwiKTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuaW5wdXRFbC52YWx1ZSk7XG4gICAgfVxuICAgIGdldCBpc1ZhbGlkICgpIHtcbiAgICAgICAgdmFyIGFuc3dlciA9IHRoaXMuYW5zd2VyO1xuICAgICAgICByZXR1cm4gYW5zd2VyIDwgdGhpcy5tYXggJiYgYW5zd2VyID4gdGhpcy5taW47XG4gICAgfVxuICAgIGVycm9yTWVzc2FnZSA9IFwiTWFrZSBzdXJlIHlvdSd2ZSBlbnRlcmVkIGEgbnVtYmVyIGJldHdlZW4gXCIgXG4gICAgICAgICAgICAgICAgICsgdGhpcy5taW4gXG4gICAgICAgICAgICAgICAgICsgXCIgYW5kIFwiIFxuICAgICAgICAgICAgICAgICArIHRoaXMubWF4O1xufVxuXG5jbGFzcyBDaGVja2xpc3QgZXh0ZW5kcyBRdWVzdGlvbiB7XG4gICAgY29uc3RydWN0b3IgKGlkLCB0ZXh0LCBpbnB1dHMsIHJhZGlvLCB1bm1vZGlmaWFibGUpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy50eXBlID0gcmFkaW8gPyBcInJhZGlvXCIgOiBcImNoZWNrYm94XCI7XG5cbiAgICAgICAgLy8gSWYgcmFkaW8gbW9kZSBpcyBzZXQsIHVzZSBzYW1lIG5hbWUgZm9yIGFsbCBib3hlc1xuICAgICAgICBmb3IgKHZhciBpbnB1dCBvZiBpbnB1dHMpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gaW5wdXRbMF07IFxuICAgICAgICAgICAgdmFyIHRleHQgPSBpbnB1dFsxXTtcbiAgICAgICAgICAgIHZhciBjID0gdGhpcy5jcmVhdGVDaGVja2JveChuYW1lLCB0ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuYW5zd2VyRWwuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5tb2RpZmlhYmxlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgYWRkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGFkZEJ1dHRvbi5pbm5lckhUTUwgPSBcIkRvbid0IHNlZSB5b3VyIG9wdGlvbj8gQ2xpY2sgdG8gYWRkIGFub3RoZXIuXCI7XG4gICAgICAgICAgICBhZGRCdXR0b24uY2xhc3NOYW1lID0gXCJidG4gYnRuLXRoZW1lZCBidG4tc20gbXQtMiB3LTEwMCBib3JkZXItMFwiO1xuICAgICAgICAgICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm5ld0N1c3RvbUlucHV0LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5hZGRCdXR0b24gPSBhZGRCdXR0b247XG4gICAgICAgICAgICB0aGlzLmFuc3dlckVsLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHRyYWN0Q3VzdG9tVmFsdWUgKGVsKSB7XG4gICAgICAgIHZhciBpID0gZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKTtcbiAgICAgICAgcmV0dXJuIGkudmFsdWU7XG4gICAgfVxuXG4gICAgZXh0cmFjdENoZWNrYm94VmFsdWUgKGVsKSB7XG4gICAgICAgIHZhciBpID0gZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKTtcbiAgICAgICAgaWYgKGkuY2hlY2tlZCkgcmV0dXJuIGVsLm5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IGFuc3dlciAoKSB7XG4gICAgICAgIHZhciBjdXN0b21JdGVtcyA9IHRoaXMubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2hlY2tsaXN0LWN1c3RvbVwiKTtcbiAgICAgICAgY3VzdG9tSXRlbXMgPSBbLi4uY3VzdG9tSXRlbXNdO1xuICAgICAgICB2YXIgY3VzdG9tVmFsdWVzID0gY3VzdG9tSXRlbXMubWFwKHRoaXMuZXh0cmFjdEN1c3RvbVZhbHVlLCB0aGlzKTtcblxuICAgICAgICB2YXIgY2hlY2tib3hJdGVtcyA9IHRoaXMubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2hlY2tsaXN0LWl0ZW1zXCIpO1xuICAgICAgICBjaGVja2JveEl0ZW1zID0gWy4uLmNoZWNrYm94SXRlbXNdO1xuICAgICAgICB2YXIgY2hlY2tib3hWYWx1ZXMgPSBjaGVja2JveEl0ZW1zLm1hcCh0aGlzLmV4dHJhY3RDaGVja2JveFZhbHVlLCB0aGlzKTtcblxuICAgICAgICB2YXIgdmFsdWVzID0gY3VzdG9tVmFsdWVzLmNvbmNhdChjaGVja2JveFZhbHVlcyk7XG4gICAgICAgIHJldHVybiB2YWx1ZXMuam9pbihcIlxcblwiKTtcbiAgICB9XG5cbiAgICBlcnJvck1lc3NhZ2UgPSBcIk1ha2Ugc3VyZSB0byBjaGVjayBhdCBsZWFzdCBvbmUgYm94LCBvciBhZGQgYXQgbGVhc3Qgb25lIGN1c3RvbSB2YWx1ZVwiO1xuICAgIGdldCBpc1ZhbGlkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5zd2VyID09PSBcIlwiO1xuICAgIH1cblxuICAgIHJlbW92ZUNoaWxkIChjaGlsZCkge1xuICAgICAgICB0aGlzLmFuc3dlckVsLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICB9XG4gICAgY3JlYXRlQ2hlY2tib3ggKG5hbWUsIHRleHQsIGNoZWNrYm94LCB0ZXh0Tm9kZSkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiY2hlY2tsaXN0LWl0ZW0gZm9ybS1jaGVjayBidG4gYnRuLWxpZ2h0XCI7XG5cbiAgICAgICAgaWYgKHRleHROb2RlID09IHVuZGVmaW5lZCAmJiBjaGVja2JveCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tib3gubmFtZSA9IHRoaXMuaWQ7XG4gICAgICAgICAgICAgICAgY2hlY2tib3gudmFsdWUgPSBuYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGVja2JveC5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoZWNrYm94LnR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiIFwiICsgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIG5ld0N1c3RvbUlucHV0ICgpIHtcbiAgICAgICAgdmFyIHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHJlbW92ZS5jbGFzc05hbWUgPSBcInJlbW92ZSBidG4gYnRuLW91dGxpbmUtZGFuZ2VyXCI7XG4gICAgICAgIHJlbW92ZS5pbm5lckhUTUwgPSBcIiZ0aW1lcztcIjtcbiAgICAgICAgcmVtb3ZlLnN0eWxlLnBhZGRpbmdMZWZ0ID0gXCIxcHhcIjtcblxuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgaW5wdXQuY2xhc3NOYW1lID0gXCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtXCI7XG4gICAgICAgIGlucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBuZXcgb3B0aW9uIGhlcmUuLi5cIjtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jcmVhdGVDaGVja2JveChcIlwiLCBcIlwiLCByZW1vdmUsIGlucHV0KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJkLWZsZXhcIiwgXCJhbGlnbi1pdGVtcy1jZW50ZXJcIik7XG4gICAgICAgIHJlbW92ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZW1vdmVDaGlsZC5iaW5kKHRoaXMsIGNvbnRhaW5lcikpO1xuXG4gICAgICAgIHRoaXMuYW5zd2VyRWwuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgdGhpcy5hZGRCdXR0b24pO1xuXG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxufVxuXG52YXIgcGFnZXIgPSBuZXcgUGFnZXIoXCJzdXJ2ZXktYm9keVwiKTtcblxud2luZG93LmZvcm0gPSBuZXcgRm9ybShcInN1cnZleVwiLCBbXG4gICAgLG5ldyAgIEludGVnZXIoXCJzaW11bHRhbmVvdXMtYXBwbGljYXRpb25zXCJcbiAgICAgICAgICAgICAgICAgICxcIldoZW4gc2VhcmNoaW5nIGZvciBhIGpvYiwgcm91Z2hseSBob3cgbWFueSBzZXBhcmF0ZSBqb2IgYXBwbGljYXRpb25zIGRvIHlvdSB0ZW5kIHRvIG1hbmFnZSBhdCBhbnkgb25lIHRpbWU/XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3IENoZWNrbGlzdChcImhvdy10cmFja2luZ1wiXG4gICAgICAgICAgICAgICAgICAsXCJIb3cgZG8geW91IG5vcm1hbGx5IGtlZXAgdHJhY2sgb2YgeW91ciBhcHBsaWNhdGlvbnMgYW5kIHRoZWlyIGRvY3VtZW50cyBhcyB5b3UgYXBwbHkgdG8gdGhlbT9cIlxuICAgICAgICAgICAgICAgICAgLFtbXCJkb2NzXCIsIFwiV29yZCBEb2N1bWVudHMgLyBUeXBlZCBVcCBGaWxlcyAoLmRvYywgLnR4dCwgLmV0YylcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wic3ByZWFkXCIsIFwiU3ByZWFkc2hlZXRzIChFeGNlbCwgR251bWVyaWMsIGV0Yy4pXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcInBhcGVyXCIsIFwiUGVuIGFuZCBQYXBlciAoTm90ZWJvb2ssIFBvc3QtSXRzLCBldGMuKVwiXVxuICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3IENoZWNrbGlzdChcImV4dHJhLWRvY3VtZW50c1wiXG4gICAgICAgICAgICAgICAgICAsXCJXaGF0IGRvY3VtZW50cyBoYXZlIGJlZW4gcmVxdWVzdGVkIGZyb20geW91IGluIHBhc3QgYXBwbGljYXRpb25zLCBhc2lkZSBmcm9tIENWcz9cIlxuICAgICAgICAgICAgICAgICAgLFtbXCJjb3ZlclwiLCBcIkNvdmVyIExldHRlclwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJyZWZlcmVuY2VcIiwgXCJMZXR0ZXIgb2YgUmVmZXJlbmNlIC8gUmVjb21tZW5kYXRpb25cIl1cbiAgICAgICAgICAgICAgICAgICAsW1wicGhpbG9zb3BoeVwiLCBcIldvcmsgUGhpbG9zb3BoeVwiXVxuICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3IENoZWNrbGlzdChcImRvY3VtZW50LWNyZWF0aW9uLXNvZnR3YXJlc1wiXG4gICAgICAgICAgICAgICAgICAsXCJXaGF0IHByb2dyYW1zIG9yIHNvZnR3YXJlcyBkbyB5b3UgdXNlIHRvIGNyZWF0ZSBkb2N1bWVudHMgZm9yIGFwcGxpY2F0aW9ucz9cIlxuICAgICAgICAgICAgICAgICAgLFtbXCJ3b3JkXCIsIFwiV29yZCAvIEdvb2dsZSBEb2NzIC8gT3RoZXIgT2ZmaWNlIFN1aXRlIFNvZnR3YXJlXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcImxhdGV4XCIsIFwiTGFUZVhcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wiaW5kZXNpZ25cIiwgXCJJbkRlc2lnbiAvIEdJTVAgLyBPdGhlciBEZXNpZ24gYW5kIEFydHdvcmsgU29mdHdhcmVcIl1cbiAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyAgIEludGVnZXIoXCJkaWZmZXJlbnQtY3ZzXCJcbiAgICAgICAgICAgICAgICAgICxcIkhvdyBtYW55IGRpZmZlcmVudCBDVnMgZG8geW91IGdlbmVyYWxseSBtYWludGFpbiBhdCBhIGdpdmVuIHRpbWU/XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3IENoZWNrbGlzdChcInVwZGF0ZS1mcmVxdWVuY3lcIlxuICAgICAgICAgICAgICAgICAgLFwiSG93IG9mdGVuIGRvIHlvdSB1cGRhdGUgb3IgY2hhbmdlIHlvdXIgQ1YncyBjb250ZW50cyBvciBsYXlvdXQ/PGJyLz48c21hbGwgY2xhc3M9J3RleHQtbXV0ZWQgdGV4dC1ub3JtYWwnPihQaWNrIHRoZSBmaXJzdCB0aGF0IGFwcGxpZXMuKTwvc21hbGw+XCJcbiAgICAgICAgICAgICAgICAgICxbW1wiam9iXCIsIFwiRm9yIGV2ZXJ5IGpvYiBhcHBsaWNhdGlvblwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJza2lsbFwiLCBcIkV2ZXJ5IHRpbWUgSSBhY3F1aXJlIGEgbmV3IHNraWxsXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcIj4xcG1vXCIsIFwiTW9yZSB0aGFuIG9uY2UgYSBtb250aFwiXVxuICAgICAgICAgICAgICAgICAgICxbXCI+M3Btb1wiLCBcIk1vcmUgdGhhbiBvbmNlIGV2ZXJ5IDMgbW9udGhzXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcIj4xcHlyXCIsIFwiTW9yZSB0aGFuIG9uY2UgYSB5ZWFyXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcIjwxcHlyXCIsIFwiTGVzcyB0aGFuIG9uY2UgYSB5ZWFyXCJdXG4gICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgLHRydWUsdHJ1ZSlcbiAgICBdLCBwYWdlci5zZXRQYWdlLmJpbmQocGFnZXIpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=