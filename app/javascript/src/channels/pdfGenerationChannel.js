import { getFromLocalStorage } from "utils/storage";

export const subscribeToPdfGenerationSubscription = ({
  consumer,
  setMessage,
  setProgress,
  generatePdf,
}) => {
  const userId = getFromLocalStorage("authUserId");
  const pdfGenerationSubscription = consumer.subscriptions.create(
    {
      channel: "PdfGenerationChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        setMessage("Connected the Cables...");
        generatePdf();
      },
      received(data) {
        const { message, progress } = data;
        setMessage(message);
        setProgress(progress);
      },
    }
  );

  return pdfGenerationSubscription;
};
