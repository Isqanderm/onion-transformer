import { Service, Inject } from "./decorators";
import { MyService } from "./myService";

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
