package com.speech.think_out_loud.app;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/report")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ReportGeneratorController {

    private final ReportGeneratorService reportGeneratorService;

    public ReportGeneratorController(ReportGeneratorService reportGeneratorService) {
        this.reportGeneratorService = reportGeneratorService;
    }


    @PostMapping("/generate")
    public ResponseEntity<String> generateReport(@RequestBody ReportRequest reportRequest ){
        String response = reportGeneratorService.generateReportReply(reportRequest);
        return ResponseEntity.ok(response);


    }
}
