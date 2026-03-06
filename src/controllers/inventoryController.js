import connection from "../utils/mysql.js";

export const index = async (_req, res) => {
  const sql = "SELECT * FROM inventory";

  try {
    const [results] = await connection.query(sql);
    res.json(results);
  } catch (error) {
    return res.status(400).send(error);
  }
};
