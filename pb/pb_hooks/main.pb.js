/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/hello/{name}", (e) => {
  let name = e.request.pathValue("name");

  return e.json(200, { message: "Hello " + name });
});

onRecordUpdateRequest((e) => {
  if (e.hasSuperuserAuth()) {
    return e.next();
  }

  const protectedFields = ["role"];

  const original = e.record.original();

  for (const field of protectedFields) {
    if (e.record.get(field) !== original.get(field)) {
      throw new BadRequestError("Cannot modify protected field: " + field);
    }
  }

  e.next();
}, "users");
