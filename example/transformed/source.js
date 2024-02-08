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
function Service() {
    return function (target) { };
}
function Inject() {
    return function (target, propertyKey, parameterIndex) { };
}
var MyService = /** @class */ (function () {
    function MyService() {
    }
    return MyService;
}());
var MyEntity = /** @class */ (function () {
    function MyEntity(myService) {
        this.myService = myService;
    }
    MyEntity = __decorate([
        Service({ name: "MyEntity" }),
        __param(0, Inject({ name: "MyService" }))
    ], MyEntity);
    return MyEntity;
}());
//# sourceMappingURL=source.js.map