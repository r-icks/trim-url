import db from "../db/connect.js";
import { NotFoundError, BadRequestError } from "../Errors/index.js";

export const redirectToUrl = async (req, res) => {
  const { collectionName, shortName } = req.params;

  if (!collectionName || !shortName) {
    throw new BadRequestError("Please provide both collection name and short name in the query parameters");
  }

  const url = await db("urls")
    .select("urls.urlId", "redirectUrl") // Include "urls.urlId" in the select statement
    .innerJoin("collections", "urls.collectionId", "collections.collectionId")
    .where("collections.collectionName", collectionName)
    .where("urls.shortName", shortName)
    .first();

  if (!url) {
    throw new NotFoundError("Redirect URL not found");
  }

  const ipAddress = req.ip;

  await db("logs").insert({
    urlId: url.urlId,
    ipAddress,
  });

  res.status(200).json({ redirectUrl: url.redirectUrl });
};