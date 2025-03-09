import express from  "express"

import { fetch , create , getOrders , updateOrder , deleteOrder , multipleOrders , getAcceptedOrder} from "../controller/oderController.js"

const route = express.Router();

route.get("/fetch" , fetch)
route.get("/orders" , getOrders)
route.get("/orders/accept" , getAcceptedOrder)
route.get("/orders/cancel" , getCancelOrder)
route.get ("/orders/:phone" , multipleOrders)
route.post("/create" , create)
route.patch ("/update/:id" , updateOrder)
route.delete ("/deleteOrder/:id" , deleteOrder)

export default route ;