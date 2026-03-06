import connection from "../utils/mysql.js";

export const index = async (_req, res) => {
  const sql = `
    SELECT id, name, manager
    FROM warehouse
  `;

  try {
    const [results] = await connection.query(sql);
    res.json(results);
  } catch (error) {
    res.status(500).send(`Error retrieving warehouses: ${error}`);
  }
};

export const getWarehouse = async (req, res) => {
  const sql = `
    SELECT * FROM warehouse
    WHERE id = ?
  `;

  try {
    const [results] = await connection.query(sql, [req.params.id]);

    if (!results.length) {
      return res.sendStatus(404);
    }

    res.json(results[0]);
  } catch (error) {
    res
      .status(400)
      .send(`Error retrieving warehouse ${req.params.id}: ${error}`);
  }
};

export const getInventories = async (req, res) => {
  const sql = `
    SELECT * FROM inventory
    WHERE warehouse_id = ?
  `;

  try {
    const [results] = await connection.query(sql, [req.params.id]);

    res.json(results);
  } catch (error) {
    res
      .status(400)
      .send(
        `Error retrieving inventories for warehouse ${req.params.id}: ${error}`
      );
  }
};

export const addWarehouse = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.manager ||
    !req.body.address ||
    !req.body.phone ||
    !req.body.email
  ) {
    return res
      .status(400)
      .send("Please provide name, manager, address, phone and email fields");
  }

  const sql = "INSERT INTO warehouse SET ?";

  try {
    const [result] = await connection.query(sql, req.body);
    const { insertId: id } = result;

    // For POST requests we can respond with 201 and the location of the newly created record
    res.status(201).location(`/warehouses/${id}`).json({ id });
  } catch (error) {
    res.status(400).send(`Error creating warehouse: ${error}`);
  }
};

export const updateWarehouse = async (req, res) => {
  const sql = `
    UPDATE warehouse SET ?
    WHERE warehouse.id = ${connection.escape(req.params.id)}
  `;

  try {
    const [results] = await connection.query(sql, req.body);

    const { affectedRows } = results;

    if (affectedRows === 0) {
      return res.sendStatus(404);
    }

    res.send(`Warehouse with id ${req.params.id} updated`);
  } catch (error) {
    res.status(400).send(`Error updating warehouse ${req.params.id}: ${error}`);
  }
};

export const deleteWarehouse = async (req, res) => {
  const sql = `
    DELETE FROM warehouse
    WHERE warehouse.id = ?
  `;

  try {
    await connection.query(sql, [req.params.id]);

    res.sendStatus(204);
  } catch (error) {
    res.status(400).send(`Error deleting warehouse ${req.params.id}: ${error}`);
  }
};
