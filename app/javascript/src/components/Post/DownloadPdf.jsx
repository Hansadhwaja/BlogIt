import React, { useEffect, useState } from "react";

import { Modal } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToPdfGenerationSubscription } from "channels/pdfGenerationChannel";
import { ProgressBar } from "components/commons";
import FileSaver from "file-saver";

const DownloadPdf = ({ isModalOpen, setIsModalOpen, title, slug }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Download blog post");

  const consumer = createConsumer();

  const generatePdf = async () => {
    try {
      await postsApi.generatePdf(slug);
    } catch (error) {
      logger.error(error);
    }
  };

  const downloadPdf = async () => {
    try {
      const { data } = await postsApi.download(slug);
      FileSaver.saveAs(data, `${title}.pdf`);
      setIsModalOpen(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    subscribeToPdfGenerationSubscription({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setMessage("Report is ready to be downloaded");
      downloadPdf();
    }
  }, [progress]);

  return (
    <Modal
      isOpen={isModalOpen}
      size="medium"
      onClose={() => setIsModalOpen(false)}
    >
      <div className="space-y-2 p-6">
        <p className="text-xl font-semibold">{message}</p>
        <ProgressBar progress={progress} />
      </div>
    </Modal>
  );
};

export default DownloadPdf;
