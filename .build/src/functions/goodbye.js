var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = JSON.parse(event.body || '');
        return {
            statusCode: 200,
            body: `Goodbye ${parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.name}`,
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: 'An error occured',
        };
    }
});
//# sourceMappingURL=goodbye.js.map