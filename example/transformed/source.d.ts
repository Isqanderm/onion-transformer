declare function Service(): (target: Function) => void;
declare function Inject(): (target: Object, propertyKey?: string | symbol, parameterIndex?: number) => void;
declare class MyService {
}
declare class MyEntity {
    private myService;
    constructor(myService: MyService);
}
//# sourceMappingURL=source.d.ts.map