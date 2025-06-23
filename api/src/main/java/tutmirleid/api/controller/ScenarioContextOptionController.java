package tutmirleid.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tutmirleid.api.entity.ScenarioContextOptionEntity;
import tutmirleid.api.service.ScenarioContextOptionService;

import java.util.List;

@RestController()
@RequestMapping(BaseController.API_URI + "/scenarios/options")
public class ScenarioContextOptionController extends BaseController {
    private final ScenarioContextOptionService contextOptionService;

    public ScenarioContextOptionController(ScenarioContextOptionService contextOptionService) {
        this.contextOptionService = contextOptionService;
    }

    @GetMapping()
    public ResponseEntity<Object> getOptions() {
        try {
            List<ScenarioContextOptionEntity> options = contextOptionService.getOptions();

            return ResponseEntity.ok(options);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e);
        }
    }
}
