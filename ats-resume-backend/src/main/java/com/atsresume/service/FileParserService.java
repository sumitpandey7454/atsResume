package com.atsresume.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import org.apache.pdfbox.Loader;

@Service
public class FileParserService {

    public String extractText(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();

        if (filename != null && filename.endsWith(".pdf")) {
            return extractFromPDF(file);
        } else if (filename != null &&
                (filename.endsWith(".docx") || filename.endsWith(".doc"))) {
            return extractFromDOCX(file);
        } else {
            throw new RuntimeException("Only PDF and DOCX files are supported");
        }
    }

    private String extractFromPDF(MultipartFile file) throws IOException {
        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    private String extractFromDOCX(MultipartFile file) throws IOException {
        try (XWPFDocument document = new XWPFDocument(file.getInputStream())) {
            List<XWPFParagraph> paragraphs = document.getParagraphs();
            StringBuilder text = new StringBuilder();
            for (XWPFParagraph paragraph : paragraphs) {
                text.append(paragraph.getText()).append("\n");
            }
            return text.toString();
        }
    }
}