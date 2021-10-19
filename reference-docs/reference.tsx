// This is a FeatureDL automatically generated file. DO NOT DIRECTLY EDIT, your changes will not persist.
import nodeFetch from "node-fetch";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

///////////////////////////////////////////////////////////////////////////////
// Start Parameterized
///////////////////////////////////////////////////////////////////////////////


/** An example feature for reference documentation purposes
 *   */
interface ExampleFeature_outputs {
    readonly example_output: string;

    readonly _impressionId: string;
}

/** An example feature for reference documentation purposes
 *   */
export class ExampleFeature implements ExampleFeature_outputs {
    /** An example string argument
     *
     *  Default: null
     *   */
    readonly example_string: string;
    /** An example string output
     *
     *  Control: "Example"
     *   */
    readonly example_output: string;

    /** @internal */
    readonly impression: ImpressionImpl;

    /** @internal */
    readonly _impressionId: string;

    /** Example integer event   
    *  */
    signalrating( { example_event } 
        : {  example_event : number  } ) : void
    {
      ExampleFeature.signalrating( this.impression.deviceId, this._impressionId, { example_event: example_event, } );
    }
    /** Example integer event   
      *  */
    static signalrating( deviceId : string, impressionId : string,  { example_event } 
        : {  example_event : number  } ) : void
    {
        const data = { 
          feature: "ExampleFeature",
          event: "rating",
          impressionId: impressionId,
          deviceId: deviceId,
          args: {  example_event: example_event  }
        };
      _sendBeacon(data);
    }


   private constructor( 
       impression: ImpressionImpl, 
       args: NonNullable<FeatureQuery["ExampleFeature"]>, 
       outputs: ExampleFeature_outputs ) {
      this.impression = impression;
      this._impressionId = outputs._impressionId;
      this.example_string = args.example_string;
      if (outputs.example_output != undefined) {
          this.example_output = outputs.example_output;
      } else {
          this.example_output = "Example";
      }
   }

}
/** A second example feature for reference documentation purposes
 *   */
interface ExampleFeature2_outputs {
    readonly example_output: number;

    readonly _impressionId: string;
}

/** A second example feature for reference documentation purposes
 *   */
export class ExampleFeature2 implements ExampleFeature2_outputs {
    /** An example string argument
     *
     *  Default: null
     *   */
    readonly example_int: number;
    /** An example int output
     *
     *  Control: 1
     *   */
    readonly example_output: number;

    /** @internal */
    readonly impression: ImpressionImpl;

    /** @internal */
    readonly _impressionId: string;

    /** Example string event   
    *  */
    signalrating( { example_event } 
        : {  example_event : string  } ) : void
    {
      ExampleFeature2.signalrating( this.impression.deviceId, this._impressionId, { example_event: example_event, } );
    }
    /** Example string event   
      *  */
    static signalrating( deviceId : string, impressionId : string,  { example_event } 
        : {  example_event : string  } ) : void
    {
        const data = { 
          feature: "ExampleFeature2",
          event: "rating",
          impressionId: impressionId,
          deviceId: deviceId,
          args: {  example_event: example_event  }
        };
      _sendBeacon(data);
    }


   private constructor( 
       impression: ImpressionImpl, 
       args: NonNullable<FeatureQuery["ExampleFeature2"]>, 
       outputs: ExampleFeature2_outputs ) {
      this.impression = impression;
      this._impressionId = outputs._impressionId;
      this.example_int = args.example_int;
      if (outputs.example_output != undefined) {
          this.example_output = outputs.example_output;
      } else {
          this.example_output = 1;
      }
   }

}

type SessionArgs = {
   deviceId: string;
};

class ImpressionImpl implements Impression<FeatureNames> {
  readonly deviceId: string;
  readonly impressionJson: {
    args: SessionArgs;
    requests: FeatureQuery;
    outputs: FeatureOutputs;
  };

  toJSON() {
    return this.impressionJson;
  }

  constructor(impressionJson: ImpressionJSON<FeatureNames>) {
    this.impressionJson = impressionJson;
    const { args, requests, outputs } = impressionJson;
    this.deviceId = args.deviceId;
    for (const [feature, args] of Object.entries(requests)) {
      const output: FeatureNames = (outputs as any)[feature];
      (this as any)[feature] = new (allFeatures as any)[feature](
        this,
        args,
        output == undefined ? {} : output
      );
    }
  }
   ExampleFeature?: ExampleFeature 
   ExampleFeature2?: ExampleFeature2 

}

/** @internal */
export type QueryArgs<T extends FeatureNames> = 
    /** An example feature for reference documentation purposes
     *  */
    & ("ExampleFeature" extends T ?   
      { ExampleFeature : 
          {  example_string : string  } } : unknown ) 
    /** A second example feature for reference documentation purposes
     *  */
    & ("ExampleFeature2" extends T ?   
      { ExampleFeature2 : 
          {  example_int : number  } } : unknown ) 


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
* Features to query, along with their arguments
*
* A query is created by using either queryBuilder() or createQuery().
*
* A query is executed by calling either requestImpression() or useImpression().
*
*/
export class Query<T extends FeatureNames>{
    /** An example feature for reference documentation purposes
     *  */
    getExampleFeature( { example_string } 
      : {  example_string : string  } )
        : Query<T | "ExampleFeature"> {
        this.queries['ExampleFeature'] = { example_string: example_string, }
        return this
    }
    /** A second example feature for reference documentation purposes
     *  */
    getExampleFeature2( { example_int } 
      : {  example_int : number  } )
        : Query<T | "ExampleFeature2"> {
        this.queries['ExampleFeature2'] = { example_int: example_int, }
        return this
    }

    queries: FeatureQuery = {};
}

interface FeatureQuery {
    ExampleFeature?: { 
      example_string: string
       },
    ExampleFeature2?: { 
      example_int: number
       },
};

interface FeatureOutputs {
    ExampleFeature?: ExampleFeature_outputs;
    ExampleFeature2?: ExampleFeature2_outputs;
};

type FeatureNames = 
    |"ExampleFeature"
        |"ExampleFeature2"
    ;
 

export var allFeatures = {
    ExampleFeature,
    ExampleFeature2,
    };

type Outputs<T extends FeatureNames> =
    & ("ExampleFeature" extends T ? { ExampleFeature?:FeatureOutputs["ExampleFeature"] } : unknown)
    & ("ExampleFeature2" extends T ? { ExampleFeature2?:FeatureOutputs["ExampleFeature2"] } : unknown)

type Impression<T extends FeatureNames> =
    & ("ExampleFeature" extends T ? { ExampleFeature?:ExampleFeature } : unknown)
    & ("ExampleFeature2" extends T ? { ExampleFeature2?:ExampleFeature2 } : unknown)
    & SessionArgs 
    & { toJSON(): ImpressionJSON<T> }
    & {
    }

let _baseUrl = "http://localhost:3004/iserver"

/**
 * Set the baseUrl for all network requests
 *
 * By default Causal will send all network requests to the value compiled into the generated API.
 * This default value comes from the url associated with the impression server for each environment.
 *
 * The default baseUrl associated with the FDL that generated this documentation is http://localhost:3004/iserver
 *
 * @param baseUrl The base url to use.
 *
 */
export function setBaseUrl(baseUrl: string) {
  if (!baseUrl.endsWith("/")) baseUrl += "/";
  _baseUrl = baseUrl;
}

///////////////////////////////////////////////////////////////////////////////
// End Parameterized
///////////////////////////////////////////////////////////////////////////////

/**
 * The method and body for a Causal fetch request.
 *
 * This is a subset of fetch's RequestInit that Causal uses.
 * It is also compatible with node-fetch and other similar implementations.
 * You can swap in any popular pollyfill for fetch and it should work
 *
 */
export type FetchRequestInit = { method: "GET" | "POST"; body: string };

/**
 * The response for a Causal fetch request.
 *
 * This is a subset of fetch's Response that Causal uses.
 * It is also compatible with node-fetch and other similar implementations.
 * You can swap in any popular pollyfill for fetch and it should work
 */
export type FetchResponse = {
  status: number;
  text(): Promise<string>;
  json(): Promise<any>;
};

/**
 * A utility type so autocomplete works better.
 *
 * Try using a quote (') or double quote (") to trigger autocomplete
 *
 * type MyFeatures = SelectFeatures<"this_will_autocomplete" | "so_will_this">;
 *
 * */
export type SelectFeatures<T extends FeatureNames> = T;

// TODO
function getEvtSourceUrl(): string | null {
  return null;
}

if (!_baseUrl.endsWith("/")) _baseUrl += "/";

/**
 * Uses the builder pattern to create a query.
 *
 * Chain multiple features together, passing in the args for each feature.
 * @returns A query to be used with useImpression or requestImpression.
 *
 * Example: queryBuilder().getExampleFeature({example_string:"ex1"})
 *         .getExampleFeature2({example_int:42});
 *
 */
export function queryBuilder(): Query<never> {
  return new Query();
}

/**
 *
 * The default function for fire and forget data
 *
 * By default Causal uses the browser navigator functionality to send beacons.
 * If running server side it falls back to fetch.
 *
 * The function to use can be changed by setSendBeacon.
 *
 * @param data The data to send
 */
export function defaultSendBeacon(data: unknown) {
  if (typeof navigator == "undefined") {
    // we are running server side
    _fetch(_baseUrl + "signal", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } else {
    navigator.sendBeacon(_baseUrl + "signal", JSON.stringify(data));
  }
}

let _sendBeacon = defaultSendBeacon;

/**
 * Change the function for sending fire and forget data.
 *
 * By default Casual uses defaultSendBeacon.
 *
 * @param sendBeacon The function to use for sending fire and forget data
 */
export function setSendBeacon(sendBeacon: (data: unknown) => void) {
  _sendBeacon = sendBeacon;
}

/**
 *
 * The default function for fetch requests.
 *
 * By default Causal imports node-fetch to make network requests.
 * This can altered through a compiler option or through setFetch.
 *
 * @param data The data to send
 */

export async function defaultFetch(
  url: string,
  init?: FetchRequestInit
): Promise<FetchResponse> {
  return nodeFetch(url, init);
}

let _fetch = defaultFetch;

/**
 * Change the function for fetching data.
 *
 * By default Casual uses defaultFetch.
 *
 * @param fetch The function to use for fetching.
 */
export function setFetch(
  fetch: (url: string, init?: FetchRequestInit) => Promise<FetchResponse>
) {
  _fetch = fetch;
}

let _onWarn = console.log;

/**
 * Change the function used to report warnings.
 *
 * By default, Causal will report warnings using console.warn(). This can be configured using this function.
 *
 * @param onWarn The function to use for reporting warnings
 */
export function setOnWarn(onWarn: (msg: string) => void) {
  _onWarn = onWarn;
}

let _onError = console.error;
/**
 * Change the function used to report errors.
 *
 * By default, Causal will report errors using console.errors(). This can be configured using this function.
 *
 * @param onError The function to use for reporting errors
 */
export function setOnError(onError: (msg: string) => void) {
  _onError = onError;
}

function errorNever(_: never, message: string) {
  _onError(message);
}

/**
 *
 * React function component to register the deviceId as a QA device for the given user.
 *
 * Redirect to the device page when complete. Display an error message on failure.
 *
 * @param userId The user id
 * @param deviceId The device id. This should be the same device id that is passed to CausalClient
 *
 */
export function RegisterDevice(props: { userId: string; deviceId: string }) {
  // ssr
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
    _fetch(_baseUrl + "register", {
      method: "POST",
      body: JSON.stringify({
        userId: props.userId,
        deviceId: props.deviceId,
        userAgent: userAgent,
        url: window.location.href.split("?")[0],
      }),
    }).then(handleResponse);
  }
  return <div>{result}</div>;
}

let _flushCount = 0;

/** 
 * @internal
 * Caching interface for features
 * 
 * On the browser, the API will cache features into local storage for the duration of a session. 
 * This is the cache interface for doing so. 
 * Using this is unusual and not recommended
 */
export type ValueCache = {
  /**
   * Get a cached feature.
   *
   * @param key The feature name to lookup
   *
   * @returns feature information or undefined if not found. See CacheItem for more details
   */
  get(
    key: string
  ): undefined | { identity: string; value: unknown; created: Date };

  /**
   * Set a cached feature.
   *
   * @param key The feature name.
   * @param identity The query parameters for the feature request (stringified JSON)
   * @param value The feature values to cache
   * @param expiresTS When the value should expire
   */
  set(key: string, identity: string, value: unknown, expiresTS: Date): void;

  /**
   * Delete a cached feature.
   * @param key the feature name to delete the cache for
   */
  del(key: string): void;
};

/**
 * @internal
 * Cached feature information
 *
 * On the browser, the API will cache features into local storage for the duration of a session. 
 * This is the cache item interface for doing so. 
 * Using this is unusual and not recommended
 *
 */
export type CacheItem = {
  /**
   * The item creation datetime
   */
  created: string;
  /**
   * The item expiry datetime
   */
  expires: string;
  /**
   * The query parameters associated with the feature request (stringified JSON)
   */
  identity: string;
  /**
   * The cached feature response
   */
  value: unknown;
};

class LocalStorageCache implements ValueCache {
  get(
    key: string
  ): undefined | { identity: string; value: unknown; created: Date } {
    const raw = window.localStorage.getItem(key);
    if (!raw) return undefined;
    try {
      const { identity, value, created, expires }: CacheItem = JSON.parse(raw);

      const now = new Date();

      // TODO: The server should probably send the created date over the wire
      // As is, flushing could be inaccurate due to network latency
      const createdTS = new Date(created);
      const expiresTS = new Date(expires);

      if (expiresTS < now) {
        window.localStorage.removeItem(key);
        return undefined;
      }

      return { identity, value, created: createdTS };
    } catch (e) {
      _onError(
        "failed to deserialize from cache. Error = " + JSON.stringify(e)
      );
      window.localStorage.removeItem(key);
      return undefined;
    }
  }

  set(key: string, identity: string, value: string, expiresTS: Date) {
    const createdString = new Date().toISOString();
    const expiresString = expiresTS.toISOString();
    const toStore: CacheItem = {
      created: createdString,
      expires: expiresString,
      identity,
      value,
    };
    return window.localStorage.setItem(key, JSON.stringify(toStore));
  }
  del(key: string) {
    return window.localStorage.removeItem(key);
  }
}

class NoOpCache implements ValueCache {
  get(): undefined {
    return undefined;
  }
  set() {}

  del() {}
}

/**
 * JSON serializable version of an impression.
 */
export type ImpressionJSON<T extends FeatureNames> = {
  /** @internal */
  args: SessionArgs;
  /** @internal */
  requests: FeatureQuery;
  /** @internal */
  outputs: Outputs<T>;
};

/**
 * Convert a JSON serializable version of an impression to a full impression.
 * @param json The JSON serializable version of an impression
 * @returns The impression
 */
export function toImpression<T extends FeatureNames>({
  args,
  requests,
  outputs,
}: ImpressionJSON<T>): Impression<T> {
  const impression = new ImpressionImpl({
    args,
    requests,
    outputs: outputs as FeatureOutputs,
  });
  return impression as unknown as Impression<T>; // cast needed for older version of typescript
}

/**
 * Options for created CausalClient.
 */
export type CausalClientOptions = {
  /**
   * cache: The cache to use to cache feature values.
   *
   * On the browser, the API will cache features into local storage for the duration of a session.
   * This setting overrides the backing cache to use. Changing this setting is very unusual and not recommended.
   * Setting it to null will disable caching
   */
  cache?: ValueCache | null;

  /**
   * maxCacheSeconds: The maximum amount of time to cache feature values.
   *
   * This setting overrides the duration of caching. Caching will be the minimum of this value and the session duration.
   * Setting to zero will disable caching
   * Setting to a negative number will be ignored
   */
  cacheDurationSeconds?: number;

  /**
   * renderMinFetchDebounceSeconds: The minimum amount of time between duplicate fetches by useImpression()
   *
   * The useImpression React hook will not refetch identical requests for this amount of time.
   * It will not request them from the impression server, nor will it will not send updated impression information to the impression server.
   * This is because React can call the render function many times, and not every render should be considered a new impression
   *
   * You can alter this debouncing behavior in two ways:
   *   1. Change the duration of the debounce by setting this value.
   *   2. Better yet, manually pass in impression ids. useImpression will not debounce requests with different impression ids.
   *      The caller of useImpression is in a position to know what is actually a new impression.
   *
   *
   * The default value is 30
   * A value of 0 or lower means never do a duplicate fetch
   * Duplicate fetches are fetches where the input args are identical
   * CAUTION: Low values can cause render "loops" if a refetch is triggered before render completes (thus triggering another render and another refetch and...)
   *
   * The actual debounce interval is the maximum of this and cacheDurationSeconds
   *
   * For finer grained control, the best approach is to disable (set to 0) and generate your own unique impression ids whenever you want to refetch
   */
  renderMinFetchDebounceSeconds?: number;

  /**
   *  Use server side events to update features
   *  Defaults to true for client side rendering unless the valueCache is set to null.
   *  Not applicable to server side rendering
   *
   *  setting to false will prevent push updates to feature values, in which case features
   *  will only update when the value cache expires, or if you have set valueCache to null
   */
  useServerSentEvents?: boolean;

  /** The device from which this client is connecting */
  deviceId: string;
};

/**
 * CausalClient class is the primary interface to Casual.
 *
 * To create a CausalClient pass in a CausalClientOptions object.
 * The deviceId and any other SessionArgs are required.
 * Several optional settings can also be configured.
 */
export class CausalClient {
  /** @internal */
  readonly cache: ValueCache;
  /** @internal */
  readonly cacheDurationSeconds: number;
  /** @internal */
  readonly renderMinFetchDebounceSeconds: number;
  /** @internal */
  readonly deviceId: string;

  constructor({
    cache: _cache,
    cacheDurationSeconds: _cacheDurationSeconds,
    renderMinFetchDebounceSeconds: _renderMinFetchDebounceSeconds,
    useServerSentEvents: _useServerSentEvents,
    deviceId: _deviceId,
  }: CausalClientOptions) {
    const ssr = typeof window == "undefined";

    if (!_deviceId)
      _onError(
        "device id was null, undefined or the empty string. Generating random id"
      );

    this.deviceId = _deviceId ? _deviceId : "gen_" + generateId();

    if (_cache && _cacheDurationSeconds === 0)
      _onWarn("Cache set, but cacheDuration is 0. Not caching");

    if (_cache === null && _cacheDurationSeconds && _cacheDurationSeconds > 0)
      _onWarn("Cache set to null, but cacheDuration is > 0. Not caching");

    this.cache = _cache ?? new NoOpCache();
    if (_cacheDurationSeconds == 0) this.cache = new NoOpCache();
    else if (!ssr && _cache === undefined) this.cache = new LocalStorageCache();

    this.cacheDurationSeconds = 600;
    if (_cacheDurationSeconds !== null && _cacheDurationSeconds !== undefined) {
      this.cacheDurationSeconds = _cacheDurationSeconds;
    }

    this.renderMinFetchDebounceSeconds = _renderMinFetchDebounceSeconds ?? 30;

    const useSSE = !ssr && _useServerSentEvents !== false && _cache !== null;

    if (useSSE) {
      interface EvtFlush {
        action: "flush";

        /**
         * features: f=feature, dt=flush featured created before date/time (iso format). null => unconditional flush
         */
        payload: { f: string; cb: string | null }[];
      }

      type ServerSentEvt = EvtFlush;

      const maybeDel = (name: string, createdBeforeDate: string | null) => {
        if (!createdBeforeDate) {
          this.cache.del(name);
          return;
        }

        try {
          const createdBefore = new Date(createdBeforeDate);
          const cur = this.cache.get(name);
          if (cur == undefined) return;
          if (cur.created < createdBefore) this.cache.del(name);
        } catch (e) {
          _onError(
            "unexpected error analyzing cache - deleting entry. error was " +
              JSON.stringify(e)
          );
          this.cache.del(name);
        }
      };

      const onMessage = (evt: { data: string }) => {
        const data: ServerSentEvt = JSON.parse(evt.data);
        switch (data.action) {
          case "flush":
            _flushCount++;
            for (const { f: feature, cb: ifCreatedBefore } of data.payload) {
              if (feature == "_all") {
                for (const _feature of Object.keys(allFeatures)) {
                  maybeDel(_feature, ifCreatedBefore);
                }
              } else maybeDel(feature, ifCreatedBefore);
            }
            break;

          default:
            errorNever(data.action, "unknown sever sent event " + data.action);
        }
      };

      let sseUrl = getEvtSourceUrl();
      if (sseUrl !== null) {
        if (_deviceId) sseUrl = sseUrl.replace(/\/?$/, "?" + _deviceId);

        const eventSource = new EventSource(sseUrl);
        eventSource.onmessage = onMessage;
      }
    }
  }

  async requestImpression<T extends FeatureNames>(
    builder: Query<T>,
    impressionId?: string
  ): Promise<{
    impression: Impression<T>;
    error?: CausalError;
  }> {
    const queries = builder.queries;
    let outputs: FeatureOutputs = {};

    let allCached = true;
    for (const k of Object.keys(queries)) {
      const output = this.cache.get(k);
      if (output == undefined) {
        allCached = false;
        break;
      }

      const identity = identify(queries, k as FeatureNames);
      if (identity !== output.identity) {
        allCached = false;
        break;
      }

      try {
        (outputs as any)[k] = output.value;
      } catch {
        allCached = false;
        break;
      }
    }

    const sessionArgs = { deviceId: this.deviceId };

    if (!allCached) {
      let result: FetchResponse | undefined = undefined;
      let fetchExceptionError = "";
      try {
        const body: {
          args: SessionArgs;
          impressionId?: string;
          requests: Query<T>["queries"];
        } = {
          args: sessionArgs,
          impressionId,
          requests: builder.queries,
        };
        result = await _fetch(_baseUrl + "features", {
          method: "POST",
          body: JSON.stringify(body),
        });
      } catch (e) {
        // @ts-ignore: Object is of type 'unknown'.
        if (e.message) fetchExceptionError = e.message;
        else fetchExceptionError = "unknown exception calling fetch";
      }
      if (result === undefined || result.status != 200) {
        const error = {
          status: result?.status || -1,
          message: (await result?.text()) || fetchExceptionError,
        };
        const errMsg =
          "Impression server error, reverting to control: " +
          JSON.stringify(error);
        _onError(errMsg);

        const impression = new ImpressionImpl({
          args: sessionArgs,
          requests: builder.queries,
          outputs,
        });
        return { impression: impression as unknown as Impression<T>, error }; // cast needed for older versions of typescript
      }
      const response: FeatureOutputs = (await result.json()) as FeatureOutputs;
      outputs = response;

      // TODO: It would be best to have the server send this
      const nextExpiry = new Date();
      nextExpiry.setSeconds(
        nextExpiry.getSeconds() + this.cacheDurationSeconds
      );

      for (const [k, v] of Object.entries(outputs)) {
        const identity = identify(queries, k as FeatureNames);
        if (identity != undefined && !k.startsWith("_"))
          this.cache.set(k, identity, v, nextExpiry);
      }
    }

    const impression = new ImpressionImpl({
      args: sessionArgs,
      requests: builder.queries,
      outputs,
    });

    if (allCached) {
      const impressions = Object.fromEntries(
        Object.entries(outputs as FeatureOutputs).map(([k, v], i) => [
          k,
          { impression: v._impressionId, newImpression: impressionId },
        ])
      );
      _sendBeacon({
        deviceId: sessionArgs.deviceId,
        impressions,
      });
    }
    return { impression: impression as unknown as Impression<T> }; // cast needed for older versions of typescript
  }
}

/**
 * @internal
 * Provide identity information to be used with ValueCache.
 *
 * @param queries The query for useImpression or requestImpression
 * @param featureName The feature name
 * @returns The identify information (query args associated with the query for the feature)
 */
export function identify(
  queries: FeatureQuery,
  featureName: FeatureNames
): string | undefined {
  const query = (queries as { [k: string]: unknown })[featureName];
  if (query == undefined) {
    _onError("could not find value identity");
    return undefined;
  } else {
    const identity = JSON.stringify(query);
    return identity;
  }
}

const causalContext = createContext<CausalClient | null>(null);

/**
 *
 * Makes the useImpression React hook available. It follows the standard React Context / Provider pattern.
 *
 * @param client The CausalClient to use
 * @returns
 */
export function CausalProvider({
  client,
  children,
}: {
  client: CausalClient;
  children: ReactNode;
}) {
  return (
    <causalContext.Provider value={client}>
      <>{children}</>
    </causalContext.Provider>
  );
}

/**
 * Causal error type.
 */
export type CausalError = {
  /**
   * The numeric error status
   */
  status: number;
  /**
   * The error message
   */
  message: string;
};

/**
 * The react hook to request an Impression.
 *
 * @param query The query specifing the features to request
 * @param impressionId The impression id
 * @returns data the impression data
 * @returns loading is the request still in process
 * @returns If any error occurred, the error, otherwise, undefined
 */
export function useImpression<T extends FeatureNames>(
  query: Query<T>,
  impressionId?: string
): {
  data: Impression<T>;
  loading: boolean;
  error?: CausalError;
} {
  const client = useContext(causalContext);

  const [data, setData] = useState<Impression<T>>(
    new ImpressionImpl({
      args: { deviceId: client?.deviceId ?? "error_noClientId" },
      requests: query.queries,
      outputs: {},
    }) as unknown as Impression<T> // cast only needed for older versions of typescript
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<
    | {
        status: number;
        message: string;
      }
    | undefined
  >(undefined);

  async function fetchRequest() {
    if (!client) {
      _onError("call to useImpression w/o seting CausalProvider");
      return;
    }
    const result = await client.requestImpression(query, impressionId);
    if (loading != false) {
      setLoading(false);
    }
    setData(result.impression);
    if (result.error) {
      if (error != result.error) {
        setError(result.error);
      }
    }
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

  let forceRefetchTicks = 0;
  if (client != undefined) {
    if (client.renderMinFetchDebounceSeconds > 0) {
      const interval = Math.max(
        client.cacheDurationSeconds,
        client.renderMinFetchDebounceSeconds
      );
      const curSeconds = new Date().getTime() / 1000;
      forceRefetchTicks = Math.floor(curSeconds / interval);
    }
  }

  const dependencyBuster = `${forceRefetchTicks}:${_flushCount}:${impressionId}:${JSON.stringify(
    { q: query.queries }
  )}`;

  useEffect(
    () => {
      fetchRequest();
    },
    // disabling react-hooks/exhaustive-deps as the dependencies are encoding in dependency string
    // eslint-disable-next-line
    [dependencyBuster]
  );

  if (!client) {
    const errorMsg = "call to useImpression w/o seting CausalProvider";
    _onError(errorMsg);
    return {
      data: data as Impression<T>,
      loading: false,
      error: { status: -1, message: errorMsg },
    };
  }

  return { data: data as Impression<T>, loading, error };
}

/**
 * Generates a pseudo random string identifier.
 *
 * @returns the identifier
 */
export function generateId() {
  return (
    (Math.random() + 1).toString(36).substring(2) +
    (Math.random() + 1).toString(36).substring(2)
  );
}
