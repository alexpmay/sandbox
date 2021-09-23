// This is a FeatureDL automatically generated file. DO NOT DIRECTLY EDIT, your changes will not persist.
import nodeFetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

///////////////////////////////////////////////////////////////////////////////
// Start Parameterized
///////////////////////////////////////////////////////////////////////////////

/** Wraps a rating box that we can put on various product pages
to collect ratings from our users
 *   */
interface RatingBox_outputs {
    readonly call_to_action: string;

    readonly _impressionId: string;
}

/** Wraps a rating box that we can put on various product pages
to collect ratings from our users
 *   */
export class RatingBox implements RatingBox_outputs {
    /** The product that we are collecting ratings for
     *  Default: null
     *   */
    readonly product: string;
    /** The text next to the stars that prompts the visitor to rate the product
     *  Control: "Rate this product!"
     *   */
    readonly call_to_action: string;
    readonly impression: Impression;
    readonly _impressionId: string;

    /** Occurs each time a rating is collected   
    *  */
    signalrating( { stars } 
        : {  stars : number  } ) : void
    {
      RatingBox.signalrating( this.impression.deviceId, this._impressionId, { stars: stars, } );
    }
    /** Occurs each time a rating is collected   
      *  */
    static signalrating( deviceId : string, impressionId : string,  { stars } 
        : {  stars : number  } ) : void
    {
        const data = { 
          feature: "RatingBox",
          event: "rating",
          impressionId: impressionId,
          deviceId: deviceId,
          args: {  stars: stars  }
        };
      sendBeacon(data);
    }


   private constructor( 
       impression: Impression, 
       args: NonNullable<FeatureQuery["RatingBox"]>, 
       outputs: RatingBox_outputs ) {
      this.impression = impression;
      this._impressionId = outputs._impressionId;
      this.product = args.product;
      if (outputs.call_to_action != undefined) {
          this.call_to_action = outputs.call_to_action;
      } else {
          this.call_to_action = "Rate this product!";
      }
   }

}

type SessionArgs = {
   deviceId: string;
};

class Impression {
   readonly deviceId: string;

  constructor({
    args,
    requests,
    outputs,
  }: {
    args: SessionArgs,
    requests: FeatureQuery;
    outputs: FeatureResponse;
  }) {
    this.deviceId = args.deviceId;
    for (const [feature, args] of Object.entries(requests)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const output: FeatureNames = (outputs as any)[feature];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)[feature] = new (featureClasses as any)[feature](
        this,
        args,
        output == undefined ? {} : output
      );
    }
  }
   RatingBox?: RatingBox 

}

export type QueryExact<T extends FeatureNames> = 
    /** Wraps a rating box that we can put on various product pages
to collect ratings from our users
     *  */
    & ("RatingBox" extends T ?   
      { RatingBox : 
          {  product : string  } } : unknown ) 


export function queryExact<T extends FeatureNames>(
  args: QueryExact<T>
): Query<T> {
  const queryBuilder = new Query<T>();
  const _args = args as unknown as QueryExact<FeatureNames>; // cast needed for older versions of typescript
  if (_args.RatingBox !== undefined)
    queryBuilder.getRatingBox(_args.RatingBox);
  return queryBuilder;
}

export class Query<T extends FeatureNames>{
    /** Wraps a rating box that we can put on various product pages
to collect ratings from our users
     *  */
    getRatingBox( { product } 
      : {  product : string  } )
        : Query<T | "RatingBox"> {
        this.queries['RatingBox'] = { product: product, }
        return this
    }

    queries: FeatureQuery = {};
}

interface FeatureQuery {
    RatingBox?: { 
      product: string
       },
};

interface FeatureResponse {
    RatingBox?: RatingBox_outputs;
};

type FeatureNames = 
    |"RatingBox"
    ;
 

var featureClasses = {
    RatingBox,
    };

type ToData<T extends FeatureNames> =
    & ("RatingBox" extends T ? { RatingBox?:FeatureResponse["RatingBox"] } : unknown)

type ToImpression<T extends FeatureNames> =
    & ("RatingBox" extends T ? { RatingBox?:RatingBox } : unknown)
    & SessionArgs
    & {
    }


let _baseUrl = "http://localhost:3004/iserver"

///////////////////////////////////////////////////////////////////////////////
// End Parameterized
///////////////////////////////////////////////////////////////////////////////

// This is just a utility type so autocomplete works better
// type MyFeatures = SelectFeatures<"this_will_autocomplete">
export type SelectFeatures<T extends FeatureNames> = T;

// TODO
function getEvtSourceUrl(): string | null {
  return null;
}

if (!_baseUrl.endsWith("/")) _baseUrl += "/";

export function queryBuilder(): Query<never> {
  return new Query();
}

function sendBeacon(data: any) {
  if (typeof navigator == "undefined") {
    // we are running server side
    nodeFetch(_baseUrl + "signal", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } else {
    navigator.sendBeacon(_baseUrl + "signal", JSON.stringify(data));
  }
}

async function defaultFetch(
  url: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  return nodeFetch(url, init);
}
let _fetch = defaultFetch;

export function setFetch(
  fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>
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
  if (props.userId === undefined) return <div>Cannot register, no userId</div>;
  if (props.deviceId === undefined)
    return <div>Cannot register, no deviceId</div>;

  const [result, setResult] = useState<string>("Registering...");
  let userAgent = "unknown";
  if (typeof navigator.userAgent !== "undefined") {
    userAgent = navigator.userAgent;
  }
  async function handleResponse(response: Response) {
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

// Exported so it can be mocked in the regression test
export interface ValueCache {
  get(key: string): null | { value: string; created: Date };
  set(key: string, value: string, expiresTS: Date): void;
  del(key: string): void;
}

interface LsSchema {
  created: string;
  expires: string;
  value: string;
}
class LocalStorageCache implements ValueCache {
  get(key: string): null | { value: string; created: Date } {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    try {
      const { value, created, expires }: LsSchema = JSON.parse(raw);

      const now = new Date();

      // TODO: The server should probably send the created date over the wire
      // As is, flushing could be innacurate due to network latency
      const createdTS = new Date(created);
      const expiresTS = new Date(expires);

      if (expiresTS < now) {
        window.localStorage.removeItem(key);
        return null;
      }

      return { value, created: createdTS };
    } catch (e) {
      _onError("failed to deserialize from cache. Error = " + JSON.stringify(e));
      window.localStorage.removeItem(key);
      return null;
    }
  }

  set(key: string, value: string, expiresTS: Date) {
    const createdString = new Date().toISOString();
    const expiresString = expiresTS.toISOString();
    const toStore: LsSchema = {
      created: createdString,
      expires: expiresString,
      value: value,
    };
    return window.localStorage.setItem(key, JSON.stringify(toStore));
  }
  del(key: string) {
    return window.localStorage.removeItem(key);
  }
}

class NoOpCache implements ValueCache {
  get(): null {
    return null;
  }
  set() {}

  del() {}
}

export type JsonResult<T extends FeatureNames> = {
  data: {
    args: SessionArgs;
    requests: FeatureQuery;
    outputs: ToData<T>;
  };
  error?: {
    status: number;
    message: string;
  };
};

export type ImpressionResult<T extends FeatureNames> = {
  impression: ToImpression<T>;
  error?: {
    status: number;
    message: string;
  };
};

export function resultToImpression<T extends FeatureNames>(
  result: JsonResult<T>
): ImpressionResult<T> {
  const impression = new Impression(
    result.data as {
      args: SessionArgs;
      requests: FeatureQuery;
      outputs: FeatureResponse;
    }
  );
  return {
    impression: impression as unknown as ToImpression<T>,
    error: result.error,
  } as ImpressionResult<T>;
}

interface CausalClientOptions {
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
   * renderMinFetchDebounceSeconds: The minumum amount of time between duplicate fetches by useCausal()
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
  deviceId?: string;
}

export class CausalClient {
  readonly cache: ValueCache;
  readonly cacheDurationSeconds: number;
  readonly renderMinFetchDebounceSeconds: number;

  constructor(options: CausalClientOptions = {}) {
    const ssr = typeof window == "undefined";

    if (options.cache && options.cacheDurationSeconds === 0)
      _onWarn("Cache set, but cacheDuration is 0. Not caching");

    if (
      options.cache === null &&
      options.cacheDurationSeconds &&
      options.cacheDurationSeconds > 0
    )
      _onWarn("Cache set to null, but cacheDuration is > 0. Not caching");

    this.cache = options.cache ?? new NoOpCache();
    if (options.cacheDurationSeconds == 0) this.cache = new NoOpCache();
    else if (!ssr && options.cache === undefined)
      this.cache = new LocalStorageCache();

    this.cacheDurationSeconds = 600;
    if (
      options.cacheDurationSeconds !== null &&
      options.cacheDurationSeconds !== undefined
    ) {
      this.cacheDurationSeconds = options.cacheDurationSeconds;
    }

    this.renderMinFetchDebounceSeconds =
      options.renderMinFetchDebounceSeconds ?? 30;

    const useSSE =
      !ssr && options.useServerSentEvents !== false && options.cache !== null;

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
          if (!cur) return;
          if (cur.created < createdBefore) this.cache.del(name);
        } catch (e) {
          _onError(
            "unexpected error analyzing cache - deleting entry. error was " + JSON.stringify(e)
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
                for (const _feature of Object.keys(featureClasses)) {
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
        if (options.deviceId)
          sseUrl = sseUrl.replace(/\/?$/, "?" + options.deviceId);

        const eventSource = new EventSource(sseUrl);
        eventSource.onmessage = onMessage;
      }
    }
  }

  async requestImpression<T extends FeatureNames>(
    builder: Query<T>,
    args: SessionArgs,
    impressionId?: string
  ): Promise<{
    impression: ToImpression<T>;
    error?: {
      status: number;
      message: string;
    };
  }> {
    const result = await this.requestJson(builder, args, impressionId);
    return resultToImpression(result);
  }

  async requestJson<T extends FeatureNames>(
    builder: Query<T>,
    args: SessionArgs,
    impressionId?: string
  ): Promise<JsonResult<T>> {
    const requests = builder.queries;
    let outputs: FeatureResponse = {};

    let allCached = true;
    for (const k of Object.keys(requests)) {
      const output = this.cache.get(k);
      if (!output) {
        allCached = false;
        break;
      }
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (outputs as any)[k] = output.value;
      } catch {
        allCached = false;
        break;
      }
    }

    if (!allCached) {
      let result: Response | undefined = undefined;
      let fetchExceptionError = "";
      try {
        result = await _fetch(_baseUrl + "features", {
          method: "POST",
          body: JSON.stringify({
            args: args,
            impressionId: impressionId,
            requests: builder.queries,
          }),
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

        const r = {
          data: {
            args: args,
            requests: builder.queries,
            outputs: {},
          },
          error,
        } as JsonResult<T>;
        return r;
      }
      const response: FeatureResponse = await result.json() as FeatureResponse;
      outputs = response;

      // TODO: It would be best to have the server send this
      const nextExpiry = new Date();
      nextExpiry.setSeconds(
        nextExpiry.getSeconds() + this.cacheDurationSeconds
      );

      for (const [k, v] of Object.entries(outputs)) {
        if (!k.startsWith("_")) this.cache.set(k, v, nextExpiry);
      }
    }

    const result = {
      data: {
        args: args,
        requests: builder.queries,
        outputs: outputs as ToData<T>,
      },
    };

    if (allCached) {
      const impressions = Object.fromEntries(
        Object.entries(result.data.outputs as FeatureResponse).map(
          ([k, v], i) => [k, {impression: v._impressionId, newImpression: impressionId}]
        )
      );
      sendBeacon({
        deviceId: result.data.args.deviceId,
        impressions: impressions,
      });
    }
    return result;
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

export function useCausal<T extends FeatureNames>(
  builder: Query<T>,
  options: SessionArgs,
  impressionId?: string
): {
  data: ToImpression<T>;
  loading: boolean;
  error?: { status: number; message: string };
} {
  const client = useContext(causalContext);
  const [data, setData] = useState<ToImpression<T>>(
    new Impression({
      args: options,
      requests: builder.queries,
      outputs: {},
    }) as ToImpression<T> // cast only needed for older versions of typescript
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<
    | {
        status: number;
        message: string;
      }
    | undefined
  >(undefined);

  if (!client) {
    const errorMsg = "call to useCausal w/o seting CausalProvider";
    _onError(errorMsg);
    return {
      data: data as ToImpression<T>,
      loading: false,
      error: { status: -1, message: errorMsg },
    };
  }

  async function fetchRequest() {
    if (!client) {
      _onError("call to useCausal w/o seting CausalProvider");
      return;
    }
    const result = await client.requestImpression(
      builder,
      options,
      impressionId
    );
    setLoading(false);
    setData(result.impression);
    if (result.error) {
      setError(result.error);
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
  if (client.renderMinFetchDebounceSeconds > 0) {
    const interval = Math.max(
      client.cacheDurationSeconds,
      client.renderMinFetchDebounceSeconds
    );
    const curSeconds = new Date().getTime() / 1000;
    forceRefetchTicks = Math.floor(curSeconds / interval);
  }

  const dependencyBuster = `${forceRefetchTicks}:${_flushCount}:${impressionId}`;

  useEffect(() => {
    fetchRequest();
  }, [JSON.stringify({ q: builder.queries, options }), dependencyBuster]);


  return { data: data as ToImpression<T>, loading, error };
}
