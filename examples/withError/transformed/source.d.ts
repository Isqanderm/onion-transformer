declare function Service(params?: {
    name?: string;
}): (target: Function) => void;
declare function Inject(params?: {
    name?: string;
}): (target: Object, propertyKey?: string | symbol, parameterIndex?: number) => void;
declare class MyService {
}
declare class MyOtherService {
    private myService;
    constructor(myService: MyService);
}
declare class MyThirdServiceWithWrongInjectType {
    private myService;
    private myService2;
    constructor(myService: MyOtherService, myService2?: MyOtherService);
}
//# sourceMappingURL=source.d.ts.map