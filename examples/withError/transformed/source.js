"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Service(params) {
    return function (target) { };
}
function Inject(params) {
    return function (target, propertyKey, parameterIndex) { };
}
var MyService = /** @class */ (function () {
    function MyService() {
    }
    MyService = __decorate([
        Service({ name: "MyService" })
    ], MyService);
    return MyService;
}());
var MyOtherService = /** @class */ (function () {
    function MyOtherService(myService) {
        this.myService = myService;
    }
    MyOtherService = __decorate([
        Service({ name: "MyOtherService" }),
        __param(0, Inject({ name: "MyService" }))
    ], MyOtherService);
    return MyOtherService;
}());
var MyThirdServiceWithWrongInjectType = /** @class */ (function () {
    function MyThirdServiceWithWrongInjectType(myService) {
        this.myService = myService;
    }
    MyThirdServiceWithWrongInjectType = __decorate([
        Service({ name: "MyThirdServiceWithWrongInjectType" }),
        __param(0, Inject({ name: "MyService" }))
    ], MyThirdServiceWithWrongInjectType);
    return MyThirdServiceWithWrongInjectType;
}());
//# sourceMappingURL=source.js.map