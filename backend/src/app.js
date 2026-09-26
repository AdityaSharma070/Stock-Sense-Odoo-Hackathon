import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import authRoutes        from "./routes/auth.routes.js";
import dashboardRoutes   from "./routes/dashboard.routes.js";
import productRoutes     from "./routes/product.routes.js";
import categoryRoutes    from "./routes/category.routes.js";
import warehouseRoutes   from "./routes/warehouse.routes.js";
import locationRoutes    from "./routes/location.routes.js";
import receiptRoutes     from "./routes/receipt.routes.js";
import deliveryRoutes    from "./routes/delivery.routes.js";
import adjustmentRoutes  from "./routes/adjustment.routes.js";
import moveHistoryRoutes from "./routes/moveHistory.routes.js";

app.use("/api/v1/auth",         authRoutes);
app.use("/api/v1/dashboard",    dashboardRoutes);
app.use("/api/v1/products",     productRoutes);
app.use("/api/v1/categories",   categoryRoutes);
app.use("/api/v1/warehouses",   warehouseRoutes);
app.use("/api/v1/locations",    locationRoutes);
app.use("/api/v1/receipts",     receiptRoutes);
app.use("/api/v1/deliveries",   deliveryRoutes);
app.use("/api/v1/adjustments",  adjustmentRoutes);
app.use("/api/v1/move-history", moveHistoryRoutes);

app.use(errorHandler);

export { app };