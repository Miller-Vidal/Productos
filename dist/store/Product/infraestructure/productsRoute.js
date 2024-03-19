"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.productRouter = express_1.default.Router();
exports.productRouter.post("/", dependencies_1.registerProductController.run.bind(dependencies_1.registerProductController));
exports.productRouter.get("/:uuid", dependencies_1.getProdutController.getByPublic.bind(dependencies_1.getProdutController));
exports.productRouter.get("/", dependencies_1.getProductsController.getAllPublications.bind(dependencies_1.getProductsController));
