import Image from "next/image";
import {
  loadPageChunk,
  queryCollection,
  getCollectionSchemaNameIndex,
} from "./notion";

export async function Books() {
  const books = await getData();
  return (
    <div className="books grid grid-cols-auto-fit grid-flow-row gap-4 px-5 mb-10">
      {books.map(book => (
        <Book key={book.URL} {...book} />
      ))}
    </div>
  );
}

async function getData() {
  const {
    recordMap: { collection },
  } = await loadPageChunk({
    pageId: "fa0a337c-3807-4aa9-b30f-dddc6ef4ec2e",
    chunkNumber: 0,
    limit: 50,
    verticalColumns: false,
    cursor: {
      stack: [
        [
          {
            table: "block",
            id: "fa0a337c-3807-4aa9-b30f-dddc6ef4ec2e",
            index: 0,
          },
        ],
      ],
    },
  });

  const [collectionId] = Object.keys(collection);
  const collectionSchema = getCollectionSchemaNameIndex(
    collection[collectionId].value.schema
  );

  const col = await queryCollection({
    collection: {
      id: "ed95c702-dabc-498a-9186-e8ff4719ecc0",
      spaceId: "7e95f31d-c9d4-4799-ac66-847d56344ef2",
    },
    collectionView: {
      id: "29294b4b-7b0f-405f-8f5e-af4454c258a2",
      spaceId: "7e95f31d-c9d4-4799-ac66-847d56344ef2",
    },
    loader: {
      type: "reducer",
      reducers: {
        collection_group_results: { type: "results", limit: 1000 },
        "table:uncategorized:title:count": {
          type: "aggregation",
          aggregation: { property: "title", aggregator: "count" },
        },
      },
      sort: [{ property: collectionSchema.Votes, direction: "descending" }],
      searchQuery: "",
      userTimeZone: "America/Los_Angeles",
    },
  });

  function toPlainText(val) {
    return val[0]
      .map(v => {
        if (typeof v === "string") {
          return v;
        } else if (Array.isArray(v)) {
          // if it's bold or something else
          return v[1];
        }
      })
      .join(" ")
      .trim();
  }

  return (
    col.result.reducerResults.collection_group_results.blockIds
      .map(blockId => {
        const blockData = col.recordMap.block[blockId];

        if (blockData) {
          const props = blockData.value.properties;

          if (!props) {
            // not sure when this happens yet, but it seems
            // to be limited to only one row
            // console.info('missing props for block', blockId);
            return null;
          }

          // the props are named with unique ids, but
          // we want to return them with easily addressable
          // column names
          const indexedData = {};
          for (const key in collectionSchema) {
            indexedData[key] = props[collectionSchema[key]];
          }
          return indexedData;
        } else {
          console.warn(`missing block data for "${blockId}"`);
          return null;
        }
      })
      // sanitize notion data
      .map(book => {
        if (!book) return null;

        book.URL = toPlainText(book.URL);
        book.Image = book.Image ? toPlainText(book.Image) : null;

        const ASIN = book.URL.match(/dp\/(.*)\/?$/);
        if (ASIN) {
          book.ASIN = ASIN[1];
        }

        book.Name = toPlainText(book.Name);

        // sanitize vote count, since many are undefined
        book.Votes = Number(book.Votes);
        if (isNaN(book.Votes)) {
          book.Votes = 1;
        }

        return book;
      })
      .filter(v => v != null)
  );
}

function Book({ URL, Name, Image: ImageURL, ASIN, Votes }) {
  return (
    <main className="text-sm flex flex-col items-center bg-gray-200">
      <a href={URL} target="_blank" className="p-4 text-center">
        <span
          className="block w-48 h-80 bg-center bg-cover mb-2 relative"
          style={{
            backgroundImage: `url(${
              ImageURL ||
              `https://images-na.ssl-images-amazon.com/images/P/${ASIN}._LZZZZZZZ_.jpg`
            })`,
          }}
        >
          <Image
            alt={Name}
            fill
            style={{ objectFit: "contain" }}
            src={
              ImageURL ||
              `https://images-na.ssl-images-amazon.com/images/P/${ASIN}._LZZZZZZZ_.jpg`
            }
          />
        </span>
        <span className="block font-medium">{Name}</span>
        {Votes > 1 && (
          <span className="block bg-blue-500 text-white text-xs py-1 px-2 ml-2 rounded-full">
            🔥 {Votes}
          </span>
        )}
      </a>
    </main>
  );
}
