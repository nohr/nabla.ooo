LOCATION=us-central1 \
PROJECT_ID=nabla7 \
ALGOLIA_APP_ID=QYRMFVSZ3U \
ALGOLIA_API_KEY=86a2102a00f2a2304fd0e01d7999961c \
ALGOLIA_INDEX_NAME=projects \
COLLECTION_PATH=portfolio \
FIELDS=at,id,name,date,type,by,program,images,poster,orientation,projectYear,projectClient,projectMedium,productName,projectName,statement,lot \
GOOGLE_APPLICATION_CREDENTIALS=./nabla.json \
npx firestore-algolia-search