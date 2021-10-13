declare enum Protocol {
    TCP = "tcp",
    UDP = "udp",
    ANY = "any"
}

/**
 * @class Rule
 * @author @Timo972
 */
declare class Rule {
    private _id?;
    private _from?;
    private _to?;
    private _port?;
    private _proto?;
    /**
     * @param {number} _id WARNING: Do not pass something here!!! Only used internally.
     */
    constructor(_id?: number);
    /**
     *
     * @param {string} ip ipv4 or ipv6 address
     * @returns {Rule}
     */
    to(ip: string): Rule;
    /**
     *
     * @param {string} ip ipv4 or ipv6 address
     * @returns {Rule}
     */
    from(ip: string): Rule;
    /**
     *
     * @param {Protocol} protocol can be any, tcp, udp
     * @returns {Rule}
     */
    proto(proto: Protocol): Rule;
    /**
     *
     * @param {number} port from 0-65535
     * @returns {Rule}
     */
    port(port: number): Rule;
    /**
     *
     * @returns {number}
     */
    getPort(): number | undefined;
    /**
     *
     * @returns {Protocol}
     */
    getProtocol(): Protocol;
    /**
     *
     * @returns {string}
     */
    getFrom(): string | undefined;
    /**
     *
     * @returns {string}
     */
    getTo(): string | undefined;
    /**
     * function returns undefined if you have created this rule
     * @returns {number} rule id
     */
    getId(): number | undefined;
    toJSON(): string;
    buildUfwCommand(): string;
}

declare type Rules = {
    [key: number]: string;
};
declare type Default = "allow" | "deny" | "reject";
interface Status {
    status: "active" | "inactive";
    default: {
        incoming: Default;
        outgoing: Default;
        routed: Default;
    };
    rules: Rules;
}
interface Listening {
}
/**
 *
 * @param {Rule} rule
 */
declare function allow(rule: Rule): Promise<void>;
/**
 *
 * @param {Rule} rule
 */
declare function deny(rule: Rule): Promise<void>;
/**
 *
 * @param {Rule} rule
 */
declare function limit(rule: Rule): Promise<void>;
/**
 *
 * @param {Rule} rule
 */
declare function reject(rule: Rule): Promise<void>;
declare function deleteRule(rule: Rule | number): Promise<void>;
declare function getRules(): Promise<Rules>;
declare function setDefaults(incoming: Default, outgoing: Default, routed: Default): Promise<void>;
declare function enable(): Promise<void>;
declare function disable(): Promise<void>;
declare function getListening(): Promise<Listening>;
declare function getStatus(): Promise<Status>;
declare function reset(): Promise<void>;
declare function reload(): Promise<void>;

export { Default, Listening, Protocol, Rule, Rules, Status, allow, deleteRule, deny, disable, enable, getListening, getRules, getStatus, limit, reject, reload, reset, setDefaults };
