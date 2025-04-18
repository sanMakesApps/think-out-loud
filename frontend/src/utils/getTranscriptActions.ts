import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";

export const getTranscriptActions = (
  report: string | null,
  setText: (value: string) => void
) => {
  //txt format.
  // const download = () => {
  //   const blob = new Blob([text], { type: "text/plain" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = "transcript.txt";
  //   link.click();
  // };

  const download = () => {
    if (!report) return;
    const paragraphs = report.split("\n").map((line) => new Paragraph(line));

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Report.docx");
    });
  };

  const clear = () => {
    setText("");
  };

  return { download, clear };
};
