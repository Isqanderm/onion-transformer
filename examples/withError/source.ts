function Service(params?: { name?: string }) {
  return function (target: Function) {};
}

function Inject(params?: { name?: string }) {
  return function (
    target: Object,
    propertyKey?: string | symbol,
    parameterIndex?: number,
  ) {};
}

@Service()
class MyService {}

@Service()
class MyOtherService {
  constructor(@Inject() private myService: MyService) {}
}

@Service()
class MyThirdServiceWithWrongInjectType {
  constructor(
    @Inject({ name: "MyService" }) private myService: MyOtherService,
  ) {}
}
