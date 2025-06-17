"use client";
import { useState, useRef } from "react";
import { PDFDocument, PDFName } from "pdf-lib";
import {compressFile} from "compactor";

export default function PdfCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [processedFile, setProcessedFile] = useState<Uint8Array | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState<{
    originalSize: number;
    compressedSize: number;
    reductionPercent: number;
  } | null>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  // Remove elementos executáveis e scripts
  const removeScriptsAndActions = (doc: PDFDocument) => {
    const removableElements = [
      'OpenAction', 'JS', 'JavaScript',
      'AA', 'AcroForm', 'XFA', 'Launch'
    ];

    removableElements.forEach(element => {
      if (doc.catalog.get(PDFName.of(element))) {
        doc.catalog.delete(PDFName.of(element));
      }
    });
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      // 1. Carrega o arquivo
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // 2. Processamento de otimização
      removeScriptsAndActions(pdfDoc);

      // 3. Remove anotações e metadados
      const pages = pdfDoc.getPages();
      pages.forEach(page => {
        page.scaleAnnotations(0, 0);
      });

      const options = {
        pageScale: 1.0, // use entre 0-2
        pageQuality: 0.50 // use entre 0-1
      };
      
      let compactedBytes = await compressFile(new Uint8Array(pdfBytes), '',  options);

      // 4. Salva com otimizações
      compactedBytes = await pdfDoc.save({
        useObjectStreams: true,
      });

      // 5. Calcula métricas
      const originalSize = pdfBytes.byteLength;
      const compressedSize = compactedBytes.byteLength;
      const reductionPercent = ((originalSize - compressedSize) / originalSize) * 100;

      // 6. Atualiza estado
      setProcessedFile(new Uint8Array(compactedBytes));
      setCompressionInfo({
        originalSize,
        compressedSize,
        reductionPercent
      });

    } catch (error) {
      console.error("Erro na compressão:", error);
      alert("Falha ao processar o PDF. Verifique se o arquivo é válido.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedFile || !file) return;

    const blob = new Blob([processedFile], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    if (downloadRef.current) {
      downloadRef.current.href = url;
      downloadRef.current.download = `compressed_${file.name.replace('.pdf', '')}.pdf`;
      downloadRef.current.click();
    }

    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Otimizador de PDF</h1>

      {/* Seletor de Arquivo */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecione um arquivo PDF
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setProcessedFile(null);
            setCompressionInfo(null);
          }}
          className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    disabled:opacity-50"
          disabled={isProcessing}
        />
      </div>

      {/* Botão de Compressão */}
      <button
        onClick={handleCompress}
        disabled={!file || isProcessing}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-md
                 hover:bg-blue-700 transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed
                 flex justify-center items-center"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processando...
          </>
        ) : "Otimizar PDF"}
      </button>

      {/* Resultados */}
      {compressionInfo && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="font-medium text-gray-800 mb-3">Resultado da Otimização:</h3>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-600">Tamanho Original:</p>
              <p className="font-semibold">{(compressionInfo.originalSize / 1024).toFixed(2)} KB</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tamanho Otimizado:</p>
              <p className="font-semibold text-green-600">{(compressionInfo.compressedSize / 1024).toFixed(2)} KB</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">Redução:</p>
            <p className="font-bold text-blue-600">
              {compressionInfo.reductionPercent.toFixed(1)}%
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md
                     hover:bg-green-700 transition-colors
                     flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Baixar PDF Otimizado
          </button>
        </div>
      )}

      {/* Elemento invisível para download */}
      <a ref={downloadRef} className="hidden" aria-hidden="true" />
    </div>
  );
}