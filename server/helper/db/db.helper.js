import dayjs from "dayjs";
import mongoose from "mongoose";

export async function checkIndexes(Model) {
  const indexes = await Model.collection.getIndexes();
  console.log(indexes);
}

export async function dropAnIndex(indexName, ModelName) {
  const model = mongoose.model(ModelName);

  try {
    await model.collection.dropIndex(indexName);
    console.log(`${indexName} index dropped successfully`);
  } catch (error) {
    console.error("Error dropping index:", error);
  }
}

export const updatePaymentDates = async (ModelName) => {
  try {
    const model = mongoose.model(ModelName);
    const payments = await model.find({}, { _id: 1, paymentDate: 1 });

    const bulkOperations = payments.map((payment) => ({
      updateOne: {
        filter: { _id: payment._id },
        update: {
          $set: {
            paymentDate: dayjs(payment.paymentDate).format("YYYY-MM-DD"),
          },
        },
      },
    }));

    if (bulkOperations.length > 0) {
      await model.bulkWrite(bulkOperations);
    } else {
      console.log("No records found to update.");
    }
  } catch (error) {
    console.error("Error updating payment dates:", error);
  }
};
