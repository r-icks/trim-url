import { StatusCodes } from "http-status-codes";
import db from "../db/connect.js";
import { BadRequestError, UnauthenticatedError, NotFoundError } from "../Errors/index.js";

export const getCollectionsAndUrls = async (req, res) => {
    const userId = req.user.userId;

    const collectionsAndUrls = await db("collections")
        .select("collections.collectionId", "collections.collectionName", "urls.urlId", "urls.shortName", "urls.redirectUrl")
        .leftJoin("urls", "collections.collectionId", "urls.collectionId")
        .where("collections.userId", userId);

    const result = [];

    collectionsAndUrls.forEach((row) => {
        const collection = result.find((c) => c.collectionId === row.collectionId);

        if (!collection) {
            result.push({
                collectionName: row.collectionName,
                collectionId: row.collectionId,
                urls: row.urlId ? [{ urlId: row.urlId, shortName: row.shortName, redirectUrl: row.redirectUrl }] : [],
            });
        } else if (row.urlId) {
            collection.urls.push({ urlId: row.urlId, shortName: row.shortName, redirectUrl: row.redirectUrl });
        }
    });

    res.status(StatusCodes.OK).json({ collections: result });
};

export const addCollection = async (req, res) => {
    const userId = req.user.userId;
    const { collectionName } = req.body;

    if (!collectionName) {
        throw new BadRequestError("Please provide a collection name");
    }

    const existingCollection = await db("collections").where({ userId, collectionName }).first();

    if (existingCollection) {
        throw new BadRequestError("Collection with the same name already exists");
    }

    const [data] = await db("collections").insert({ userId, collectionName }, "collectionId");
    const { collectionId } = data;

    res.status(StatusCodes.CREATED).json({ collectionId, collectionName, urls: [] });
};

export const addUrl = async (req, res) => {
    const userId = req.user.userId;
    const { collectionId, shortName, redirectUrl } = req.body;

    if (!collectionId || !shortName || !redirectUrl) {
        throw new BadRequestError("Please provide collection name, short name, and redirect URL");
    }

    const collection = await db("collections").where({ userId, collectionId }).first();

    if (!collection) {
        throw new UnauthenticatedError("User does not own the specified collection");
    }

    const [data] = await db("urls").insert({ shortName, redirectUrl, collectionId: collection.collectionId }, "urlId");
    const { urlId } = data;

    res.status(StatusCodes.CREATED).json({ collectionId, urlId, shortName, redirectUrl });
};

export const getUrlLogs = async (req, res) => {
    const userId = req.user.userId;
    const { urlId } = req.params;
  
    if (!urlId) {
      throw new BadRequestError("Please provide a URL ID");
    }
  
    const urlDetails = await db("urls")
      .select("urls.collectionId")
      .leftJoin("collections", "urls.collectionId", "collections.collectionId")
      .where({ "collections.userId": userId, "urls.urlId": urlId })
      .first();
  
    if (!urlDetails) {
      throw new UnauthenticatedError("User does not own the specified URL");
    }
  
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
  
    const logs = await db("logs")
      .select("ipAddress", db.raw("COUNT(*) as views"), db.raw("MAX(\"visitTimeStamp\") as latestTimeStamp"))
      .where("urlId", urlId)
      .where("visitTimeStamp", ">", weekAgo)
      .groupBy("ipAddress")
      .orderBy(db.raw("MAX(\"visitTimeStamp\")"), "desc");
  
    const chartData = [['Day', 'Visits']];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    const currentDayIndex = new Date().getDay();
    for (let i = 0; i <= 6; i++) {
      const dayIndex = (currentDayIndex - i + 7) % 7;
      const day = daysOfWeek[dayIndex];
      const dayLogs = logs.filter((log) => {
        const logDate = new Date(log.latesttimestamp);
        const logDay = logDate.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
        return day === logDay;
      });
  
      chartData.push([day, dayLogs.reduce((total, log) => total + parseInt(log.views), 0)]);
    }
  
    res.status(StatusCodes.OK).json({ chartData, logs });
  };  