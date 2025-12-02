/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_279067900")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id = user && @request.auth.id = @request.body.user"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_279067900")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id = user"
  }, collection)

  return app.save(collection)
})
