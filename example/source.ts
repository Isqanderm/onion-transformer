function Service() {
  return function (target: Function) {}
}

function Inject() {
  return function (target: Object, propertyKey?: string | symbol, parameterIndex?: number) {}
}

class MyService {}

@Service()
class MyEntity {
  constructor(@Inject() private myService: MyService) {}
}
