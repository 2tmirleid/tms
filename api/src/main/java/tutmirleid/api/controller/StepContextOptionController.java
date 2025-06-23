package tutmirleid.api.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tutmirleid.api.entity.StepContextOptionEntity;
import tutmirleid.api.service.StepContextOptionService;

import java.util.List;

@RestController()
@RequestMapping(BaseController.API_URI + "/scenarios/steps/options")
public class StepContextOptionController extends BaseController {
    private final StepContextOptionService stepContextOptionService;

    public StepContextOptionController(StepContextOptionService stepContextOptionService) {
        this.stepContextOptionService = stepContextOptionService;
    }

    @GetMapping()
    public ResponseEntity<Object> getOptions() {
        try {
            List<StepContextOptionEntity> options = stepContextOptionService.getOptions();

            return ResponseEntity.ok(options);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e);
        }
    }
}

