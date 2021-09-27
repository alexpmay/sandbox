"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.useImpression = exports.CausalProvider = exports.identify = exports.CausalClient = exports.toImpression = exports.RegisterDevice = exports.setBaseUrl = exports.setOnError = exports.setOnWarn = exports.setFetch = exports.defaultFetch = exports.setSendBeacon = exports.defaultSendBeacon = exports.queryBuilder = exports.QueryBuilder = exports.createQuery = exports.RatingBox = void 0;
// This is a FeatureDL automatically generated file. DO NOT DIRECTLY EDIT, your changes will not persist.
var node_fetch_1 = require("node-fetch");
var react_1 = require("react");
/** Wraps a rating box that we can put on various product pages
to collect ratings from our users
 *   */
var RatingBox = /** @class */ (function () {
    function RatingBox(impression, args, outputs) {
        this.impression = impression;
        this._impressionId = outputs._impressionId;
        this.product = args.product;
        if (outputs.call_to_action != undefined) {
            this.call_to_action = outputs.call_to_action;
        }
        else {
            this.call_to_action = "Rate this product!";
        }
    }
    /** Occurs each time a rating is collected
     *  */
    RatingBox.prototype.signalrating = function (_a) {
        var stars = _a.stars;
        RatingBox.signalrating(this.impression.deviceId, this._impressionId, {
            stars: stars
        });
    };
    /** Occurs each time a rating is collected
     *  */
    RatingBox.signalrating = function (deviceId, impressionId, _a) {
        var stars = _a.stars;
        var data = {
            feature: "RatingBox",
            event: "rating",
            impressionId: impressionId,
            deviceId: deviceId,
            args: { stars: stars }
        };
        _sendBeacon(data);
    };
    return RatingBox;
}());
exports.RatingBox = RatingBox;
var ImpressionImpl = /** @class */ (function () {
    function ImpressionImpl(impressionJson) {
        this.impressionJson = impressionJson;
        var args = impressionJson.args, requests = impressionJson.requests, outputs = impressionJson.outputs;
        this.deviceId = args.deviceId;
        for (var _i = 0, _a = Object.entries(requests); _i < _a.length; _i++) {
            var _b = _a[_i], feature = _b[0], args_1 = _b[1];
            var output = outputs[feature];
            this[feature] = new featureClasses[feature](this, args_1, output == undefined ? {} : output);
        }
    }
    ImpressionImpl.prototype.toJSON = function () {
        return this.impressionJson;
    };
    return ImpressionImpl;
}());
function createQuery(args) {
    var queryBuilder = new QueryBuilder();
    var _args = args; // cast needed for older versions of typescript
    if (_args.RatingBox !== undefined)
        queryBuilder.getRatingBox(_args.RatingBox);
    return queryBuilder;
}
exports.createQuery = createQuery;
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder() {
        this.queries = {};
    }
    /** Wraps a rating box that we can put on various product pages
  to collect ratings from our users
       *  */
    QueryBuilder.prototype.getRatingBox = function (_a) {
        var product = _a.product;
        this.queries["RatingBox"] = { product: product };
        return this;
    };
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
var featureClasses = {
    RatingBox: RatingBox
};
var _baseUrl = "http://localhost:3004/iserver";
// TODO
function getEvtSourceUrl() {
    return null;
}
if (!_baseUrl.endsWith("/"))
    _baseUrl += "/";
function queryBuilder() {
    return new QueryBuilder();
}
exports.queryBuilder = queryBuilder;
function defaultSendBeacon(data) {
    if (typeof navigator == "undefined") {
        // we are running server side
        _fetch(_baseUrl + "signal", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }
    else {
        navigator.sendBeacon(_baseUrl + "signal", JSON.stringify(data));
    }
}
exports.defaultSendBeacon = defaultSendBeacon;
var _sendBeacon = defaultSendBeacon;
function setSendBeacon(sendBeacon) {
    _sendBeacon = sendBeacon;
}
exports.setSendBeacon = setSendBeacon;
function defaultFetch(url, init) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, node_fetch_1["default"])(url, init)];
        });
    });
}
exports.defaultFetch = defaultFetch;
var _fetch = defaultFetch;
function setFetch(fetch) {
    _fetch = fetch;
}
exports.setFetch = setFetch;
var _onWarn = console.log;
function setOnWarn(onWarn) {
    _onWarn = onWarn;
}
exports.setOnWarn = setOnWarn;
var _onError = console.error;
function setOnError(onError) {
    _onError = onError;
}
exports.setOnError = setOnError;
function errorNever(_, message) {
    _onError(message);
}
function setBaseUrl(baseUrl) {
    if (!baseUrl.endsWith("/"))
        baseUrl += "/";
    _baseUrl = baseUrl;
}
exports.setBaseUrl = setBaseUrl;
/** register the deviceId as a QA device for the given user. Redirect to
 * the device page when complete. Display an error message on failure.
 */
function RegisterDevice(props) {
    // ssr
    var _a = (0, react_1.useState)("Registering..."), result = _a[0], setResult = _a[1];
    if (props.userId === undefined)
        return <div>Cannot register, no userId</div>;
    if (props.deviceId === undefined)
        return <div>Cannot register, no deviceId</div>;
    var userAgent = "unknown";
    if (typeof navigator.userAgent !== "undefined") {
        userAgent = navigator.userAgent;
    }
    function handleResponse(response) {
        return __awaiter(this, void 0, void 0, function () {
            var body, body, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(response.status == 200)) return [3 /*break*/, 2];
                        return [4 /*yield*/, response.text()];
                    case 1:
                        body = _a.sent();
                        window.location.href = body;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        body = _a.sent();
                        message = "Failed to register device: code " + response.status;
                        if (response.status == 400 || response.status == 500) {
                            message += " message: " + body;
                        }
                        setResult(message);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    if (result === "Registering...") {
        _fetch(_baseUrl + "register", {
            method: "POST",
            body: JSON.stringify({
                userId: props.userId,
                deviceId: props.deviceId,
                userAgent: userAgent,
                url: window.location.href.split("?")[0]
            })
        }).then(handleResponse);
    }
    return <div>{result}</div>;
}
exports.RegisterDevice = RegisterDevice;
var _flushCount = 0;
var LocalStorageCache = /** @class */ (function () {
    function LocalStorageCache() {
    }
    LocalStorageCache.prototype.get = function (key) {
        var raw = window.localStorage.getItem(key);
        if (!raw)
            return undefined;
        try {
            var _a = JSON.parse(raw), identity = _a.identity, value = _a.value, created = _a.created, expires = _a.expires;
            var now = new Date();
            // TODO: The server should probably send the created date over the wire
            // As is, flushing could be innacurate due to network latency
            var createdTS = new Date(created);
            var expiresTS = new Date(expires);
            if (expiresTS < now) {
                window.localStorage.removeItem(key);
                return undefined;
            }
            return { identity: identity, value: value, created: createdTS };
        }
        catch (e) {
            _onError("failed to deserialize from cache. Error = " + JSON.stringify(e));
            window.localStorage.removeItem(key);
            return undefined;
        }
    };
    LocalStorageCache.prototype.set = function (key, identity, value, expiresTS) {
        var createdString = new Date().toISOString();
        var expiresString = expiresTS.toISOString();
        var toStore = {
            created: createdString,
            expires: expiresString,
            identity: identity,
            value: value
        };
        return window.localStorage.setItem(key, JSON.stringify(toStore));
    };
    LocalStorageCache.prototype.del = function (key) {
        return window.localStorage.removeItem(key);
    };
    return LocalStorageCache;
}());
var NoOpCache = /** @class */ (function () {
    function NoOpCache() {
    }
    NoOpCache.prototype.get = function () {
        return undefined;
    };
    NoOpCache.prototype.set = function () { };
    NoOpCache.prototype.del = function () { };
    return NoOpCache;
}());
function toImpression(_a) {
    var args = _a.args, requests = _a.requests, outputs = _a.outputs;
    var impression = new ImpressionImpl({
        args: args,
        requests: requests,
        outputs: outputs
    });
    return impression;
}
exports.toImpression = toImpression;
var CausalClient = /** @class */ (function () {
    function CausalClient(_a) {
        var _this = this;
        var _cache = _a.cache, _cacheDurationSeconds = _a.cacheDurationSeconds, _renderMinFetchDebounceSeconds = _a.renderMinFetchDebounceSeconds, _useServerSentEvents = _a.useServerSentEvents, _deviceId = _a.deviceId;
        var ssr = typeof window == "undefined";
        if (!_deviceId)
            _onError("device id was null, undefined or the empty string. Generating random id");
        this.deviceId = _deviceId
            ? _deviceId
            : "gen_" + (Math.random() + 1).toString(36).substring(12);
        if (_cache && _cacheDurationSeconds === 0)
            _onWarn("Cache set, but cacheDuration is 0. Not caching");
        if (_cache === null && _cacheDurationSeconds && _cacheDurationSeconds > 0)
            _onWarn("Cache set to null, but cacheDuration is > 0. Not caching");
        this.cache = _cache !== null && _cache !== void 0 ? _cache : new NoOpCache();
        if (_cacheDurationSeconds == 0)
            this.cache = new NoOpCache();
        else if (!ssr && _cache === undefined)
            this.cache = new LocalStorageCache();
        this.cacheDurationSeconds = 600;
        if (_cacheDurationSeconds !== null && _cacheDurationSeconds !== undefined) {
            this.cacheDurationSeconds = _cacheDurationSeconds;
        }
        this.renderMinFetchDebounceSeconds = _renderMinFetchDebounceSeconds !== null && _renderMinFetchDebounceSeconds !== void 0 ? _renderMinFetchDebounceSeconds : 30;
        var useSSE = !ssr && _useServerSentEvents !== false && _cache !== null;
        if (useSSE) {
            var maybeDel_1 = function (name, createdBeforeDate) {
                if (!createdBeforeDate) {
                    _this.cache.del(name);
                    return;
                }
                try {
                    var createdBefore = new Date(createdBeforeDate);
                    var cur = _this.cache.get(name);
                    if (cur == undefined)
                        return;
                    if (cur.created < createdBefore)
                        _this.cache.del(name);
                }
                catch (e) {
                    _onError("unexpected error analyzing cache - deleting entry. error was " +
                        JSON.stringify(e));
                    _this.cache.del(name);
                }
            };
            var onMessage = function (evt) {
                var data = JSON.parse(evt.data);
                switch (data.action) {
                    case "flush":
                        _flushCount++;
                        for (var _i = 0, _a = data.payload; _i < _a.length; _i++) {
                            var _b = _a[_i], feature = _b.f, ifCreatedBefore = _b.cb;
                            if (feature == "_all") {
                                for (var _c = 0, _d = Object.keys(featureClasses); _c < _d.length; _c++) {
                                    var _feature = _d[_c];
                                    maybeDel_1(_feature, ifCreatedBefore);
                                }
                            }
                            else
                                maybeDel_1(feature, ifCreatedBefore);
                        }
                        break;
                    default:
                        errorNever(data.action, "unknown sever sent event " + data.action);
                }
            };
            var sseUrl = getEvtSourceUrl();
            if (sseUrl !== null) {
                if (_deviceId)
                    sseUrl = sseUrl.replace(/\/?$/, "?" + _deviceId);
                var eventSource = new EventSource(sseUrl);
                eventSource.onmessage = onMessage;
            }
        }
    }
    CausalClient.prototype.requestImpression = function (builder, impressionId) {
        return __awaiter(this, void 0, void 0, function () {
            var queries, outputs, allCached, _i, _a, k, output, identity, sessionArgs, result, fetchExceptionError, body, e_1, error, errMsg, data_1, response, nextExpiry, _b, _c, _d, k, v, identity, data, impressions;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        queries = builder.queries;
                        outputs = {};
                        allCached = true;
                        for (_i = 0, _a = Object.keys(queries); _i < _a.length; _i++) {
                            k = _a[_i];
                            output = this.cache.get(k);
                            if (output == undefined) {
                                allCached = false;
                                break;
                            }
                            identity = identify(queries, k);
                            if (identity !== output.identity) {
                                allCached = false;
                                break;
                            }
                            try {
                                outputs[k] = output.value;
                            }
                            catch (_g) {
                                allCached = false;
                                break;
                            }
                        }
                        sessionArgs = { deviceId: this.deviceId };
                        if (!!allCached) return [3 /*break*/, 8];
                        result = undefined;
                        fetchExceptionError = "";
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        body = {
                            args: sessionArgs,
                            impressionId: impressionId,
                            requests: builder.queries
                        };
                        return [4 /*yield*/, _fetch(_baseUrl + "features", {
                                method: "POST",
                                body: JSON.stringify(body)
                            })];
                    case 2:
                        result = _f.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _f.sent();
                        // @ts-ignore: Object is of type 'unknown'.
                        if (e_1.message)
                            fetchExceptionError = e_1.message;
                        else
                            fetchExceptionError = "unknown exception calling fetch";
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(result === undefined || result.status != 200)) return [3 /*break*/, 6];
                        _e = {
                            status: (result === null || result === void 0 ? void 0 : result.status) || -1
                        };
                        return [4 /*yield*/, (result === null || result === void 0 ? void 0 : result.text())];
                    case 5:
                        error = (_e.message = (_f.sent()) || fetchExceptionError,
                            _e);
                        errMsg = "Impression server error, reverting to control: " +
                            JSON.stringify(error);
                        _onError(errMsg);
                        data_1 = new ImpressionImpl({
                            args: sessionArgs,
                            requests: builder.queries,
                            outputs: outputs
                        });
                        return [2 /*return*/, { impression: data_1, error: error }];
                    case 6: return [4 /*yield*/, result.json()];
                    case 7:
                        response = (_f.sent());
                        outputs = response;
                        nextExpiry = new Date();
                        nextExpiry.setSeconds(nextExpiry.getSeconds() + this.cacheDurationSeconds);
                        for (_b = 0, _c = Object.entries(outputs); _b < _c.length; _b++) {
                            _d = _c[_b], k = _d[0], v = _d[1];
                            identity = identify(queries, k);
                            if (identity != undefined && !k.startsWith("_"))
                                this.cache.set(k, identity, v, nextExpiry);
                        }
                        _f.label = 8;
                    case 8:
                        data = new ImpressionImpl({
                            args: sessionArgs,
                            requests: builder.queries,
                            outputs: outputs
                        });
                        if (allCached) {
                            impressions = Object.fromEntries(Object.entries(outputs).map(function (_a, i) {
                                var k = _a[0], v = _a[1];
                                return [
                                    k,
                                    { impression: v._impressionId, newImpression: impressionId },
                                ];
                            }));
                            _sendBeacon({
                                deviceId: sessionArgs.deviceId,
                                impressions: impressions
                            });
                        }
                        return [2 /*return*/, { impression: data }];
                }
            });
        });
    };
    return CausalClient;
}());
exports.CausalClient = CausalClient;
function identify(queries, featureName) {
    var query = queries[featureName];
    if (query == undefined) {
        _onError("could not find value identity");
        return undefined;
    }
    else {
        var identity = JSON.stringify(query);
        return identity;
    }
}
exports.identify = identify;
var causalContext = (0, react_1.createContext)(null);
function CausalProvider(_a) {
    var client = _a.client, children = _a.children;
    return (<causalContext.Provider value={client}>
      <>{children}</>
    </causalContext.Provider>);
}
exports.CausalProvider = CausalProvider;
function useImpression(builder, impressionId) {
    var _a;
    var client = (0, react_1.useContext)(causalContext);
    var _b = (0, react_1.useState)(new ImpressionImpl({
        args: { deviceId: (_a = client === null || client === void 0 ? void 0 : client.deviceId) !== null && _a !== void 0 ? _a : "error_noClientId" },
        requests: builder.queries,
        outputs: {}
    }) // cast only needed for older versions of typescript
    ), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(undefined), error = _d[0], setError = _d[1];
    function fetchRequest() {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!client) {
                            _onError("call to useImpression w/o seting CausalProvider");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, client.requestImpression(builder, impressionId)];
                    case 1:
                        result = _a.sent();
                        if (loading != false) {
                            setLoading(false);
                        }
                        setData(result.impression);
                        if (result.error) {
                            if (error != result.error) {
                                setError(result.error);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    // refetch data every once and a while, even if the query and options have not changed
    // base this on configured cache value / flushing triggered by server sent events
    //
    // TODO: What should we actually do here?
    //       a) never do this, let users bust manually
    //       b) do something like this, with no min tick,
    //          but put some other protection in for very low cache value
    //       c) restrict minimum cache values generally (to maybe 1 minute)
    //       d) do something (what!?) to send an impression on these types of renders.
    //          could let user bust manually for this as well
    // guard against infinite render loops if refetch happens faster then render
    // should we deep compare the data before setData?
    var forceRefetchTicks = 0;
    if (client != undefined) {
        if (client.renderMinFetchDebounceSeconds > 0) {
            var interval = Math.max(client.cacheDurationSeconds, client.renderMinFetchDebounceSeconds);
            var curSeconds = new Date().getTime() / 1000;
            forceRefetchTicks = Math.floor(curSeconds / interval);
        }
    }
    var dependencyBuster = forceRefetchTicks + ":" + _flushCount + ":" + impressionId + ":" + JSON.stringify({ q: builder.queries });
    (0, react_1.useEffect)(function () {
        fetchRequest();
    }, 
    // disabling react-hooks/exhaustive-deps as the dependencies are encoding in dependency string
    // eslint-disable-next-line
    [dependencyBuster]);
    if (!client) {
        var errorMsg = "call to useImpression w/o seting CausalProvider";
        _onError(errorMsg);
        return {
            data: data,
            loading: false,
            error: { status: -1, message: errorMsg }
        };
    }
    return { data: data, loading: loading, error: error };
}
exports.useImpression = useImpression;
