import {
  isIPv4Valid,
  isIPv6Valid,
  isPortValid,
  isProtocolValid,
} from "./util/validate";
import { Protocol } from "./enum/proto.enum";


export interface ExistingRule {
  id: number;
}

/**
 * @class Rule
 * @author @Timo972
 */
export class Rule {
  private _id?: number;
  private _from?: string;
  private _to?: string;
  private _port?: number;
  private _proto?: Protocol;

  /**
   * @param {number} _id WARNING: Do not pass something here!!! Only used internally.
   */
  constructor(_id?: number) {
    this._id = _id;
  }

  /**
   *
   * @param {string} ip ipv4 or ipv6 address
   * @returns {Rule}
   */
  public to(ip: string): Rule {
    if (!isIPv6Valid(ip) && !isIPv4Valid(ip))
      throw new Error("invalid ip address");
    this._to = ip;
    return this;
  }

  /**
   *
   * @param {string} ip ipv4 or ipv6 address
   * @returns {Rule}
   */
  public from(ip: string): Rule {
    if (!isIPv6Valid(ip) && !isIPv4Valid(ip))
      throw new Error("invalid ip address");
    this._from = ip;
    return this;
  }

  /**
   *
   * @param {Protocol} protocol can be any, tcp, udp
   * @returns {Rule}
   */
  public proto(proto: Protocol): Rule {
    if (!isProtocolValid(proto)) throw new Error("invalid protocol");
    this._proto = proto;
    return this;
  }

  /**
   *
   * @param {number} port from 0-65535
   * @returns {Rule}
   */
  public port(port: number): Rule {
    if (!isPortValid(port)) throw new Error("invalid port");
    this._port = port;
    return this;
  }

  /**
   *
   * @returns {number}
   */
  public getPort(): number | undefined {
    return this._port;
  }

  /**
   *
   * @returns {Protocol}
   */
  public getProtocol(): Protocol {
    return this._proto ?? Protocol.ANY;
  }

  /**
   *
   * @returns {string}
   */
  public getFrom(): string | undefined {
    return this._from;
  }

  /**
   *
   * @returns {string}
   */
  public getTo(): string | undefined {
    return this._to;
  }

  /**
   * function returns undefined if you have created this rule
   * @returns {number} rule id
   */
  public getId(): number | undefined {
    return this._id;
  }

  public toJSON(): string {
    const {
      from,
      getFrom,
      getId,
      getPort,
      getProtocol,
      getTo,
      port,
      proto,
      to,
      toJSON,
      ...data
    }: any = this;

    let formatted: { [key: string]: number | string | Protocol } = {};

    for (const key in data) {
      const value = data[key];
      if (!value) continue;
      const escapedKey = key.substring(1, key.length);
      formatted[escapedKey] = value;
    }

    return JSON.stringify(formatted);
  }

  public buildUfwCommand(): string {
    let command = [];

    if (this._proto === Protocol.ANY) {
      command.push("proto any");
    }

    if (this._proto === Protocol.TCP) {
      command.push("proto tcp");
    }

    if (this._proto === Protocol.UDP) {
      command.push("proto udp");
    }

    if (
      this._from &&
      (isIPv4Valid(this._from) || isIPv6Valid(this._from) || this._from === "any")
    ) {
      command.push(`from ${this._from}`);
    }

    if (
      this._to &&
      (isIPv4Valid(this._to) || isIPv6Valid(this._to) || this._to === "any")
    ) {
      command.push(`to ${this._to}`);
    }

    if (this._port && isPortValid(this._port)) command.push(`port ${this._port}`);

    return command.join(" ");
  }
}
