"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ucontroller = void 0;
exports.Ucontroller = {
    get: async (req, res) => {
        console.log("idUusario", req.user.id);
        res.json("user");
        return;
    },
    create: async (req, res) => { },
};
