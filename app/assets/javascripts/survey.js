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
/******/ 	var hotCurrentHash = "4a3fad78fd0ead932c35"; // eslint-disable-line no-unused-vars
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
            if (this.index == index) return;
            if (this.index != undefined) {
                this.pages[this.index].classList.remove("showing");
            }

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
                var index = Math.floor(validities.indexOf(false) / 2) + 1;
                console.log("setting page to index", index, validities);
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

        this.adviceEl = document.createElement("div");
        this.node.appendChild(this.adviceEl);
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
            return parseInt(this.inputEl.value);
        }
    }, {
        key: "isValid",
        get: function get() {
            var answer = this.answer;
            if (isNaN(answer)) return false;
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
            var i = el.getElementsByTagName("input")[0];
            return i.value;
        }
    }, {
        key: "extractCheckboxValue",
        value: function extractCheckboxValue(el) {
            var i = el.getElementsByTagName("input")[0];
            if (i.checked) return i.name;
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
            container.classList.add("checklist-custom", "d-flex", "align-items-center");
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

            var checkboxItems = this.node.getElementsByClassName("checklist-item");
            checkboxItems = [].concat(_toConsumableArray(checkboxItems));
            var checkboxValues = checkboxItems.map(this.extractCheckboxValue, this);
            checkboxValues = checkboxValues.filter(function (v) {
                return v != undefined;
            });

            var values = customValues.concat(checkboxValues);
            return values.join("\n");
        }
    }, {
        key: "isValid",
        get: function get() {
            console.log(this.answer);
            return this.answer !== "";
        }
    }]);

    return Checklist;
}(Question);

window.pager = new Pager("survey-body");

window.form = new Form("survey", [new Integer("simultaneous-applications", "When searching for a job, roughly how many separate job applications do you tend to manage at any one time?"), new Checklist("how-tracking", "How do you normally keep track of your applications and their documents as you apply to them?", [["docs", "Word Documents / Typed Up Files (.doc, .txt, .etc)"], ["spread", "Spreadsheets (Excel, Gnumeric, etc.)"], ["paper", "Pen and Paper (Notebook, Post-Its, etc.)"]]), new Checklist("extra-documents", "What documents have been requested from you in past applications, aside from CVs?", [["cover", "Cover Letter"], ["reference", "Letter of Reference / Recommendation"], ["philosophy", "Work Philosophy"]]), new Checklist("document-creation-softwares", "What programs or softwares do you use to create documents for applications?", [["word", "Word / Google Docs / Other Office Suite Software"], ["latex", "LaTeX"], ["indesign", "InDesign / GIMP / Other Design and Artwork Software"]]), new Integer("different-cvs", "How many different CVs do you generally maintain at a given time?"), new Checklist("update-frequency", "How often do you update or change your CV's contents or layout?<br/><small class='text-muted text-normal'>(Pick the first that applies.)</small>", [["job", "For every job application"], ["skill", "Every time I acquire a new skill"], [">1pmo", "More than once a month"], [">3pmo", "More than once every 3 months"], [">1pyr", "More than once a year"], ["<1pyr", "Less than once a year"]], true, true)], pager.setPage.bind(pager));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyJdLCJuYW1lcyI6WyJQYWdlciIsImlkIiwibm9kZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwYWdlcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzY3JvbGxlciIsInByZXYiLCJhZGRFdmVudExpc3RlbmVyIiwicHJldlBhZ2UiLCJiaW5kIiwibmV4dCIsIm5leHRQYWdlIiwic3VibWl0Iiwic2V0UGFnZSIsImluZGV4IiwidW5kZWZpbmVkIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5uZXJIVE1MIiwibGVuZ3RoIiwic2Nyb2xsVG9wIiwiRm9ybSIsInF1ZXN0aW9ucyIsInZhbGlkaXRpZXMiLCJtYXAiLCJxIiwic2hvd0FkdmljZSIsImFsbFZhbGlkIiwiZXZlcnkiLCJ4IiwiTWF0aCIsImZsb29yIiwiaW5kZXhPZiIsImNvbnNvbGUiLCJsb2ciLCJRdWVzdGlvbiIsInRleHQiLCJlcnJvck1lc3NhZ2UiLCJsYWJlbCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImFuc3dlckVsIiwiY2xhc3NOYW1lIiwiYWR2aWNlRWwiLCJpc1ZhbGlkIiwiYWR2aWNlIiwiSW50ZWdlciIsIm1heCIsIm1pbiIsImFyZ3VtZW50cyIsImlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwiaW5wdXRFbCIsInBhcnNlSW50IiwidmFsdWUiLCJhbnN3ZXIiLCJpc05hTiIsIkNoZWNrbGlzdCIsImlucHV0cyIsInJhZGlvIiwidW5tb2RpZmlhYmxlIiwibmFtZSIsImMiLCJjcmVhdGVDaGVja2JveCIsImFkZEJ1dHRvbiIsIm5ld0N1c3RvbUlucHV0IiwiZWwiLCJpIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjaGVja2VkIiwiY2hpbGQiLCJyZW1vdmVDaGlsZCIsImNoZWNrYm94IiwidGV4dE5vZGUiLCJjb250YWluZXIiLCJjcmVhdGVUZXh0Tm9kZSIsInBhZGRpbmdMZWZ0IiwiaW5zZXJ0QmVmb3JlIiwiZm9jdXMiLCJjdXN0b21JdGVtcyIsImN1c3RvbVZhbHVlcyIsImV4dHJhY3RDdXN0b21WYWx1ZSIsImNoZWNrYm94SXRlbXMiLCJjaGVja2JveFZhbHVlcyIsImV4dHJhY3RDaGVja2JveFZhbHVlIiwiZmlsdGVyIiwidiIsInZhbHVlcyIsImNvbmNhdCIsImpvaW4iLCJ3aW5kb3ciLCJwYWdlciIsImZvcm0iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBLHNEQUE4QztBQUM5QztBQUNBO0FBQ0Esb0NBQTRCO0FBQzVCLHFDQUE2QjtBQUM3Qix5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUMsTUFBRCxFQUFTLG9EQUFULENBQUQsRUFDQyxDQUFDLFFBQUQsRUFBVyxzQ0FBWCxDQURELEVBRUMsQ0FBQyxPQUFELEVBQVUsMENBQVYsQ0FGRCxDQUZkLENBSjRCLEVBVzVCLElBQUlBLFNBQUosQ0FBYyxpQkFBZCxFQUNjLG1GQURkLEVBRWMsQ0FBQyxDQUFDLE9BQUQsRUFBVSxjQUFWLENBQUQsRUFDQyxDQUFDLFdBQUQsRUFBYyxzQ0FBZCxDQURELEVBRUMsQ0FBQyxZQUFELEVBQWUsaUJBQWYsQ0FGRCxDQUZkLENBWDRCLEVBa0I1QixJQUFJQSxTQUFKLENBQWMsNkJBQWQsRUFDYyw2RUFEZCxFQUVjLENBQUMsQ0FBQyxNQUFELEVBQVMsa0RBQVQsQ0FBRCxFQUNDLENBQUMsT0FBRCxFQUFVLE9BQVYsQ0FERCxFQUVDLENBQUMsVUFBRCxFQUFhLHFEQUFiLENBRkQsQ0FGZCxDQWxCNEIsRUF5QjVCLElBQU1aLE9BQU4sQ0FBYyxlQUFkLEVBQ2MsbUVBRGQsQ0F6QjRCLEVBNEI1QixJQUFJWSxTQUFKLENBQWMsa0JBQWQsRUFDYyxrSkFEZCxFQUVjLENBQUMsQ0FBQyxLQUFELEVBQVEsMkJBQVIsQ0FBRCxFQUNDLENBQUMsT0FBRCxFQUFVLGtDQUFWLENBREQsRUFFQyxDQUFDLE9BQUQsRUFBVSx3QkFBVixDQUZELEVBR0MsQ0FBQyxPQUFELEVBQVUsK0JBQVYsQ0FIRCxFQUlDLENBQUMsT0FBRCxFQUFVLHVCQUFWLENBSkQsRUFLQyxDQUFDLE9BQUQsRUFBVSx1QkFBVixDQUxELENBRmQsRUFTYyxJQVRkLEVBU21CLElBVG5CLENBNUI0QixDQUFuQixFQXNDUGtDLE1BQU1sRixPQUFOLENBQWNKLElBQWQsQ0FBbUJzRixLQUFuQixDQXRDTyxDQUFkLEMiLCJmaWxlIjoic3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHQ7XG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKVxuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiNGEzZmFkNzhmZDBlYWQ5MzJjMzVcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoIWluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmNsdWRlcyhtb2R1bGVJZCkpXG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKCFtZS5jaGlsZHJlbi5pbmNsdWRlcyhyZXF1ZXN0KSkgbWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluY2x1ZGVzKHBhcmVudElkKSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKCFhLmluY2x1ZGVzKGl0ZW0pKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmNsdWRlcyhjYikpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJjbGFzcyBQYWdlciB7XG4gICAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCk7XG4gICAgICAgIHRoaXMucGFnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGFnZVwiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2Nyb2xsZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1cnZleS1zY3JvbGxlclwiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucHJldiA9IHRoaXMubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJldlwiKVswXTtcbiAgICAgICAgdGhpcy5wcmV2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnByZXZQYWdlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLm5leHQgPSB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5leHRcIilbMF07XG4gICAgICAgIHRoaXMubmV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5uZXh0UGFnZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLnN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VydmV5LXN1Ym1pdHRlclwiKTtcblxuICAgICAgICB0aGlzLnNldFBhZ2UoMCk7XG4gICAgfVxuXG4gICAgc2V0UGFnZSAoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPT0gaW5kZXgpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VzW3RoaXMuaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93aW5nXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuXG4gICAgICAgIHRoaXMucGFnZXNbdGhpcy5pbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dpbmdcIik7XG5cbiAgICAgICAgdGhpcy5wcmV2LnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuICAgICAgICB0aGlzLm5leHQuc3R5bGUuZGlzcGxheSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3VibWl0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5wcmV2LmlubmVySFRNTCA9IFwiUHJldiBTZWN0aW9uXCI7XG4gICAgICAgIHRoaXMubmV4dC5pbm5lckhUTUwgPSBcIk5leHQgU2VjdGlvblwiO1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmV2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMubmV4dC5pbm5lckhUTUwgPSBcIlN0YXJ0IHRoZSBTdXJ2ZXlcIjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLnBhZ2VzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gc2Nyb2xsIHRoZSBmb3JtIGJhY2sgdG8gdGhlIHRvcFxuICAgICAgICB0aGlzLnNjcm9sbGVyLnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuXG4gICAgbmV4dFBhZ2UgKCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5wYWdlcy5sZW5ndGggLSAxKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLmluZGV4ICsgMSk7XG4gICAgfVxuICAgIHByZXZQYWdlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPT09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuaW5kZXggLSAxKTtcbiAgICB9XG59XG5cbmNsYXNzIEZvcm0ge1xuICAgIGNvbnN0cnVjdG9yIChpZCwgcXVlc3Rpb25zLCBzZXRQYWdlKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5xdWVzdGlvbnMgPSBxdWVzdGlvbnM7XG4gICAgICAgIHRoaXMuc2V0UGFnZSA9IHNldFBhZ2U7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcbiAgICB9XG5cbiAgICBzdWJtaXQgKCkge1xuICAgICAgICB2YXIgdmFsaWRpdGllcyA9IHRoaXMucXVlc3Rpb25zLm1hcChxID0+IHEuc2hvd0FkdmljZSgpKTtcbiAgICAgICAgdmFyIGFsbFZhbGlkID0gdmFsaWRpdGllcy5ldmVyeSh4ID0+IHggPT0gdHJ1ZSk7XG4gICAgICAgIGlmICghYWxsVmFsaWQpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IodmFsaWRpdGllcy5pbmRleE9mKGZhbHNlKSAvIDIpICsgMTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyBwYWdlIHRvIGluZGV4XCIsIGluZGV4LCB2YWxpZGl0aWVzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFnZShpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFF1ZXN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQsIHRleHQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWdyb3VwXCIpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBsYWJlbC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5hbnN3ZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuYW5zd2VyRWwuY2xhc3NOYW1lID0gXCJhbnN3ZXJcIjtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKHRoaXMuYW5zd2VyRWwpO1xuXG4gICAgICAgIHRoaXMuYWR2aWNlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy5hZHZpY2VFbCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBhbnN3ZXIgKCkgeyBcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgXG4gICAgfVxuICAgIGdldCBpc1ZhbGlkICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVycm9yTWVzc2FnZSA9IFwiXCI7XG5cbiAgICBzaG93QWR2aWNlICgpIHtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0aGlzLmlzVmFsaWQ7XG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmFkdmljZUVsLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5hZHZpY2VFbC5pbm5lckhUTUwgPSB0aGlzLmFkdmljZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWR2aWNlRWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgdGhpcy5hZHZpY2VFbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgIH1cbn1cblxuY2xhc3MgSW50ZWdlciBleHRlbmRzIFF1ZXN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQsIHRleHQsIG1heCwgbWluKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG5cbiAgICAgICAgdGhpcy5taW4gPSBtaW4gPyBtaW4gOiAxO1xuICAgICAgICB0aGlzLm1heCA9IG1heCA/IG1heCA6IDEwMDtcblxuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LmNsYXNzTmFtZSA9IFwiZm9ybS1jb250cm9sXCI7XG4gICAgICAgIGlucHV0LnR5cGUgPSBcIm51bWJlclwiO1xuICAgICAgICBpbnB1dC5tYXggPSB0aGlzLm1heDtcbiAgICAgICAgaW5wdXQubWluID0gdGhpcy5taW47XG4gICAgICAgIGlucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBhIG51bWJlciBmcm9tIFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIHRoaXMubWluIFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiIHRvIFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIHRoaXMubWF4IFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiLlwiO1xuICAgICAgICB0aGlzLmlucHV0RWwgPSBpbnB1dDtcblxuICAgICAgICB0aGlzLmFuc3dlckVsLmFwcGVuZENoaWxkKHRoaXMuaW5wdXRFbCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBhbnN3ZXIgKCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5pbnB1dEVsLnZhbHVlKTtcbiAgICB9XG4gICAgZ2V0IGlzVmFsaWQgKCkge1xuICAgICAgICB2YXIgYW5zd2VyID0gdGhpcy5hbnN3ZXI7XG4gICAgICAgIGlmIChpc05hTihhbnN3ZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBhbnN3ZXIgPCB0aGlzLm1heCAmJiBhbnN3ZXIgPiB0aGlzLm1pbjtcbiAgICB9XG4gICAgZXJyb3JNZXNzYWdlID0gXCJNYWtlIHN1cmUgeW91J3ZlIGVudGVyZWQgYSBudW1iZXIgYmV0d2VlbiBcIiBcbiAgICAgICAgICAgICAgICAgKyB0aGlzLm1pbiBcbiAgICAgICAgICAgICAgICAgKyBcIiBhbmQgXCIgXG4gICAgICAgICAgICAgICAgICsgdGhpcy5tYXg7XG59XG5cbmNsYXNzIENoZWNrbGlzdCBleHRlbmRzIFF1ZXN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQsIHRleHQsIGlucHV0cywgcmFkaW8sIHVubW9kaWZpYWJsZSkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnR5cGUgPSByYWRpbyA/IFwicmFkaW9cIiA6IFwiY2hlY2tib3hcIjtcblxuICAgICAgICAvLyBJZiByYWRpbyBtb2RlIGlzIHNldCwgdXNlIHNhbWUgbmFtZSBmb3IgYWxsIGJveGVzXG4gICAgICAgIGZvciAodmFyIGlucHV0IG9mIGlucHV0cykge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBpbnB1dFswXTsgXG4gICAgICAgICAgICB2YXIgdGV4dCA9IGlucHV0WzFdO1xuICAgICAgICAgICAgdmFyIGMgPSB0aGlzLmNyZWF0ZUNoZWNrYm94KG5hbWUsIHRleHQpO1xuICAgICAgICAgICAgdGhpcy5hbnN3ZXJFbC5hcHBlbmRDaGlsZChjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1bm1vZGlmaWFibGUgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgYWRkQnV0dG9uLmlubmVySFRNTCA9IFwiRG9uJ3Qgc2VlIHlvdXIgb3B0aW9uPyBDbGljayB0byBhZGQgYW5vdGhlci5cIjtcbiAgICAgICAgICAgIGFkZEJ1dHRvbi5jbGFzc05hbWUgPSBcImJ0biBidG4tdGhlbWVkIGJ0bi1zbSBtdC0yIHctMTAwIGJvcmRlci0wXCI7XG4gICAgICAgICAgICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMubmV3Q3VzdG9tSW5wdXQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmFkZEJ1dHRvbiA9IGFkZEJ1dHRvbjtcbiAgICAgICAgICAgIHRoaXMuYW5zd2VyRWwuYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4dHJhY3RDdXN0b21WYWx1ZSAoZWwpIHtcbiAgICAgICAgdmFyIGkgPSBlbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdO1xuICAgICAgICByZXR1cm4gaS52YWx1ZTtcbiAgICB9XG5cbiAgICBleHRyYWN0Q2hlY2tib3hWYWx1ZSAoZWwpIHtcbiAgICAgICAgdmFyIGkgPSBlbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdO1xuICAgICAgICBpZiAoaS5jaGVja2VkKSByZXR1cm4gaS5uYW1lO1xuICAgIH1cblxuICAgIGdldCBhbnN3ZXIgKCkge1xuICAgICAgICB2YXIgY3VzdG9tSXRlbXMgPSB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNoZWNrbGlzdC1jdXN0b21cIik7XG4gICAgICAgIGN1c3RvbUl0ZW1zID0gWy4uLmN1c3RvbUl0ZW1zXTtcbiAgICAgICAgdmFyIGN1c3RvbVZhbHVlcyA9IGN1c3RvbUl0ZW1zLm1hcCh0aGlzLmV4dHJhY3RDdXN0b21WYWx1ZSwgdGhpcyk7XG5cbiAgICAgICAgdmFyIGNoZWNrYm94SXRlbXMgPSB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNoZWNrbGlzdC1pdGVtXCIpO1xuICAgICAgICBjaGVja2JveEl0ZW1zID0gWy4uLmNoZWNrYm94SXRlbXNdO1xuICAgICAgICB2YXIgY2hlY2tib3hWYWx1ZXMgPSBjaGVja2JveEl0ZW1zLm1hcCh0aGlzLmV4dHJhY3RDaGVja2JveFZhbHVlLCB0aGlzKTtcbiAgICAgICAgY2hlY2tib3hWYWx1ZXMgPSBjaGVja2JveFZhbHVlcy5maWx0ZXIodiA9PiB2ICE9IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgdmFyIHZhbHVlcyA9IGN1c3RvbVZhbHVlcy5jb25jYXQoY2hlY2tib3hWYWx1ZXMpO1xuICAgICAgICByZXR1cm4gdmFsdWVzLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuXG4gICAgZXJyb3JNZXNzYWdlID0gXCJNYWtlIHN1cmUgdG8gY2hlY2sgYXQgbGVhc3Qgb25lIGJveCwgb3IgYWRkIGF0IGxlYXN0IG9uZSBjdXN0b20gdmFsdWVcIjtcbiAgICBnZXQgaXNWYWxpZCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYW5zd2VyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5zd2VyICE9PSBcIlwiO1xuICAgIH1cblxuICAgIHJlbW92ZUNoaWxkIChjaGlsZCkge1xuICAgICAgICB0aGlzLmFuc3dlckVsLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICB9XG4gICAgY3JlYXRlQ2hlY2tib3ggKG5hbWUsIHRleHQsIGNoZWNrYm94LCB0ZXh0Tm9kZSkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiY2hlY2tsaXN0LWl0ZW0gZm9ybS1jaGVjayBidG4gYnRuLWxpZ2h0XCI7XG5cbiAgICAgICAgaWYgKHRleHROb2RlID09IHVuZGVmaW5lZCAmJiBjaGVja2JveCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tib3gubmFtZSA9IHRoaXMuaWQ7XG4gICAgICAgICAgICAgICAgY2hlY2tib3gudmFsdWUgPSBuYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGVja2JveC5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoZWNrYm94LnR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiIFwiICsgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIG5ld0N1c3RvbUlucHV0ICgpIHtcbiAgICAgICAgdmFyIHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHJlbW92ZS5jbGFzc05hbWUgPSBcInJlbW92ZSBidG4gYnRuLW91dGxpbmUtZGFuZ2VyXCI7XG4gICAgICAgIHJlbW92ZS5pbm5lckhUTUwgPSBcIiZ0aW1lcztcIjtcbiAgICAgICAgcmVtb3ZlLnN0eWxlLnBhZGRpbmdMZWZ0ID0gXCIxcHhcIjtcblxuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgaW5wdXQuY2xhc3NOYW1lID0gXCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtXCI7XG4gICAgICAgIGlucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBuZXcgb3B0aW9uIGhlcmUuLi5cIjtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jcmVhdGVDaGVja2JveChcIlwiLCBcIlwiLCByZW1vdmUsIGlucHV0KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjaGVja2xpc3QtY3VzdG9tXCIsIFwiZC1mbGV4XCIsIFwiYWxpZ24taXRlbXMtY2VudGVyXCIpO1xuICAgICAgICByZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVtb3ZlQ2hpbGQuYmluZCh0aGlzLCBjb250YWluZXIpKTtcblxuICAgICAgICB0aGlzLmFuc3dlckVsLmluc2VydEJlZm9yZShjb250YWluZXIsIHRoaXMuYWRkQnV0dG9uKTtcblxuICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgIH1cbn1cblxud2luZG93LnBhZ2VyID0gbmV3IFBhZ2VyKFwic3VydmV5LWJvZHlcIik7XG5cbndpbmRvdy5mb3JtID0gbmV3IEZvcm0oXCJzdXJ2ZXlcIiwgW1xuICAgICBuZXcgICBJbnRlZ2VyKFwic2ltdWx0YW5lb3VzLWFwcGxpY2F0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAsXCJXaGVuIHNlYXJjaGluZyBmb3IgYSBqb2IsIHJvdWdobHkgaG93IG1hbnkgc2VwYXJhdGUgam9iIGFwcGxpY2F0aW9ucyBkbyB5b3UgdGVuZCB0byBtYW5hZ2UgYXQgYW55IG9uZSB0aW1lP1wiXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyBDaGVja2xpc3QoXCJob3ctdHJhY2tpbmdcIlxuICAgICAgICAgICAgICAgICAgLFwiSG93IGRvIHlvdSBub3JtYWxseSBrZWVwIHRyYWNrIG9mIHlvdXIgYXBwbGljYXRpb25zIGFuZCB0aGVpciBkb2N1bWVudHMgYXMgeW91IGFwcGx5IHRvIHRoZW0/XCJcbiAgICAgICAgICAgICAgICAgICxbW1wiZG9jc1wiLCBcIldvcmQgRG9jdW1lbnRzIC8gVHlwZWQgVXAgRmlsZXMgKC5kb2MsIC50eHQsIC5ldGMpXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcInNwcmVhZFwiLCBcIlNwcmVhZHNoZWV0cyAoRXhjZWwsIEdudW1lcmljLCBldGMuKVwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJwYXBlclwiLCBcIlBlbiBhbmQgUGFwZXIgKE5vdGVib29rLCBQb3N0LUl0cywgZXRjLilcIl1cbiAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyBDaGVja2xpc3QoXCJleHRyYS1kb2N1bWVudHNcIlxuICAgICAgICAgICAgICAgICAgLFwiV2hhdCBkb2N1bWVudHMgaGF2ZSBiZWVuIHJlcXVlc3RlZCBmcm9tIHlvdSBpbiBwYXN0IGFwcGxpY2F0aW9ucywgYXNpZGUgZnJvbSBDVnM/XCJcbiAgICAgICAgICAgICAgICAgICxbW1wiY292ZXJcIiwgXCJDb3ZlciBMZXR0ZXJcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wicmVmZXJlbmNlXCIsIFwiTGV0dGVyIG9mIFJlZmVyZW5jZSAvIFJlY29tbWVuZGF0aW9uXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcInBoaWxvc29waHlcIiwgXCJXb3JrIFBoaWxvc29waHlcIl1cbiAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyBDaGVja2xpc3QoXCJkb2N1bWVudC1jcmVhdGlvbi1zb2Z0d2FyZXNcIlxuICAgICAgICAgICAgICAgICAgLFwiV2hhdCBwcm9ncmFtcyBvciBzb2Z0d2FyZXMgZG8geW91IHVzZSB0byBjcmVhdGUgZG9jdW1lbnRzIGZvciBhcHBsaWNhdGlvbnM/XCJcbiAgICAgICAgICAgICAgICAgICxbW1wid29yZFwiLCBcIldvcmQgLyBHb29nbGUgRG9jcyAvIE90aGVyIE9mZmljZSBTdWl0ZSBTb2Z0d2FyZVwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJsYXRleFwiLCBcIkxhVGVYXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcImluZGVzaWduXCIsIFwiSW5EZXNpZ24gLyBHSU1QIC8gT3RoZXIgRGVzaWduIGFuZCBBcnR3b3JrIFNvZnR3YXJlXCJdXG4gICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICxuZXcgICBJbnRlZ2VyKFwiZGlmZmVyZW50LWN2c1wiXG4gICAgICAgICAgICAgICAgICAsXCJIb3cgbWFueSBkaWZmZXJlbnQgQ1ZzIGRvIHlvdSBnZW5lcmFsbHkgbWFpbnRhaW4gYXQgYSBnaXZlbiB0aW1lP1wiXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyBDaGVja2xpc3QoXCJ1cGRhdGUtZnJlcXVlbmN5XCJcbiAgICAgICAgICAgICAgICAgICxcIkhvdyBvZnRlbiBkbyB5b3UgdXBkYXRlIG9yIGNoYW5nZSB5b3VyIENWJ3MgY29udGVudHMgb3IgbGF5b3V0Pzxici8+PHNtYWxsIGNsYXNzPSd0ZXh0LW11dGVkIHRleHQtbm9ybWFsJz4oUGljayB0aGUgZmlyc3QgdGhhdCBhcHBsaWVzLik8L3NtYWxsPlwiXG4gICAgICAgICAgICAgICAgICAsW1tcImpvYlwiLCBcIkZvciBldmVyeSBqb2IgYXBwbGljYXRpb25cIl1cbiAgICAgICAgICAgICAgICAgICAsW1wic2tpbGxcIiwgXCJFdmVyeSB0aW1lIEkgYWNxdWlyZSBhIG5ldyBza2lsbFwiXVxuICAgICAgICAgICAgICAgICAgICxbXCI+MXBtb1wiLCBcIk1vcmUgdGhhbiBvbmNlIGEgbW9udGhcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wiPjNwbW9cIiwgXCJNb3JlIHRoYW4gb25jZSBldmVyeSAzIG1vbnRoc1wiXVxuICAgICAgICAgICAgICAgICAgICxbXCI+MXB5clwiLCBcIk1vcmUgdGhhbiBvbmNlIGEgeWVhclwiXVxuICAgICAgICAgICAgICAgICAgICxbXCI8MXB5clwiLCBcIkxlc3MgdGhhbiBvbmNlIGEgeWVhclwiXVxuICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICx0cnVlLHRydWUpXG4gICAgXSwgcGFnZXIuc2V0UGFnZS5iaW5kKHBhZ2VyKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9