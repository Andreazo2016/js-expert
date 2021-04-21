import ContextStrategy from "./base/contextStrategy.js";
import MongoStrategy from "./strategies/mongoStrategy.js";
import PostgresStrategy from "./strategies/postgresStrategy.js";

const postgresConnectionString = 'postgres://andreazoDev:123321abc@localhost:5432/heroes'
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionString = 'mongodb://localhost:27017/heroes'
const mongoDBContext = new ContextStrategy(new MongoStrategy(mongoDBConnectionString))
await mongoDBContext.connect()

const data = [{
  name: 'joaozinho',
  type: 'transaction'
},
{
  name: 'mariazinha',
  type: 'activityLog'
}]

const contextType = {
  transaction: postgresContext,
  activityLog: mongoDBContext
}

for (const { type, name } of data) {
  const context = contextType[type]
  await context.create({ name: name + Date.now() })
  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}