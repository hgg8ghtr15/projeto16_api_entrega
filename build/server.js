"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.tagName.toUpperCase() === "SCRIPT" ? document.currentScript.src : new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/app.ts
var import_express6 = __toESM(require("express"));

// src/utils/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/middlewares/error-handling.ts
var import_zod = require("zod");
function errorHandling(error, req, res, next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof import_zod.ZodError) {
    return res.status(400).json({
      message: "Validation error",
      issues: import_zod.z.treeifyError(error)
    });
  }
  return res.status(500).json({ message: "Internal server error" });
}

// src/routes/index.ts
var import_express5 = require("express");

// src/routes/users-routes.ts
var import_express = require("express");

// src/controllers/users-controllers.ts
var import_zod2 = require("zod");
var import_bcrypt = require("bcrypt");

// src/generated/prisma/client.ts
var path = __toESM(require("path"));
var import_node_url = require("url");

// src/generated/prisma/internal/class.ts
var runtime = __toESM(require("@prisma/client/runtime/client"));
var config = {
  "previewFeatures": [],
  "clientVersion": "7.5.0",
  "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum UserRole {\n  customer\n  sale\n  admin\n}\n\nenum DeliveryStatus {\n  processing\n  shipped\n  delivered\n}\n\nmodel User {\n  id       String @id @default(uuid())\n  name     String\n  email    String @unique\n  password String\n\n  role UserRole @default(customer)\n\n  createdAt DateTime  @default(now()) @map("created_at")\n  updatedAt DateTime? @updatedAt @map("updated_at")\n\n  deliveries Delivery[]\n\n  @@map("users")\n}\n\nmodel Delivery {\n  id          String @id @default(uuid())\n  userId      String @map("user_id")\n  description String\n\n  status DeliveryStatus @default(processing)\n\n  user         User          @relation(fields: [userId], references: [id])\n  deliveryLogs DeliveryLog[]\n\n  createdAt DateTime  @default(now()) @map("created_at")\n  updatedAt DateTime? @updatedAt @map("updated_at")\n\n  @@map("deliveries")\n}\n\nmodel DeliveryLog {\n  id          String   @id @default(uuid())\n  description String\n  deliveryId  String   @map("delivery_id")\n  delivery    Delivery @relation(fields: [deliveryId], references: [id])\n\n  createdAt DateTime  @default(now()) @map("created_at")\n  updatedAt DateTime? @updatedAt @map("updated_at")\n\n  @@map("delivery_logs")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"deliveries","kind":"object","type":"Delivery","relationName":"DeliveryToUser"}],"dbName":"users"},"Delivery":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String","dbName":"user_id"},{"name":"description","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"DeliveryStatus"},{"name":"user","kind":"object","type":"User","relationName":"DeliveryToUser"},{"name":"deliveryLogs","kind":"object","type":"DeliveryLog","relationName":"DeliveryToDeliveryLog"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"deliveries"},"DeliveryLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"deliveryId","kind":"scalar","type":"String","dbName":"delivery_id"},{"name":"delivery","kind":"object","type":"Delivery","relationName":"DeliveryToDeliveryLog"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"delivery_logs"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","delivery","deliveryLogs","_count","deliveries","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Delivery.findUnique","Delivery.findUniqueOrThrow","Delivery.findFirst","Delivery.findFirstOrThrow","Delivery.findMany","Delivery.createOne","Delivery.createMany","Delivery.createManyAndReturn","Delivery.updateOne","Delivery.updateMany","Delivery.updateManyAndReturn","Delivery.upsertOne","Delivery.deleteOne","Delivery.deleteMany","Delivery.groupBy","Delivery.aggregate","DeliveryLog.findUnique","DeliveryLog.findUniqueOrThrow","DeliveryLog.findFirst","DeliveryLog.findFirstOrThrow","DeliveryLog.findMany","DeliveryLog.createOne","DeliveryLog.createMany","DeliveryLog.createManyAndReturn","DeliveryLog.updateOne","DeliveryLog.updateMany","DeliveryLog.updateManyAndReturn","DeliveryLog.upsertOne","DeliveryLog.deleteOne","DeliveryLog.deleteMany","DeliveryLog.groupBy","DeliveryLog.aggregate","AND","OR","NOT","id","description","deliveryId","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","userId","DeliveryStatus","status","name","email","password","UserRole","role","every","some","none","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany"]'),
  graph: "rgEbMAsHAABpACA-AABkADA_AAAOABBAAABkADBBAQAAAAFEQABnACFFQABoACFUAQBlACFVAQAAAAFWAQBlACFYAABmWCIBAAAAAQAgCwMAAG4AIAUAAG8AID4AAGwAMD8AAAMAEEAAAGwAMEEBAGUAIUIBAGUAIURAAGcAIUVAAGgAIVEBAGUAIVMAAG1TIgMDAAChAQAgBQAAogEAIEUAAHAAIAsDAABuACAFAABvACA-AABsADA_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-AABgADA_AAAhABBAAABgADBBAQBRACFEQABSACFFQABTACFUAQBRACFVAQBRACFWAQBRACFYAABhWCIHBgAAWAAgGgAAYwAgGwAAYwAgRgAAAFgCRwAAAFgISAAAAFgITQAAYlgiBwYAAFgAIBoAAGMAIBsAAGMAIEYAAABYAkcAAABYCEgAAABYCE0AAGJYIgRGAAAAWAJHAAAAWAhIAAAAWAhNAABjWCILBwAAaQAgPgAAZAAwPwAADgAQQAAAZAAwQQEAZQAhREAAZwAhRUAAaAAhVAEAZQAhVQEAZQAhVgEAZQAhWAAAZlgiC0YBAAAAAUcBAAAABEgBAAAABEkBAAAAAUoBAAAAAUsBAAAAAUwBAAAAAU0BAFsAIU4BAAAAAU8BAAAAAVABAAAAAQRGAAAAWAJHAAAAWAhIAAAAWAhNAABjWCIIRkAAAAABR0AAAAAESEAAAAAESUAAAAABSkAAAAABS0AAAAABTEAAAAABTUAAWQAhCEZAAAAAAUdAAAAABUhAAAAABUlAAAAAAUpAAAAAAUtAAAAAAUxAAAAAAU1AAFYAIQNZAAADACBaAAADACBbAAADACAJBAAAawAgPgAAagAwPwAABwAQQAAAagAwQQEAZQAhQgEAZQAhQwEAZQAhREAAZwAhRUAAaAAhDQMAAG4AIAUAAG8AID4AAGwAMD8AAAMAEEAAAGwAMEEBAGUAIUIBAGUAIURAAGcAIUVAAGgAIVEBAGUAIVMAAG1TIlwAAAMAIF0AAAMAIAsDAABuACAFAABvACA-AABsADA_AAADABBAAABsADBBAQBlACFCAQBlACFEQABnACFFQABoACFRAQBlACFTAABtUyIERgAAAFMCRwAAAFMISAAAAFMITQAAX1MiDQcAAGkAID4AAGQAMD8AAA4AEEAAAGQAMEEBAGUAIURAAGcAIUVAAGgAIVQBAGUAIVUBAGUAIVYBAGUAIVgAAGZYIlwAAA4AIF0AAA4AIANZAAAHACBaAAAHACBbAAAHACAAAAAAAWEBAAAAAQFhQAAAAAEBYUAAAAABBRQAAKoBACAVAACtAQAgXgAAqwEAIF8AAKwBACBkAAAFACADFAAAqgEAIF4AAKsBACBkAAAFACAAAAABYQAAAFMCBRQAAKQBACAVAACoAQAgXgAApQEAIF8AAKcBACBkAAABACALFAAAfwAwFQAAhAEAMF4AAIABADBfAACBAQAwYAAAggEAIGEAAIMBADBiAACDAQAwYwAAgwEAMGQAAIMBADBlAACFAQAwZgAAhgEAMARBAQAAAAFCAQAAAAFEQAAAAAFFQAAAAAECAAAACQAgFAAAigEAIAMAAAAJACAUAACKAQAgFQAAiQEAIAENAACmAQAwCQQAAGsAID4AAGoAMD8AAAcAEEAAAGoAMEEBAAAAAUIBAGUAIUMBAGUAIURAAGcAIUVAAGgAIQIAAAAJACANAACJAQAgAgAAAIcBACANAACIAQAgCD4AAIYBADA_AACHAQAQQAAAhgEAMEEBAGUAIUIBAGUAIUMBAGUAIURAAGcAIUVAAGgAIQg-AACGAQAwPwAAhwEAEEAAAIYBADBBAQBlACFCAQBlACFDAQBlACFEQABnACFFQABoACEEQQEAdAAhQgEAdAAhREAAdQAhRUAAdgAhBEEBAHQAIUIBAHQAIURAAHUAIUVAAHYAIQRBAQAAAAFCAQAAAAFEQAAAAAFFQAAAAAEDFAAApAEAIF4AAKUBACBkAAABACAEFAAAfwAwXgAAgAEAMGAAAIIBACBkAACDAQAwAAAAAWEAAABYAgsUAACSAQAwFQAAlwEAMF4AAJMBADBfAACUAQAwYAAAlQEAIGEAAJYBADBiAACWAQAwYwAAlgEAMGQAAJYBADBlAACYAQAwZgAAmQEAMAYFAACMAQAgQQEAAAABQgEAAAABREAAAAABRUAAAAABUwAAAFMCAgAAAAUAIBQAAJ0BACADAAAABQAgFAAAnQEAIBUAAJwBACABDQAAowEAMAsDAABuACAFAABvACA-AABsADA_AAADABBAAABsADBBAQAAAAFCAQBlACFEQABnACFFQABoACFRAQBlACFTAABtUyICAAAABQAgDQAAnAEAIAIAAACaAQAgDQAAmwEAIAk-AACZAQAwPwAAmgEAEEAAAJkBADBBAQBlACFCAQBlACFEQABnACFFQABoACFRAQBlACFTAABtUyIJPgAAmQEAMD8AAJoBABBAAACZAQAwQQEAZQAhQgEAZQAhREAAZwAhRUAAaAAhUQEAZQAhUwAAbVMiBUEBAHQAIUIBAHQAIURAAHUAIUVAAHYAIVMAAHxTIgYFAAB-ACBBAQB0ACFCAQB0ACFEQAB1ACFFQAB2ACFTAAB8UyIGBQAAjAEAIEEBAAAAAUIBAAAAAURAAAAAAUVAAAAAAVMAAABTAgQUAACSAQAwXgAAkwEAMGAAAJUBACBkAACWAQAwAAMDAAChAQAgBQAAogEAIEUAAHAAIAIHAACfAQAgRQAAcAAgAAVBAQAAAAFCAQAAAAFEQAAAAAFFQAAAAAFTAAAAUwIHQQEAAAABREAAAAABRUAAAAABVAEAAAABVQEAAAABVgEAAAABWAAAAFgCAgAAAAEAIBQAAKQBACAEQQEAAAABQgEAAAABREAAAAABRUAAAAABAwAAAA4AIBQAAKQBACAVAACpAQAgCQAAAA4AIA0AAKkBACBBAQB0ACFEQAB1ACFFQAB2ACFUAQB0ACFVAQB0ACFWAQB0ACFYAACQAVgiB0EBAHQAIURAAHUAIUVAAHYAIVQBAHQAIVUBAHQAIVYBAHQAIVgAAJABWCIHAwAAiwEAIEEBAAAAAUIBAAAAAURAAAAAAUVAAAAAAVEBAAAAAVMAAABTAgIAAAAFACAUAACqAQAgAwAAAAMAIBQAAKoBACAVAACuAQAgCQAAAAMAIAMAAH0AIA0AAK4BACBBAQB0ACFCAQB0ACFEQAB1ACFFQAB2ACFRAQB0ACFTAAB8UyIHAwAAfQAgQQEAdAAhQgEAdAAhREAAdQAhRUAAdgAhUQEAdAAhUwAAfFMiAgYABQcGAgMDAAEFCgMGAAQBBAACAQULAAEHDAAAAAADBgAKGgALGwAMAAAAAwYAChoACxsADAEDAAEBAwABAwYAERoAEhsAEwAAAAMGABEaABIbABMBBAACAQQAAgMGABgaABkbABoAAAADBgAYGgAZGwAaCAIBCQ0BChABCxEBDBIBDhQBDxYGEBcHERkBEhsGExwIFh0BFx4BGB8GHCIJHSMNHiQCHyUCICYCIScCIigCIyoCJCwGJS0OJi8CJzEGKDIPKTMCKjQCKzUGLDgQLTkULjoDLzsDMDwDMT0DMj4DM0ADNEIGNUMVNkUDN0cGOEgWOUkDOkoDO0sGPE4XPU8b"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname((0, import_node_url.fileURLToPath)(importMetaUrl));
var PrismaClient = getPrismaClientClass();

// src/database/prisma.ts
var import_pg = require("pg");
var import_adapter_pg = require("@prisma/adapter-pg");
var connectionString = `${process.env.DATABASE_URL}`;
var pool = new import_pg.Pool({ connectionString });
var adapter = new import_adapter_pg.PrismaPg(pool);
var prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV !== "production" ? [] : ["query"]
});

// src/controllers/users-controllers.ts
async function ensureUserExists(id) {
  const user = await prisma.user.findUnique({
    where: { id }
  });
  if (!user) {
    throw new AppError("Usuario n\xE3o encontrado", 404);
  }
  return user;
}
var UsersController = class {
  async create(req, res) {
    const bodySchema = import_zod2.z.object({
      name: import_zod2.z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres"),
      email: import_zod2.z.email("O email informado \xE9 inv\xE1lido"),
      password: import_zod2.z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
    });
    const { name, email, password } = bodySchema.parse(req.body);
    const userExiste = await prisma.user.findFirst({
      where: {
        email
      }
    });
    if (userExiste) {
      throw new AppError("Email j\xE1 cadastrado", 400);
    }
    const hashedPassword = await (0, import_bcrypt.hash)(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json({ message: "Usu\xE1rio criado com sucesso", user: userWithoutPassword });
  }
  async index(req, res) {
    const users = await prisma.user.findMany();
    const usersWithoutPassword = users.map(({ password: _, ...user }) => user);
    return res.status(200).json({ message: "Usuarios listado com Sucesso", users: usersWithoutPassword });
  }
  async editPerfil(req, res) {
    const id = req.params.id;
    const bodySchema = import_zod2.z.object({
      role: import_zod2.z.enum(["sale", "customer", "admin"], "Perfil inv\xE1lido")
    });
    const { role } = bodySchema.parse(req.body);
    await ensureUserExists(id);
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        role
      }
    });
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({ message: "Usuario atualizado com sucesso", user: userWithoutPassword });
  }
  async delete(req, res) {
    const id = req.params.id;
    await ensureUserExists(id);
    await prisma.user.delete({
      where: {
        id
      }
    });
    return res.status(200).json({ message: "Usuario deletado com sucesso" });
  }
};

// src/routes/users-routes.ts
var userRoutes = (0, import_express.Router)();
var usersController = new UsersController();
userRoutes.post("/", usersController.create);
userRoutes.get("/", usersController.index);
userRoutes.put("/:id", usersController.editPerfil);
userRoutes.delete("/:id", usersController.delete);

// src/routes/sessions-routes.ts
var import_express2 = require("express");

// src/controllers/sessions-controller.ts
var import_zod4 = require("zod");
var import_bcrypt2 = require("bcrypt");
var import_jsonwebtoken = require("jsonwebtoken");

// env.ts
var import_zod3 = require("zod");
var envSchema = import_zod3.z.object({
  DATABASE_URL: import_zod3.z.url(),
  JWT_SECRET: import_zod3.z.string(),
  JWT_EXPIRES_IN: import_zod3.z.string(),
  PORT: import_zod3.z.coerce.number().default(3333)
});
var env = envSchema.parse(process.env);

// src/config/auth.ts
var auth = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN
  }
};

// src/controllers/sessions-controller.ts
var SessionsController = class {
  async create(req, res) {
    const bodySchema = import_zod4.z.object({
      email: import_zod4.z.email("O email informado \xE9 inv\xE1lido"),
      password: import_zod4.z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
    });
    const { email, password } = bodySchema.parse(req.body);
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });
    if (!user) {
      throw new AppError("Usu\xE1rio ou senha n\xE3o encontrados.", 404);
    }
    const senhaValida = await (0, import_bcrypt2.compare)(password, user.password);
    if (!senhaValida) {
      throw new AppError("Usu\xE1rio ou senha n\xE3o encontrados.", 404);
    }
    const { secret, expiresIn } = auth.jwt;
    const token = (0, import_jsonwebtoken.sign)({ role: user.role ?? "customer" }, secret, {
      subject: user.id,
      expiresIn
    });
    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json({ message: "Sess\xE3o criada com sucesso", token, user: userWithoutPassword });
  }
};

// src/routes/sessions-routes.ts
var sessionsRoutes = (0, import_express2.Router)();
var sessionsController = new SessionsController();
sessionsRoutes.post("/", sessionsController.create);

// src/routes/deliveries.routes.ts
var import_express3 = require("express");

// src/controllers/deliveries-controller.ts
var import_zod5 = require("zod");
var DeliveriesController = class {
  async create(req, res) {
    const bodySchema = import_zod5.z.object({
      user_id: import_zod5.z.string(),
      description: import_zod5.z.string()
    });
    const { user_id, description } = bodySchema.parse(req.body);
    await ensureUserExists(user_id);
    const pedido = await prisma.delivery.create({
      data: {
        userId: user_id,
        description
      }
    });
    return res.json({ message: "Pedido criado com sucesso", pedido });
  }
  async index(req, res) {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return res.json({ message: "Pedidos listados com sucesso", deliveries });
  }
};

// src/middlewares/ensure-authenticated.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token n\xE3o informado", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { role, sub: user_id } = (0, import_jsonwebtoken2.verify)(token, auth.jwt.secret);
    req.user = {
      id: user_id,
      role
    };
    next();
  } catch {
    throw new AppError("Token inv\xE1lido", 401);
  }
}

// src/middlewares/verifyUserAuthorization.ts
function verifyUserAuthorization(role) {
  return (request, response, next) => {
    if (!request.user) {
      throw new AppError("Usu\xE1rio sem permiss\xE3o!");
    }
    if (!role.includes(request.user.role)) {
      throw new AppError("Usu\xE1rio sem permiss\xE3o!");
    }
    return next();
  };
}

// src/controllers/deliveries-status-controller.ts
var import_zod6 = require("zod");
var DeliveriesStatusController = class {
  async update(req, res) {
    const paramsSchema = import_zod6.z.object({
      id: import_zod6.z.string()
    });
    const bodySchema = import_zod6.z.object({
      status: import_zod6.z.enum(["processing", "shipped", "delivered"], "Status informado est\xE1 incorreto.")
    });
    const { id } = paramsSchema.parse(req.params);
    const { status } = bodySchema.parse(req.body);
    const delivery = await prisma.delivery.update({
      data: {
        status
      },
      where: {
        id
      }
    });
    await prisma.deliveryLog.create({
      data: {
        description: `Status atualizado para ${status}`,
        deliveryId: id
      }
    });
    return res.json({ message: "Status atualizado com sucesso", delivery });
  }
};

// src/routes/deliveries.routes.ts
var deliveriesController = new DeliveriesController();
var deliveriesStatusController = new DeliveriesStatusController();
var deliveriesRoutes = (0, import_express3.Router)();
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update);

// src/routes/delivery-logs-routes.ts
var import_express4 = require("express");

// src/controllers/delivery-logs-controller.ts
var import_zod7 = require("zod");
var DeliveryLogsController = class {
  async create(req, res) {
    const bodySchema = import_zod7.z.object({
      description: import_zod7.z.string(),
      deliveryId: import_zod7.z.string().min(5, "ID da entrega inv\xE1lido")
    });
    const { description, deliveryId } = bodySchema.parse(req.body);
    const delivery = await prisma.delivery.findUnique({
      where: {
        id: deliveryId
      }
    });
    if (!delivery) {
      throw new AppError("Entrega n\xE3o encontrada", 404);
    }
    if (delivery.status === "processing") {
      throw new AppError("Produto ainda est\xE1 em processamento!", 400);
    }
    if (delivery.status === "delivered") {
      throw new AppError("Produto j\xE1 foi entregue e n\xE3o pode receber mais Logs!", 400);
    }
    const log = await prisma.deliveryLog.create({
      data: {
        description,
        deliveryId,
        createdAt: /* @__PURE__ */ new Date()
      }
    });
    return res.json({ message: "Log criado com sucesso", log });
  }
  async index(req, res) {
    const delivery = await prisma.delivery.findMany({
      include: {
        deliveryLogs: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return res.json({ message: "Logs listados com sucesso", delivery });
  }
  async show(req, res) {
    const paramsSchema = import_zod7.z.object({
      id: import_zod7.z.string().min(5, "ID da entrega inv\xE1lido")
    });
    const { id } = paramsSchema.parse(req.params);
    const log = await prisma.delivery.findUnique({
      where: {
        id
      },
      include: {
        deliveryLogs: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return res.json({ message: "Log listado com sucesso", log });
  }
};

// src/routes/delivery-logs-routes.ts
var deliveryLogsRoutes = (0, import_express4.Router)();
var deliveryLogsController = new DeliveryLogsController();
deliveryLogsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  deliveryLogsController.create
);
deliveryLogsRoutes.get(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "customer"]),
  deliveryLogsController.show
);
deliveryLogsRoutes.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "customer"]),
  deliveryLogsController.index
);

// src/routes/index.ts
var router = (0, import_express5.Router)();
router.use("/users", userRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/deliveries", deliveriesRoutes);
router.use("/delivery-logs", deliveryLogsRoutes);

// src/app.ts
var app = (0, import_express6.default)();
app.use(import_express6.default.json());
app.use(router);
app.use(errorHandling);

// src/server.ts
var PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server executando em http://localhost:${PORT}`);
});
