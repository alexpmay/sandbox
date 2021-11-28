// This is a FeatureDL automatically generated file. DO NOT DIRECTLY EDIT, your changes will not persist.
import fetch from "cross-fetch";
import React, { useEffect, useReducer, useRef, useState } from "react";

///////////////////////////////////////////////////////////////////////////////
//#region  parameterized


/** An example feature for reference documentation purposes
 *   */
type ExampleFeatureWireOutputs = {
  readonly example_output: string;
  readonly _impressionId: string;
}

/** An example feature for reference documentation purposes
 *   */
export class ExampleFeature {
    /** An example string argument
     *
     *  Default: null
     *   */
    readonly exampleString: string;
    /** An example string output
     *
     *  Control: "Example"
     *   */
    readonly exampleOutput: string;

    /** @internal
     *
     * when constructed from cache, this is the original impression
     * otherwise it will be the the one associated with the fetch
     */
    readonly #_impression: ImpressionImpl;

    /** @internal */
    readonly #_impressionId: string;

    /** Example integer event   
    *  */
    signalRating( { exampleEvent } 
        : {  exampleEvent : number  } ) : void
    {
      ExampleFeature.signalRating( this.#_impression.deviceId, this.#_impressionId, { exampleEvent, } );
    }
    /** Example integer event   
      *  */
    static signalRating( deviceId : string, impressionId : string,  { exampleEvent } 
        : {  exampleEvent : number  } ) : void
    {
        const _data = { 
          feature: "ExampleFeature",
          event: "rating",
          impressionId: impressionId,
          deviceId: deviceId,
          args: {  example_event: exampleEvent  }
        };
      network.sendBeacon(_data);
    }

  constructor( 
    impression: ImpressionImpl, 
    args: NonNullable<_WireArgs["ExampleFeature"]>, 
    outputs: ExampleFeatureWireOutputs ) {
    this.#_impression = impression;
    this.#_impressionId = outputs._impressionId;
    this.exampleString = args.example_string;
    if (outputs.example_output != undefined) {
        this.exampleOutput = outputs.example_output;
    } else {
        this.exampleOutput = "Example";
    }
  }
}
/** A second example feature for reference documentation purposes
 *   */
type ExampleFeature2WireOutputs = {
  readonly example_output: number;
  readonly _impressionId: string;
}

/** A second example feature for reference documentation purposes
 *   */
export class ExampleFeature2 {
    /** An example string argument
     *
     *  Default: null
     *   */
    readonly exampleInt: number;
    /** An example int output
     *
     *  Control: 1
     *   */
    readonly exampleOutput: number;

    /** @internal
     *
     * when constructed from cache, this is the original impression
     * otherwise it will be the the one associated with the fetch
     */
    readonly #_impression: ImpressionImpl;

    /** @internal */
    readonly #_impressionId: string;

    /** Example string event   
    *  */
    signalRating( { exampleEvent } 
        : {  exampleEvent : string  } ) : void
    {
      ExampleFeature2.signalRating( this.#_impression.deviceId, this.#_impressionId, { exampleEvent, } );
    }
    /** Example string event   
      *  */
    static signalRating( deviceId : string, impressionId : string,  { exampleEvent } 
        : {  exampleEvent : string  } ) : void
    {
        const _data = { 
          feature: "ExampleFeature2",
          event: "rating",
          impressionId: impressionId,
          deviceId: deviceId,
          args: {  example_event: exampleEvent  }
        };
      network.sendBeacon(_data);
    }

  constructor( 
    impression: ImpressionImpl, 
    args: NonNullable<_WireArgs["ExampleFeature2"]>, 
    outputs: ExampleFeature2WireOutputs ) {
    this.#_impression = impression;
    this.#_impressionId = outputs._impressionId;
    this.exampleInt = args.example_int;
    if (outputs.example_output != undefined) {
        this.exampleOutput = outputs.example_output;
    } else {
        this.exampleOutput = 1;
    }
  }
}

type SessionArgs = {
   deviceId: string;
};

class ImpressionImpl implements Impression<FeatureNames> {
  readonly #_impressionJson: ImpressionJSON<FeatureNames>;

  // Note: There is no impression id declared at this level
  // The features have impression ids as part of their outputs

  toJSON() {
    return this.#_impressionJson;
  }

  get deviceId() {
    return this.#_impressionJson.deviceId;
  }

  constructor(impressionJson: ImpressionJSON<FeatureNames>) {
    this.#_impressionJson = impressionJson;
    const { wireArgs, wireOutputs } = impressionJson;
    for (const [wireName, args] of Object.entries(wireArgs) as [
      keyof _WireArgs,
      _WireArgs[keyof _WireArgs]
    ][]) {
      const output = wireOutputs[wireName];
      if (output == undefined && !impressionJson.maybeEmpty)
        log.error("unexpected undefined wire output for " + wireName);
      const featureName = wireToFeatureName(wireName);
      this[featureName] = new allFeatureTypes[featureName](
        this,
        args as any, // eslint-disable-line
        (output == undefined
          ? { _impressionId: "errNoOutputs" }
          : output) as any // eslint-disable-line
      ) as any; // eslint-disable-line
    }
  }

  ExampleFeature?: ExampleFeature 
  ExampleFeature2?: ExampleFeature2 

}

/**
 * Represents the type of a query, both its features and arguments. 
 * 
 * The type signature looks complicated, but it just represents an object that maps the selected feature names to the corresponding feature arguments.
 * This type generally will not be constructed manually, but instead be inferred from the return value of [[queryBuilder]] or [[createQuery]]. 
 * The typing will then cary through to all the other Causal functions like [[useImpression]] and [[requestImpression]].
 *
 * @paramtype The feature to query for
 */
export type QueryArgs<T extends FeatureNames> = 
    /** An example feature for reference documentation purposes
     *  */
    & ("ExampleFeature" extends T ?   
      { ExampleFeature : 
          {  exampleString : string  } } : unknown ) 
    /** A second example feature for reference documentation purposes
     *  */
    & ("ExampleFeature2" extends T ?   
      { ExampleFeature2 : 
          {  exampleInt : number  } } : unknown ) 


/**
 * Create a query to use with [[requestImpression]] or [[useImpression]].
 * 
 * @typeparam The names of the features to query for.
 * @param args The arguments for each feature in T.
 * @return Query to use with [[requestImpression]] or [[useImpression]].
 */ 
export function createQuery<T extends FeatureNames>(
  args: QueryArgs<T>
): Query<T> {
  const query = new Query<T>();
  const _args = args as unknown as QueryArgs<FeatureNames>; // cast needed for older versions of typescript
   
  if (_args.ExampleFeature !== undefined)
    query.getExampleFeature(_args.ExampleFeature);
  if (_args.ExampleFeature2 !== undefined)
    query.getExampleFeature2(_args.ExampleFeature2);
  return query;
}

/** 
* Features to query, along with their arguments.
*
* A query is created by using either [[queryBuilder]] or [[createQuery]].
*
* A query is executed by calling either [[requestImpression]] or [[useImpression]].
*
*/
export class Query<T extends FeatureNames>{
    /** An example feature for reference documentation purposes
     *  */
    getExampleFeature( { exampleString } 
      : {  exampleString : string  } )
        : Query<T | "ExampleFeature"> {
        this._wireArgs['ExampleFeature'] = { example_string: exampleString, }
        return this
    }
    /** A second example feature for reference documentation purposes
     *  */
    getExampleFeature2( { exampleInt } 
      : {  exampleInt : number  } )
        : Query<T | "ExampleFeature2"> {
        this._wireArgs['ExampleFeature2'] = { example_int: exampleInt, }
        return this
    }

    /** @internal **/
    _wireArgs: _WireArgs = {};
}

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _WireArgs = {
    ExampleFeature?:  { 
      example_string: string
       },
    ExampleFeature2?:  { 
      example_int: number
       },
};

type FeatureNames = 
    |"ExampleFeature"
        |"ExampleFeature2"
    ;

type _WireNames = 
    |"ExampleFeature"
        |"ExampleFeature2"
    ;

const wireNames = [
    "ExampleFeature",
    "ExampleFeature2",
] as const;


function wireToFeatureName(wireName: _WireNames): FeatureNames {
  switch (wireName) {
    case "ExampleFeature": return "ExampleFeature";
        case "ExampleFeature2": return "ExampleFeature2";
    ;
    default:
      errorNever(wireName, "unexpected wireName");
      return wireName as FeatureNames
  }
}

/**
 * An object of the form `{"FeatureName": FeatureType}` for all features
 * Useful as an object to autocomplete off of.
 */
export const allFeatureTypes = {
    ExampleFeature,
    ExampleFeature2,
    };

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _WireOutputs = {
    ExampleFeature?:ExampleFeatureWireOutputs;
    ExampleFeature2?:ExampleFeature2WireOutputs;
}

type Impression<T extends FeatureNames> =
    & ("ExampleFeature" extends T ? { ExampleFeature?:ExampleFeature } : unknown)
    & ("ExampleFeature2" extends T ? { ExampleFeature2?:ExampleFeature2 } : unknown)
    & { deviceId: string }
    & { toJSON(): ImpressionJSON<T> }
    & {
    }

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _WireFlags = {
    ExampleFeature: boolean;
    ExampleFeature2: boolean;
};

type Flags<T extends FeatureNames> = 
    & ("ExampleFeature" extends T ? { ExampleFeature: boolean } : unknown )
    & ("ExampleFeature2" extends T ? { ExampleFeature2: boolean } : unknown )


/**
 * The state of the feature flags when the FDL was compiled to this file.
 */
export const defaultFlags: Flags<FeatureNames> = {
    ExampleFeature: true,
    ExampleFeature2: true,
};

//#endregion
///////////////////////////////////////////////////////////////////////////////

//#region caching

/**
 * @internal
 * Do not use - only exported for testing
 */
export function debugGetCache() {
  return _cache;
}

let _flushCount = 0;

/**
 * @internal
 * Do not use - only exported for testing
 */
export type BackingStore = {
  get(
    key: string
  ): undefined | { identity: string; value: unknown; created: Date };
  set(key: string, identity: string, value: unknown, expiresTS: Date): void;
  del(key: string): void;
  dontStore(): boolean;
};

/**
 * @internal
 * Do not use - only exported for testing
 */
export type StoreItem = {
  created: string;
  expires: string;
  identity: string;
  value: unknown;
};

class LocalStorageStore implements BackingStore {
  static makeKey(key: string): string {
    return "_causal_" + key;
  }

  get(
    key: string
  ): undefined | { identity: string; value: unknown; created: Date } {
    const _key = LocalStorageStore.makeKey(key);
    const raw = window.localStorage.getItem(_key);
    if (!raw) return undefined;
    try {
      const { identity, value, created, expires }: StoreItem = JSON.parse(raw);

      const now = new Date();
      const createdTS = new Date(created);
      const expiresTS = new Date(expires);

      if (expiresTS < now) {
        window.localStorage.removeItem(_key);
        return undefined;
      }

      return { identity, value, created: createdTS };
    } catch (e) {
      log.error(
        "failed to deserialize from cache. Error = " + JSON.stringify(e)
      );
      window.localStorage.removeItem(_key);
      return undefined;
    }
  }

  set(key: string, identity: string, value: string, expiresTS: Date) {
    const _key = LocalStorageStore.makeKey(key);
    const createdString = new Date().toISOString();
    const expiresString = expiresTS.toISOString();
    const toStore: StoreItem = {
      created: createdString,
      expires: expiresString,
      identity,
      value,
    };
    return window.localStorage.setItem(_key, JSON.stringify(toStore));
  }

  del(key: string) {
    const _key = LocalStorageStore.makeKey(key);
    window.localStorage.removeItem(_key);
  }

  dontStore() {
    return false;
  }
}
class NoOpStore implements BackingStore {
  get(): undefined {
    return undefined;
  }
  set() {
    undefined;
  }

  del() {
    undefined;
  }

  dontStore() {
    return true;
  }
}

type CacheOptions = {
  /**
   * The cache to use to cache feature values.
   * The default is to use LocalStorage on the client and not cache on the server
   * Set to null to explicitly disable caching
   */
  backingStore: BackingStore;

  /**
   * The maximum amount of time to cache feature values.
   * The default is to cache for the same duration as a session
   * Setting to zero will disable caching
   * Setting to a negative number will be ignored
   */
  outputExpirySeconds: number | undefined;

  /**
   * The duration of inactivity before the entire cache is flushed
   * The default is 30 minutes (1800 seconds)
   * This is typically set in your environment and compiled into this file
   * It is not recommended you set it here
   */
  sessionCacheExpirySeconds: number;

  /** useServerSentEvents: Use server side events to update features
   *  defaults to true for CSR, unless caching is disabled
   *
   *  setting to false will prevent push updates to feature outputs,
   *  in which case features will only update when the cache expires
   */
  useServerSentEvents: boolean;
};

class Cache {
  sessionArgs: SessionArgs | undefined;
  backingStore: BackingStore;
  outputExpirySeconds: number | undefined;
  useServerSentEvents: boolean;
  sessionCacheExpirySeconds: number;
  eventSource: EventSource | undefined;

  constructor(
    sessionArgs: SessionArgs | undefined,
    options: CacheOptions | undefined
  ) {
    if (options == undefined) {
      options = {
        backingStore: new NoOpStore(),
        outputExpirySeconds: undefined,
        useServerSentEvents: false,
        sessionCacheExpirySeconds: 0,
      };
    }

    const {
      backingStore,
      outputExpirySeconds,
      useServerSentEvents,
      sessionCacheExpirySeconds,
    } = options;

    this.backingStore = backingStore;
    this.outputExpirySeconds = outputExpirySeconds;
    this.useServerSentEvents = useServerSentEvents;
    this.sessionCacheExpirySeconds = sessionCacheExpirySeconds;
    this.sessionArgs = sessionArgs;

    if (sessionArgs == undefined) return;

    // register server side events
    this.eventSource = undefined;
    if (
      sessionArgs != undefined &&
      !misc.ssr &&
      !this.backingStore.dontStore() &&
      this.useServerSentEvents
    ) {
      if (!network.newEvtSource) log.error("unexpected undefined newEvtSource");
      else {
        const sseUrl = network.baseUrl.replace(
          /\/?$/,
          "/sse?deviceId=" + sessionArgs.deviceId
        );
        this.eventSource = network.newEvtSource(sseUrl);
        this.eventSource.addEventListener("flush", this.sseFlush.bind(this));
        this.eventSource.addEventListener("hello", this.sseHello.bind(this));
      }
    }
  }

  deleteAll(invalidateHooks: boolean): void {
    if (this.sessionArgs == undefined) return;

    for (const k of wireNames) this.backingStore.del(k);
    this.backingStore.del("_flags");
    this.backingStore.del("_cacheInfo");

    // forces react hooks to re-execute next time they are used
    if (invalidateHooks) _flushCount += 1;
  }

  /**
   * @returns false if the caller should short circuit
   */
  testAndTouchSession(): boolean {
    log.debug(5, "testAndTouchSession");
    if (this.backingStore.dontStore()) return false;

    const rawInfo = this.backingStore.get("_cacheInfo")?.value as
      | {
          sessionStart: string;
          lastAccess: string;
        }
      | undefined;

    const now = new Date();
    let sessionStart = now;
    let lastAccess = now;
    if (rawInfo) {
      sessionStart = new Date(rawInfo.sessionStart);
      lastAccess = new Date(rawInfo.lastAccess);
    }

    const cacheInfo = { sessionStart, lastAccess };

    const expires = addSeconds(
      cacheInfo.lastAccess,
      this.sessionCacheExpirySeconds
    );
    const invalid = isNaN(expires.valueOf());
    if (expires < now || invalid) {
      log.debug(1, "session expired");
      cacheInfo.sessionStart = now;
      cacheInfo.lastAccess = now;

      // should never happen, but be extra cautious to avoid render loop
      const invalidateHooks = !invalid;
      this.deleteAll(invalidateHooks);
    }

    cacheInfo.lastAccess = now;
    this.backingStore.set("_cacheInfo", "", cacheInfo, maxDate);
    return true;
  }

  getOutputExpiry() {
    if (this.outputExpirySeconds == undefined) return maxDate;
    return makeFutureDate(this.outputExpirySeconds);
  }

  getOutputIdentity(
    featureName: FeatureNames,
    wireArg: _WireArgs[keyof _WireArgs]
  ): string | undefined {
    if (featureName == undefined) {
      log.warn("unexpected undefined featureName");
      return;
    }

    if (wireArg == undefined) {
      log.warn("unexpected undefined wireArgs");
      return;
    }

    return JSON.stringify({
      n: featureName,
      a: wireArg,
    });
  }

  flags(): Flags<FeatureNames> | undefined {
    if (!this.testAndTouchSession()) return undefined;

    const store = this.backingStore.get("_flags");
    if (store == undefined) return undefined;

    const { value } = store;
    return value as Flags<FeatureNames>;
  }

  setFlags(flags: Flags<FeatureNames>) {
    if (!this.testAndTouchSession()) return;
    this.backingStore.set("_flags", "", flags, maxDate); // flags expire with session
  }

  outputs(wireArgs: _WireArgs): _WireOutputs | undefined {
    if (!this.testAndTouchSession()) return undefined;

    const flags = this.flags();
    const outputs: _WireOutputs = {};

    if (flags == undefined) return undefined;

    let allCached = true;
    for (const k of Object.keys(wireArgs) as (keyof _WireArgs)[]) {
      const featureName: FeatureNames = wireToFeatureName(k);
      if (flags[featureName] === false) continue;

      const output = this.backingStore.get(k);
      if (output == undefined) {
        allCached = false;
        break;
      }

      const identity = this.getOutputIdentity(featureName, wireArgs[k]);
      if (identity !== output.identity) {
        allCached = false;
        break;
      }

      try {
        // eslint-disable-next-line
        (outputs as any)[k] = output.value;
      } catch {
        allCached = false;
        break;
      }
    }
    if (allCached) {
      return outputs;
    }
    return undefined;
  }

  setOutputs(wireArgs: _WireArgs, wireOutputs: _WireOutputs) {
    if (!this.testAndTouchSession()) return;
    const nextExpiry = this.getOutputExpiry();

    for (const [k, v] of Object.entries(wireOutputs) as [
      keyof _WireOutputs,
      _WireOutputs[keyof _WireOutputs] | "off"
    ][]) {
      if (v == "off") this.backingStore.del(k);
      else {
        const wireArg = wireArgs[k];
        if (wireArg == undefined)
          log.debug(4, "ignoring excess output args - unit test?");
        else {
          const identity = this.getOutputIdentity(
            wireToFeatureName(k),
            wireArg
          );
          if (identity != undefined && !k.startsWith("_"))
            this.backingStore.set(k, identity, v, nextExpiry);
        }
      }
    }
  }

  //#region server sent events
  sseMaybeDel(name: string, createdBeforeDate: string | null) {
    if (this.backingStore.dontStore()) return;

    if (!createdBeforeDate) {
      this.backingStore.del(name);
      return;
    }

    try {
      const createdBefore = new Date(createdBeforeDate);
      const cur = this.backingStore.get(name);
      if (cur == undefined) return;
      if (cur.created < createdBefore) this.backingStore.del(name);
    } catch (e) {
      log.error(
        "unexpected error analyzing cache - deleting entry. error was " +
          JSON.stringify(e)
      );
      this.backingStore.del(name);
    }
  }

  sseFlush(evt: Event) {
    if (this.backingStore.dontStore()) return;

    const mevt: MessageEvent = evt as MessageEvent;
    _flushCount++;
    if (mevt.data == "_all") this.deleteAll(false);
    // hooks already invalidated
    else this.sseMaybeDel(mevt.data, null);
    this.backingStore.set("_cacheVersion", "", mevt.lastEventId, maxDate);
  }

  sseHello(evt: Event) {
    if (this.backingStore.dontStore()) return;
    const mevt: MessageEvent = evt as MessageEvent;
    const cacheVersion = this.backingStore.get("_cacheVersion");
    if (mevt.data != cacheVersion?.value) {
      this.deleteAll(true);
      this.backingStore.set("_cacheVersion", "", mevt.lastEventId, maxDate);
    }
  }
}

//#endregion

//#endregion

//#region initialization

function normalizeUrl(url: string) {
  if (url.endsWith("/")) return url;
  return url + "/";
}

let lastLoggedUrl = "";

function makeBaseUrl(ssr: boolean): string {
  let url = undefined;
  if (ssr) {
    url = process.env.CAUSAL_SSR_ISERVER;
    if (url == undefined) {
      log.error(
        "SSR impression server environment variable not set, defaulting to http://localhost:3004/iserver" +
          "Please set CAUSAL_SSR_ISERVER"
      );
      url = "http://localhost:3004/iserver/";
    }
  } else {
    url =
      process.env.NEXT_PUBLIC_CAUSAL_BROWSER_ISERVER ??
      process.env.VAGRANT_CAUSAL_BROWSER_ISERVER ??
      process.env.REACT_APP_CAUSAL_BROWSER_ISERVER ??
      process.env.CAUSAL_BROWSER_ISERVER;

    if (url == undefined) {
      log.error(
        "Browser impression server environment variable not set, defaulting to http://localhost:3004/iserver " +
          "Please set one of: NEXT_PUBLIC_CAUSAL_BROWSER_ISERVER, VAGRANT_CAUSAL_BROWSER_ISERVER, CAUSAL_BROWSER_ISERVER"
      );
      url = "http://localhost:3004/iserver/";
    }
  }

  url = normalizeUrl(url);

  if (misc.ssr && url != lastLoggedUrl) {
    // it's easy to see the url on the client, but a bit harder in SSR output
    log.log("impression server url: ", url);
    lastLoggedUrl = url;
  }
  return url;
}

/**
 * @internal
 * Do not use - only exported for testing
 */
type LogFn = (message: string, ...optionalParams: unknown[]) => void;

/**
 * @internal
 * Do not use - only exported for testing
 */
export type FetchUrl = string;

/**
 * @internal
 * Do not use - only exported for testing
 */
export type FetchRequestInit = { method: "GET" | "POST"; body: string };

/**
 * @internal
 * Do not use - only exported for testing
 */
export type FetchResponse = {
  status: number;
  text(): Promise<string>;
  json(): Promise<unknown>;
};

/**
 * Causal configuration options.
 */
export type CausalOptions = {
  /**
   * Set if this request is being rendered server side (SSR).
   * By default, SSR will be set true if the window object is undefined.
   */
  ssr?: boolean;

  /**
   * By default Causal will send all network requests to the value compiled into the generated API.
   * This default value comes from the url associated with the impression server for each environment.
   * You can also set it here - for example if you want to use a different URL on the client and server.
   */
  baseUrl?: string;

  /**
   * useServerSentEvents: Use server side events to update features
   * Defaults to true for CSR, unless caching is disabled
   * setting to false will prevent push updates to feature outputs,
   * in which case features will only update when the session expires
   */
  useServerSentEvents?: boolean;
};

/**
 * @internal
 * Do not use - only exported for testing
 */
export type CausalDebugOptions = {
  /**
   * Reset the cache?
   * Defaults to false
   * If true, will delete all backing store entries,
   *  create a new cache, and redo event source
   */
  reset?: boolean;

  /**
   * By default Causal use console.log to log information.
   * You can alter this behavior be providing a logging function.
   */
  log?: LogFn;

  /**
   * By default Causal use console.warn to log warnings.
   * You can alter this behavior be providing a logging function.
   */
  logWarning?: LogFn;

  /**
   * By default Causal use console.error to log errors.
   * You can alter this behavior be providing a logging function.
   */
  logError?: LogFn;

  /**
   * By default, when running in the browser, Causal uses Navigor.sendBeacons to send non synchronous data.
   * By default, when running in node, Causal uses fetch.
   * You can alter this behavior by setting this function
   */
  sendBeacon?: (data: unknown) => void;

  /**
   * By default, Causal uses cross-fetch to fetch
   * You can alter this behavior by setting this function
   */
  fetch?: (url: string, init?: FetchRequestInit) => Promise<FetchResponse>;

  /**
   * By default, Causal uses new EventSource to create an EvtSource
   * You can alter this behavior by setting this function
   */
  newEvtSource?: (url: string) => EventSource;

  /**
   * By default when a non SSR CausalClient is created it will immediately
   * make an asynchronous request for feature flags (which might be filled from cache)
   *
   * You can alter this behavior with this method, although it's generally not recommended
   */
  immediatelyRequestFlags?: boolean;

  logDebug?: (
    level: number,
    message: string,
    ...optionalParams: unknown[]
  ) => void;

  debugLogLevel?: number;
  cacheOptions?: Partial<Omit<CacheOptions, "useServerSentEvents">>;
};

const defaultLog: {
  log: LogFn;
  warn: LogFn;
  error: LogFn;
  debug: (level: number, message: string, ...optionalParams: unknown[]) => void;
  debugLogLevel: number;
} = {
  debugLogLevel: 0,
  log: (...args) => {
    console.log(...args);
  },
  warn: (...args) => {
    console.warn(...args);
  },
  error: (...args) => {
    console.error(...args);
  },
  debug: (level: number, message: string, ...optionalParams: unknown[]) => {
    if (level <= log.debugLogLevel) console.log(message, ...optionalParams);
  },
};
let log = defaultLog;

const defaultSSR = typeof window == "undefined";
let defaultMisc = {
  ssr: defaultSSR,
  immediatelyRequestFlags: !defaultSSR,
};
let misc = defaultMisc;

const defaultCacheOptions: CacheOptions = {
  backingStore: defaultSSR ? new NoOpStore() : new LocalStorageStore(),
  outputExpirySeconds: undefined,
  useServerSentEvents: true,
  sessionCacheExpirySeconds: 60 * 30,
};

let defaultNetwork = {
  sendBeacon: (data: unknown) => {
    if (typeof navigator == "undefined") {
      // we are running server side
      log.debug(2, "defaultSendBeacon as fetch");
      network.fetch(network.baseUrl + "signal", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } else {
      log.debug(2, "defaultSendBeacon as beacon");
      navigator.sendBeacon(network.baseUrl + "signal", JSON.stringify(data));
    }
  },
  fetch: (url: FetchUrl, init?: FetchRequestInit): Promise<FetchResponse> => {
    log.debug(2, "defaultFetch");
    return fetch(url, init);
  },
  newEvtSource:
    typeof EventSource == "undefined"
      ? undefined
      : (url: string) => {
          return new EventSource(url);
        },
  baseUrl: makeBaseUrl(defaultSSR),
};
let network = defaultNetwork;

let session: undefined | { args: SessionArgs };

// simpler to have a no-op cache then check for undefined everywhere
let _cache: Cache = new Cache(undefined, undefined);

/**
 * A method to setup Causal for each request.
 *
 * Make sure to call `initRequest` in a context that will get executed on each request. If you execute it in a global context and are doing server side rendering, it will only get initialized once and it will not be able to distinguish between different sessions.
 *
 * It is safe to call `initCasual` multiple times. A good place to call `initRequest` is in a high level/root component like an App component or a always called data fetching function like getServerSideProps.
 *
 * @param sessionArgs The session args for this request. This includes deviceId as well as any other session args that were defined in the FDL file.
 * @param options Configurable options.
 */
export function initRequest(
  sessionArgs: SessionArgs,
  options?: CausalOptions,
  /** @internal */
  debugOptions?: CausalDebugOptions
) {
  if (!sessionArgs) {
    log.error("Fatal: Session was undefined or null");
    return;
  }

  if (!sessionArgs.deviceId) {
    log.error("Fatal: device id was null");
    return;
  }

  network.baseUrl = options?.baseUrl
    ? normalizeUrl(options?.baseUrl)
    : defaultNetwork.baseUrl;
  misc.ssr = options?.ssr ?? defaultSSR;

  const changed =
    session == undefined ||
    JSON.stringify(session.args) != JSON.stringify(sessionArgs);
  if (!changed && !debugOptions?.reset) return;

  // re-initialize everything if the session object changes or
  // or if we are being told to do so

  if (
    debugOptions?.cacheOptions?.backingStore &&
    debugOptions.cacheOptions?.outputExpirySeconds === 0
  ) {
    log.warn("backing store set, but outputExpirySeconds is 0. Not caching");
  }

  session = { args: sessionArgs };

  // not using any type of {...one, ...two} constructs because
  // that will asssign explicitly undefined values
  log = {
    log: debugOptions?.log ?? defaultLog.log,
    warn: debugOptions?.logWarning ?? defaultLog.warn,
    error: debugOptions?.logError ?? defaultLog.error,
    debug: debugOptions?.logDebug ?? defaultLog.debug,
    debugLogLevel: debugOptions?.debugLogLevel ?? defaultLog.debugLogLevel,
  };

  network = {
    baseUrl: options?.baseUrl
      ? normalizeUrl(options.baseUrl)
      : defaultNetwork.baseUrl,
    fetch: debugOptions?.fetch ?? defaultNetwork.fetch,
    sendBeacon: debugOptions?.sendBeacon ?? defaultNetwork.sendBeacon,
    newEvtSource: debugOptions?.newEvtSource ?? defaultNetwork.newEvtSource,
  };

  const ssr = options?.ssr ?? defaultSSR;
  misc = {
    ssr,
    immediatelyRequestFlags: debugOptions?.immediatelyRequestFlags ?? !ssr,
  };

  const debugCO = debugOptions?.cacheOptions;
  const cacheOptions: CacheOptions = {
    backingStore:
      debugCO?.backingStore ??
      (ssr ? new NoOpStore() : defaultCacheOptions.backingStore),
    outputExpirySeconds:
      debugCO?.outputExpirySeconds ?? defaultCacheOptions.outputExpirySeconds,
    sessionCacheExpirySeconds:
      debugCO?.sessionCacheExpirySeconds ??
      defaultCacheOptions.sessionCacheExpirySeconds,
    useServerSentEvents:
      options?.useServerSentEvents ?? defaultCacheOptions.useServerSentEvents,
  };

  if (_cache) _cache?.deleteAll(true);
  _cache = new Cache(sessionArgs, cacheOptions);

  if (misc.immediatelyRequestFlags) requestFlagsOnInit();
}

//#endregion

//#region impressions + flags

const notIntializedStatus = -1;
const fetchFailureStatus = -2;

/**
 * This is a utility type so autocomplete works better.
 * I.e. `type MyFeatures = SelectFeatures<"this_will_autocomplete">`.
 * If it is not autocompleting, try typing a quote (') or double quote (").
 */
export type SelectFeatures<T extends FeatureNames> = T;

/**
 * Convert wire formated flags to typescript naming conventions
 * @param wireFlags
 * @returns
 */
function wireToFlags(
  wireFlags: _WireFlags | undefined
): Flags<FeatureNames> | undefined {
  if (wireFlags == undefined) return undefined;

  const flags: Flags<FeatureNames> = {} as Flags<FeatureNames>;
  for (const [wireName, value] of Object.entries(wireFlags) as [
    keyof _WireFlags,
    _WireFlags[keyof _WireFlags]
  ][]) {
    const flagName = wireToFeatureName(wireName);
    flags[flagName] = value;
  }
  return flags;
}

/**
 * Create a query to use with [[requestImpression]] or [[useImpression]] using the builder pattern.
 *
 * @return Query to use with [[requestImpression]] or [[useImpression]].
 */
export function queryBuilder(): Query<never> {
  return new Query();
}

/**
 * JSON format for an impression.
 * This can be safely serialized to JSON with functions like `JSON.stringify()`.
 * Use the function [[toImpresion]] to convert back to an impression.
 *
 * @typeparam T Type information for the impression. Use the same type when converting back to an impression with [[toImpresion]].
 */
export type ImpressionJSON<T extends FeatureNames> = {
  /** @internal */
  t?: T; // unused - suppresses T is unused error

  /** @internal */
  maybeEmpty: boolean;

  /** @internal */
  deviceId: string;

  /** @internal */
  wireArgs: _WireArgs;

  /** @internal */
  wireOutputs: _WireOutputs;
};

function loadingImpression<T extends FeatureNames>({
  deviceId,
}: Pick<ImpressionJSON<T>, "deviceId">): Impression<T> {
  const impression = new ImpressionImpl({
    maybeEmpty: true,
    deviceId,
    wireArgs: {},
    wireOutputs: {} as _WireOutputs,
  });
  return impression as unknown as Impression<T>;
}

function errorImpression<T extends FeatureNames>({
  deviceId,
  wireArgs: args,
}: Pick<ImpressionJSON<T>, "deviceId" | "wireArgs">): Impression<T> {
  const impression = new ImpressionImpl({
    maybeEmpty: true,
    deviceId,
    wireArgs: args,
    wireOutputs: {} as _WireOutputs,
  });
  return impression as unknown as Impression<T>;
}

function notInitalizedImpression<T extends FeatureNames>(): Impression<T> {
  return errorImpression({
    deviceId: "notInitalized",
    wireArgs: {},
  });
}

/**
 * Convert a [[ImpressionJSON]] back to an impression.
 */
export function toImpression<T extends FeatureNames>({
  maybeEmpty,
  deviceId,
  wireArgs,
  wireOutputs: outputs,
}: ImpressionJSON<T>): Impression<T> {
  const impression = new ImpressionImpl({
    maybeEmpty,
    deviceId,
    wireArgs,
    wireOutputs: outputs as _WireOutputs,
  });
  return impression as unknown as Impression<T>;
}

type IServerResponse = _WireOutputs & {
  _flags: _WireFlags;
};

// Currently only one kind of fetch option now, do we want to get the complete set of flags
type FetchOptions = "flags";

function requestFlagsOnInit() {
  if (!misc.immediatelyRequestFlags || _cache.backingStore.dontStore()) {
    log.warn("ignoring unexpected call to requestFlagsOnInit");
  }
  requestFlags()
    .then(
      () => {
        undefined;
      },
      () => {
        log.error("request flags failed");
      }
    )
    .catch(() => {
      log.error("request flags failed with exception");
    });
}

/**
 * Async function to get the on/off flags associated with a feature.
 *
 * @returns A promise that will resolve with the current set of feature flags.
 * On an error, it will return the default flags and an additional informational error value.
 *
 * Please note - The return value is strongly typed. A TypDoc documentation generation bug shows it as an Object here. It returns the same values as [[useFlags]].
 */
export async function requestFlags(): Promise<{
  flags: Flags<FeatureNames>;
  error?: CausalError;
}> {
  if (session == undefined) {
    log.error(notInitializedMsg);
    return { flags: defaultFlags, error: notInitializedError };
  }

  const cachedFlags = _cache.flags();
  if (cachedFlags != undefined) return { flags: cachedFlags };

  const { flags: responseFlags, error } = await iserverFetch({
    sessionArgs: session.args,
    options: ["flags"],
  });

  if (!error) {
    if (responseFlags == undefined)
      log.error("no error requesting flags, but no responseFlags");
    else {
      _cache.setFlags(responseFlags);
    }
  }

  // cache.flags() is very likely to be undefined, but on the off
  // chance a different request completed, including here
  return { flags: responseFlags ?? _cache.flags() ?? defaultFlags, error };
}

/**
 * Make the actual network call to the impression server to get feature and flag information
 *
 * @param impressionId
 * @param wireArgs
 * @param getFlags
 * @returns
 */
async function iserverFetch({
  options,
  impressionId,
  sessionArgs,
  wireArgs,
}: {
  options: readonly FetchOptions[];
  impressionId?: string;
  sessionArgs: SessionArgs;
  wireArgs?: _WireArgs;
}): Promise<{
  impression?: ImpressionImpl;
  flags?: Flags<FeatureNames>;
  error?: CausalError;
}> {
  const fetchOptions = [...options];
  try {
    let result: FetchResponse | undefined = undefined;
    let fetchExceptionError = "";
    try {
      const body: {
        fetchOptions: FetchOptions[] | undefined;
        args: SessionArgs;
        requests: _WireArgs | undefined;
        impressionId: string | undefined;
      } = {
        fetchOptions,
        args: sessionArgs,
        requests: wireArgs,
        impressionId,
      };
      result = await network.fetch(network.baseUrl + "features", {
        method: "POST",
        body: JSON.stringify(body),
      });
    } catch (e) {
      if ((e as Error).message) fetchExceptionError = (e as Error).message;
      else fetchExceptionError = "unknown exception calling fetch";
    }
    if (result === undefined || result.status != 200) {
      const error = {
        status: result?.status || -1,
        message: (await result?.text()) || fetchExceptionError,
      };
      const errMsg = "Impression server error: " + JSON.stringify(error);
      log.error(errMsg);

      return {
        impression: undefined,
        flags: undefined,
        error,
      };
    }
    const response: IServerResponse = (await result.json()) as IServerResponse;

    const { _flags: responseFlags, ...wireOutputs } = response;

    if (log.debugLogLevel >= 3) {
      log.debug(4, "fetch outputs:", wireOutputs);
    }

    const impression = wireArgs
      ? new ImpressionImpl({
          maybeEmpty: false,
          deviceId: sessionArgs.deviceId,
          wireArgs: wireArgs,
          wireOutputs,
        })
      : undefined;

    let returnFlags = wireToFlags(responseFlags);
    if (fetchOptions?.includes("flags") && responseFlags == undefined) {
      log.error("unexpected empty response flags");
      returnFlags = returnFlags ?? defaultFlags;
    }

    return {
      impression,
      flags: returnFlags,
      error: undefined,
    };
  } catch (e) {
    const errMsg = "unexpected error in network.fetch";
    log.error(errMsg, e);

    return {
      impression: undefined,
      flags: undefined,
      error: { status: fetchFailureStatus, message: errMsg },
    };
  }
}

function sendImpressionBeacon<T extends FeatureNames>(
  impression: Impression<T>,
  impressionId?: string
) {
  const outputs = impression.toJSON().wireOutputs as _WireOutputs;
  const impressionIdMap: {
    [idx: string]: { impression: string; newImpression: string | undefined };
  } = {};
  Object.entries(outputs).forEach(([k, v]) => {
    impressionIdMap[k] = {
      impression: v?._impressionId as string, // older versions of TS need this cast
      newImpression: impressionId,
    };
  });

  network.sendBeacon({
    deviceId: impression.deviceId,
    impressions: impressionIdMap,
  });
}

function getCachedImpression<T extends FeatureNames>(
  sessionArgs: SessionArgs,
  wireArgs: _WireArgs
): { cachedImpression?: Impression<T>; cachedFlags?: Flags<FeatureNames> } {
  const cachedFlags = _cache.flags();
  if (cachedFlags == undefined) return {};

  const cachedOutputs = _cache.outputs(wireArgs);
  if (cachedOutputs == undefined) return {};

  return {
    cachedImpression: toImpression({
      maybeEmpty: false,
      wireArgs: wireArgs,
      deviceId: sessionArgs.deviceId,
      wireOutputs: cachedOutputs,
    }),
    cachedFlags,
  };
}

/**
 * Async function to get the impression and on/off flags associated with a feature.
 *
 * @returns A promise that will resolve with the impression and the current set of feature flags.
 * On an error, it will return the default values for the impression and flags, as well as an additional informational error value.
 * Please note - The return value is strongly typed. A TypeDoc documentation generation bug shows it as an Object here. It returns the same values as [[useImpression]].
 *
 * @typeparam Type information for the request and returned impression. Typically inferred from the query.
 * @param query Features to request and their arguments.
 * @param impressionId The impression id.
 *
 */
export async function requestImpression<T extends FeatureNames>(
  query: Query<T>,
  impressionId?: string
): Promise<{
  impression: Impression<T>;
  flags: Flags<T>;
  error?: CausalError;
}> {
  if (session == undefined) {
    log.error(notInitializedMsg);
    return {
      impression: notInitalizedImpression(),
      flags: defaultFlags as Flags<T>,
      error: notInitializedError,
    };
  }

  const { cachedImpression, cachedFlags } = getCachedImpression<T>(
    session.args,
    query._wireArgs
  );

  if (cachedImpression != undefined && cachedFlags != undefined) {
    sendImpressionBeacon(cachedImpression, impressionId);
    return {
      impression: cachedImpression,
      flags: cachedFlags as Flags<T>, // cast needed for older version of TS
    };
  }

  const fetchOptions: FetchOptions[] = [];
  if (cachedFlags == undefined) fetchOptions.push("flags");

  const {
    impression,
    flags: responseFlags,
    error,
  } = await iserverFetch({
    options: fetchOptions,
    impressionId,
    sessionArgs: session.args,
    wireArgs: query._wireArgs,
  });

  if (
    cachedFlags == undefined &&
    responseFlags == undefined &&
    error == undefined
  ) {
    log.error("unexpected undefined flags in requestImpression");
  }

  if (responseFlags) _cache.setFlags(responseFlags);
  const returnFlags = cachedFlags ?? responseFlags ?? defaultFlags;

  if (impression) {
    _cache.setOutputs(query._wireArgs, impression.toJSON().wireOutputs);
    return {
      impression: impression as unknown as Impression<T>,
      flags: returnFlags as Flags<T>, // cast needed for older version of TS
      error,
    };
  } else {
    return {
      impression: errorImpression({
        deviceId: session.args.deviceId,
        wireArgs: query._wireArgs,
      }),
      flags: returnFlags as Flags<T>, // cast needed for older version of TS
      error: error ?? {
        message: "unknown error",
        status: -1,
      },
    };
  }
}

/**
 * Causal error type.
 */
export type CausalError = {
  /**
   * The status code associated with the error
   */
  status: number;

  /**
   * The message associated with the error
   */
  message: string;
};

type FlagsNone = { state: "none" };
type FlagsFatal<T extends FeatureNames> = { state: "fatal"; flags: Flags<T> };
type FlagsLoading = { state: "loading" };
type FlagsDone<T extends FeatureNames> = { state: "done"; flags: Flags<T> };

type FlagsState<T extends FeatureNames> =
  | FlagsNone
  | FlagsFatal<T>
  | FlagsLoading
  | FlagsDone<T>;

/**
 * React hook to get the on/off flags associated with a feature
 */
export function useFlags(): {
  loading: boolean;
  flags: Flags<FeatureNames> | undefined;
  error: CausalError | undefined;
} {
  const _session = session;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const errorState = useRef<CausalError>();
  const flagsState = useRef<FlagsState<FeatureNames>>({ state: "none" });
  const prevSession = useRef(session);
  const prevFlushCount = useRef(_flushCount);
  let hasChange = false;

  // re-request if cache is busted or if the session changes

  if (prevSession.current != session || prevFlushCount.current != _flushCount) {
    // not using useEffect / dependency array for this b/c want
    // this code to reset the state in the same render cycle,
    // the rest of the non effect code in the hook can further update it
    hasChange = true;
    flagsState.current = { state: "none" };

    // update prev's
    prevSession.current = session;
    prevFlushCount.current = _flushCount;
  }

  if (_session == undefined) {
    // no session is fatal

    if (flagsState.current.state != "fatal") {
      hasChange = true;
      flagsState.current = {
        state: "fatal",
        flags: defaultFlags as Flags<FeatureNames>,
      };
    }
    if (errorState.current != notInitializedError) {
      hasChange = true;
      errorState.current = notInitializedError;
    }
  } else {
    // get cached values
    const _cacheFlags = _cache.flags();
    if (flagsState.current.state == "none" && _cacheFlags != undefined) {
      hasChange = true;
      flagsState.current = {
        state: "done",
        flags: _cacheFlags,
      };
    }
  }

  // fetch results
  useEffect(() => {
    log.debug(1, "useFlags fetch results effect");
    if (!_session) return;

    async function request() {
      log.debug(1, "useFlags fetch results effect: request()");

      if (!_session) return;
      log.debug(1, "request");

      const { flags, error } = await requestFlags();
      flagsState.current = {
        state: "done",
        flags,
      };
      errorState.current = error;
      forceUpdate();
    }

    if (flagsState.current.state == "none") {
      flagsState.current = { state: "loading" };
      request();
      forceUpdate();
    }
  });

  // return current values
  const loading =
    flagsState.current.state == "none" || flagsState.current.state == "loading";

  log.debug(3, "useImpression returning. loading", loading);

  let flags: Flags<FeatureNames> | undefined = undefined;
  if (
    flagsState.current.state == "fatal" ||
    flagsState.current.state == "done"
  ) {
    flags = flagsState.current.flags;
  }

  if (hasChange) forceUpdate();

  return {
    loading,
    flags: flags,
    error: errorState.current,
  };
}

type ImpressionNone<T extends FeatureNames> = {
  state: "none";
  impression: Impression<T>;
};
type ImpressionFatal<T extends FeatureNames> = {
  state: "fatal";
  impression: Impression<T>;
};
type ImpressionCached<T extends FeatureNames> = {
  state: "cached";
  impression: Impression<T>;
};
type ImpressionLoading<T extends FeatureNames> = {
  state: "loading";
  impression: Impression<T>;
};
type ImpressionDone<T extends FeatureNames> = {
  state: "done";
  impression: Impression<T>;
};

type ImpressionState<T extends FeatureNames> =
  | ImpressionNone<T>
  | ImpressionFatal<T>
  | ImpressionCached<T>
  | ImpressionLoading<T>
  | ImpressionDone<T>;

/**
 * React hook to get both the impression and the on/off flags associated with a feature
 */
export function useImpression<T extends FeatureNames>(
  query: Query<T>,
  impressionId?: string
): {
  impression: Impression<T>;
  flags: Flags<T> | undefined;
  loading: boolean;
  error?: CausalError;
} {
  const _session = session;

  // putting into a ref so hook always returns the same loading impression when loading
  const _loadingImpression = useRef<Impression<T>>(
    loadingImpression({
      deviceId: _session?.args.deviceId ?? "unexpected-loading-impression-id",
    })
  );

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const errorState = useRef<CausalError>();
  const flagsState = useRef<FlagsState<T>>({ state: "none" });
  const impressionState = useRef<ImpressionState<T>>({
    state: "none",
    impression: _loadingImpression.current,
  });

  const requestFinishTS = useRef<Date>();
  const wireArgsJson = JSON.stringify(query._wireArgs);
  const prevSession = useRef(session);
  const prevWireArgsJson = useRef(wireArgsJson);
  const prevFlushCount = useRef(_flushCount);
  const prevImpressionId = useRef(impressionId);

  let hasChange = false;

  // re-request as frequently as the cache expires
  // or if cache is busted
  // or if the session changes
  // or if the query changes
  // of it the impression id changes
  let nextCycle: Date | undefined = undefined;
  const now = new Date();
  if (requestFinishTS.current != undefined && _cache.outputExpirySeconds)
    nextCycle = addSeconds(requestFinishTS.current, _cache.outputExpirySeconds);

  if (
    prevSession.current != session ||
    (nextCycle != undefined && nextCycle < now) ||
    prevWireArgsJson.current != wireArgsJson ||
    prevFlushCount.current != _flushCount ||
    prevImpressionId.current != impressionId
  ) {
    // not using useEffect / dependency array for this b/c want
    // this code to reset the state in the same render cycle,
    // the rest of the non effect code in the hook can further update it

    hasChange = true;

    // update impression state
    impressionState.current = {
      state: "none",
      impression: _loadingImpression.current,
    };

    // flag state  only need to be flushed on a sse event or session change
    if (prevFlushCount.current != _flushCount || prevSession.current != session)
      flagsState.current = { state: "none" };

    // update prev's
    requestFinishTS.current = undefined;
    prevSession.current = session;
    prevWireArgsJson.current = wireArgsJson;
    prevFlushCount.current = _flushCount;
    prevImpressionId.current = impressionId;
    _loadingImpression.current = loadingImpression({
      deviceId: _session?.args.deviceId ?? "unexpected-loading-impression-id",
    });
  }

  if (_session == undefined) {
    // no session is fatal

    if (impressionState.current.state != "fatal") {
      hasChange = true;
      impressionState.current = {
        state: "fatal",
        impression: errorImpression({
          deviceId: "nosession",
          wireArgs: query._wireArgs,
        }),
      };
    }
    if (flagsState.current.state != "fatal") {
      hasChange = true;
      flagsState.current = { state: "fatal", flags: defaultFlags as Flags<T> };
    }
    if (errorState.current != notInitializedError) {
      hasChange = true;
      errorState.current = notInitializedError;
    }
  } else {
    // get cached values
    if (
      impressionState.current.state == "none" ||
      flagsState.current.state == "none"
    ) {
      const { cachedImpression, cachedFlags } = getCachedImpression<T>(
        _session.args,
        query._wireArgs
      );

      if (
        cachedImpression != undefined &&
        impressionState.current.state == "none"
      ) {
        hasChange = true;
        impressionState.current = {
          state: "cached",
          impression: cachedImpression,
        };
      }

      if (cachedFlags != undefined && flagsState.current.state == "none") {
        hasChange = true;
        flagsState.current = {
          state: "done",
          flags: cachedFlags as Flags<T>,
        };
      }
    }
  }

  // fetch results
  useEffect(() => {
    log.debug(1, "useImpression fetch results effect");
    if (!_session) return;

    async function request() {
      log.debug(1, "useImpression fetch results effect: request()");

      if (!_session) return;
      log.debug(1, "request");

      const { impression, flags, error } = await requestImpression(
        query,
        impressionId
      );
      requestFinishTS.current = new Date();
      impressionState.current = {
        state: "done",
        impression,
      };
      flagsState.current = {
        state: "done",
        flags,
      };
      errorState.current = error;
      forceUpdate();
    }

    if (
      impressionState.current.state == "none" ||
      flagsState.current.state == "none"
    ) {
      if (impressionState.current.state == "none")
        impressionState.current = {
          state: "loading",
          impression: _loadingImpression.current,
        };
      if (flagsState.current.state == "none")
        flagsState.current = { state: "loading" };
      request();
      forceUpdate();
    }
  });

  // send beacons for cached impressions
  useEffect(() => {
    log.debug(1, "useImpression useEffect: cached");
    if (impressionState.current.state == "cached") {
      sendImpressionBeacon(impressionState.current.impression, impressionId);
      impressionState.current = {
        state: "done",
        impression: impressionState.current.impression,
      };
    }
  });

  // return current values
  const loading =
    impressionState.current.state == "none" ||
    impressionState.current.state == "loading" ||
    flagsState.current.state == "none" ||
    flagsState.current.state == "loading";

  log.debug(3, "useImpression returning. loading", loading);

  let flags: Flags<T> | undefined = undefined;
  if (
    flagsState.current.state == "fatal" ||
    flagsState.current.state == "done"
  ) {
    flags = flagsState.current.flags;
  }

  if (hasChange) forceUpdate();

  return {
    loading,
    impression: impressionState.current.impression,
    flags: flags,
    error: errorState.current,
  };
}

//#endregion

//#region utility

const notInitializedMsg =
  "FATAL: session is not defined. Did you call CausalInit?";

const notInitializedError: CausalError = {
  status: notIntializedStatus,
  message: notInitializedMsg,
};

const maxDate = new Date(8640000000000000);

function makeFutureDate(secondsFromNow: number): Date {
  return new Date(Date.now() + secondsFromNow * 1000);
}

function addSeconds(date: Date, seconds: number): Date {
  return new Date(date.valueOf() + seconds * 1000);
}

function errorNever(n: never, message: string) {
  log.error(message, JSON.stringify(n));
}

/**
 * Register the deviceId as a QA device for the given user. Redirect to
 * the device page when complete. Display an error message on failure.
 */
export function RegisterDevice(props: { userId: string; deviceId: string }) {
  const [result, setResult] = useState<string>("Registering...");
  if (props.userId === undefined) return <div>Cannot register, no userId</div>;
  if (props.deviceId === undefined)
    return <div>Cannot register, no deviceId</div>;

  let userAgent = "unknown";
  if (typeof navigator.userAgent !== "undefined") {
    userAgent = navigator.userAgent;
  }
  async function handleResponse(response: FetchResponse) {
    if (response.status == 200) {
      const body = await response.text();
      window.location.href = body;
    } else {
      const body = await response.text();
      let message = "Failed to register device: code " + response.status;
      if (response.status == 400 || response.status == 500) {
        message += " message: " + body;
      }
      setResult(message);
    }
  }
  if (result === "Registering...") {
    network
      .fetch(network.baseUrl + "register", {
        method: "POST",
        body: JSON.stringify({
          userId: props.userId,
          deviceId: props.deviceId,
          userAgent: userAgent,
          url: window.location.href.split("?")[0],
        }),
      })
      .then(handleResponse);
  }
  return <div>{result}</div>;
}
//#endregion
