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
     *  Default: null
     *   */
    readonly example_string: string;
    /** An example string output
     *  Control: "Example"
     *   */
    readonly example_output: string;
    readonly impression: ImpressionImpl;
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
/** An second example feature for reference documentation purposes
 *   */
interface ExampleFeature2_outputs {
    readonly example_output: number;

    readonly _impressionId: string;
}

/** An second example feature for reference documentation purposes
 *   */
export class ExampleFeature2 implements ExampleFeature2_outputs {
    /** An example string argument
     *  Default: null
     *   */
    readonly example_int: number;
    /** An example int output
     *  Control: 1
     *   */
    readonly example_output: number;
    readonly impression: ImpressionImpl;
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

export type QueryArgs<T extends FeatureNames> = 
    /** An example feature for reference documentation purposes
     *  */
    & ("ExampleFeature" extends T ?   
      { ExampleFeature : 
          {  example_string : string  } } : unknown ) 
    /** An second example feature for reference documentation purposes
     *  */
    & ("ExampleFeature2" extends T ?   
      { ExampleFeature2 : 
          {  example_int : number  } } : unknown ) 


export function createQuery<T extends FeatureNames>(
  args: QueryArgs<T>
): QueryBuilder<T> {
  const queryBuilder = new QueryBuilder<T>();
  const _args = args as unknown as QueryArgs<FeatureNames>; // cast needed for older versions of typescript
  if (_args.ExampleFeature !== undefined)
    queryBuilder.getExampleFeature(_args.ExampleFeature);
  if (_args.ExampleFeature2 !== undefined)
    queryBuilder.getExampleFeature2(_args.ExampleFeature2);
  return queryBuilder;
}

export class QueryBuilder<T extends FeatureNames>{
    /** An example feature for reference documentation purposes
     *  */
    getExampleFeature( { example_string } 
      : {  example_string : string  } )
        : QueryBuilder<T | "ExampleFeature"> {
        this.queries['ExampleFeature'] = { example_string: example_string, }
        return this
    }
    /** An second example feature for reference documentation purposes
     *  */
    getExampleFeature2( { example_int } 
      : {  example_int : number  } )
        : QueryBuilder<T | "ExampleFeature2"> {
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

///////////////////////////////////////////////////////////////////////////////
// End Parameterized
///////////////////////////////////////////////////////////////////////////////

export type FetchUrl = string;
export type FetchRequestInit = { method: "GET" | "POST"; body: string };
export type FetchResponse = {
  status: number;
  text(): Promise<string>;
  json(): Promise<any>;
};

// This is just a utility type so autocomplete works better
// type MyFeatures = SelectFeatures<"this_will_autocomplete">
export type SelectFeatures<T extends FeatureNames> = T;

// TODO
function getEvtSourceUrl(): string | null {
  return null;
}

if (!_baseUrl.endsWith("/")) _baseUrl += "/";

export function queryBuilder(): QueryBuilder<never> {
  return new QueryBuilder();
}

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

export function setSendBeacon(sendBeacon: (data: unknown) => void) {
  _sendBeacon = sendBeacon;
}

export async function defaultFetch(
  url: FetchUrl,
  init?: FetchRequestInit
): Promise<FetchResponse> {
  return nodeFetch(url, init);
}

let _fetch = defaultFetch;

export function setFetch(
  fetch: (url: string, init?: FetchRequestInit) => Promise<FetchResponse>
) {
  _fetch = fetch;
}

let _onWarn = console.log;
export function setOnWarn(onWarn: (msg: string) => void) {
  _onWarn = onWarn;
}

let _onError = console.error;
export function setOnError(onError: (msg: string) => void) {
  _onError = onError;
}

function errorNever(_: never, message: string) {
  _onError(message);
}

export function setBaseUrl(baseUrl: string) {
  if (!baseUrl.endsWith("/")) baseUrl += "/";
  _baseUrl = baseUrl;
}

/** register the deviceId as a QA device for the given user. Redirect to
 * the device page when complete. Display an error message on failure.
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

// Exported so it can be mocked or swapped
export type ValueCache = {
  get(
    key: string
  ): undefined | { identity: string; value: unknown; created: Date };
  set(key: string, identity: string, value: unknown, expiresTS: Date): void;
  del(key: string): void;
};

export type CacheItem = {
  created: string;
  expires: string;
  identity: string;
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
      // As is, flushing could be innacurate due to network latency
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

export type ImpressionJSON<T extends FeatureNames> = {
  // data: {
  args: SessionArgs;
  requests: FeatureQuery;
  outputs: Outputs<T>;
  // };
  // error?: {
  //   status: number;
  //   message: string;
  // };
};

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

export type CausalClientOptions = {
  /**
   * cache: The cache to use to cache feature values.
   * The default is to use LocalStorage on the client and not cache on the server
   * Set to null to explicitly disable caching
   */
  cache?: ValueCache | null;

  /**
   * maxCacheSeconds: The maximum amount of time to cache feature values.
   * The default is to cache for 600 seconds (10 minutes)
   * Setting to zero will disable caching
   * Setting to a negative number will be ignored
   */
  cacheDurationSeconds?: number | null;

  /**
   * renderMinFetchDebounceSeconds: The minumum amount of time between duplicate fetches by useImpression()
   * The default value is 30
   * A value of 0 or lower means never do a duplicate fetch
   * Duplicate fetches are fetches where the input args are identical
   *
   * CAUTION: Low values can cause render "loops" if a refetch is triggered before render completes (thus triggering another render and another refetch and...)
   *
   * The actual debounce interval is the maximum of this and cacheDurationSeconds
   *
   * For finer grained control, the best approach is to disable (set to 0) and generate your own unique impression ids whenever you want to refetch
   */
  renderMinFetchDebounceSeconds?: number | null;

  /** useServerSentEvents: Use server side events to update features
   *  defaults to true for CSR, unless the valueCache is set to null. Not applicable to SSR.
   *
   *  setting to false will prevent push updates to feature values, in which case features
   *  will only update when the value cache expires, or if you have set valueCache to null
   */
  useServerSentEvents?: boolean;

  /** The device fron which this client is connecting */
  deviceId: string;
};

export class CausalClient {
  readonly cache: ValueCache;
  readonly cacheDurationSeconds: number;
  readonly renderMinFetchDebounceSeconds: number;
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

    this.deviceId = _deviceId
      ? _deviceId
      : "gen_" + generateId();

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
    builder: QueryBuilder<T>,
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
          requests: QueryBuilder<T>["queries"];
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

export type CausalError = { status: number; message: string };

export function useImpression<T extends FeatureNames>(
  builder: QueryBuilder<T>,
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
      requests: builder.queries,
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
    const result = await client.requestImpression(builder, impressionId);
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
    { q: builder.queries }
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

export function generateId() {
  return (
    (Math.random() + 1).toString(36).substring(2) +
    (Math.random() + 1).toString(36).substring(2)
  );
}
