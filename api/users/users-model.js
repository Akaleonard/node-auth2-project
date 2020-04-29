const db = require("../../database/db_config");

module.exports = {
  find,
  findBy,
  findByDepartment,
  add,
  findById,
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findByDepartment(department) {
  return db("users").where({ department });
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first();
}
