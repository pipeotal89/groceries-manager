export async function getCategoryController(req: any, res: any) {
  try {
    const { db } = req.app;

    const result = await db.collection("categories").find({}).toArray();

    res
      .status(200)
      .json({ message: "Categories retrieved", categories: result });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
