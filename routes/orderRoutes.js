import express from  "express"

import { fetch , create , getOrders , updateOrder , deleteOrder , multipleOrders , getAcceptedOrder, getCancelOrder, cancelOrder} from "../controller/oderController.js"

const route = express.Router();

route.get("/fetch" , fetch)
route.get("/orders" , getOrders)
route.get("/orders/accept" , getAcceptedOrder)
route.get("/orders/cancel" , getCancelOrder)
route.get ("/orders/:phone" , multipleOrders)
route.post("/create" , create)
route.patch ("/update/:id" , updateOrder)
route.patch ("/cancel/:id" , cancelOrder)
route.delete ("/deleteOrder/:id" , deleteOrder)

export default route ;