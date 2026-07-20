"use client";

import { useEffect, useRef, useState } from "react";
import { ReceiptData, generateReceiptHTML } from "@/lib/receipt-generator";

interface DonationReceiptViewerProps {
  receiptData: ReceiptData;
  onDownloadPDF?: () => void;
  showPrintButton?: boolean;
  showDownloadButton?: boolean;
}

/**
 * Professional donation receipt viewer component
 * Displays receipt with print and download functionality
 */
export function DonationReceiptViewer({
  receiptData,
  onDownloadPDF,
  showPrintButton = true,
  showDownloadButton = true,
}: DonationReceiptViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    // Generate receipt HTML
    const html = generateReceiptHTML(receiptData);
    setHtmlContent(html);
  }, [receiptData]);

  useEffect(() => {
    // Inject HTML into iframe
    if (iframeRef.current && htmlContent) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  }, [htmlContent]);

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      {(showPrintButton || showDownloadButton) && (
        <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
          {showPrintButton && (
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <span>🖨️</span>
              Print Receipt
            </button>
          )}
          {showDownloadButton && onDownloadPDF && (
            <button
              onClick={onDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <span>⬇️</span>
              Download PDF
            </button>
          )}
        </div>
      )}

      {/* Receipt Display */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <iframe
          ref={iframeRef}
          className="w-full"
          style={{ height: "900px", border: "none" }}
          title="Donation Receipt"
          sandbox={{
            allowSameOrigin: true,
            allowModals: true,
          } as any}
        />
      </div>

      {/* Mobile Note */}
      <div className="md:hidden bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
        <p>💡 Tip: Scroll to view the complete receipt. Use Print or Download buttons above.</p>
      </div>
    </div>
  );
}
