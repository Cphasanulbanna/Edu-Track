export async function checkIndexes(Model) {
  const indexes = await Model.collection.getIndexes();
  console.log(indexes);
}

export async function dropAnIndex(indexName, ModelName) {
  const User = mongoose.model(ModelName);

  try {
    await User.collection.dropIndex(indexName);
    console.log(`${indexName} index dropped successfully` );
  } catch (error) {
    console.error("Error dropping index:", error);
  }
}

