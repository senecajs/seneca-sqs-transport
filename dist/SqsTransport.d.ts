import type Seneca from 'seneca';
type Options = {
    debug: boolean;
    log: any[];
    prefix: string;
    suffix: string;
};
export type SqsTransportOptions = Partial<Options>;
declare function SqsTransport(this: Seneca.Instance, options: Options): {
    exports: {};
};
export default SqsTransport;
