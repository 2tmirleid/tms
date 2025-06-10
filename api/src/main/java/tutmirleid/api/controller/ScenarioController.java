package tutmirleid.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tutmirleid.api.entity.ScenarioEntity;
import tutmirleid.api.model.Scenario;
import tutmirleid.api.service.ScenarioService;
import tutmirleid.api.utils.exception.ScenarioNotFoundException;

import java.util.List;

@RestController()
@RequestMapping(BaseController.API_URI + "/scenarios")
public class ScenarioController extends BaseController {
    private final ScenarioService scenarioService;

    public ScenarioController(ScenarioService scenarioService) {
        this.scenarioService = scenarioService;
    }

    @GetMapping()
    public ResponseEntity<Object> getScenarios() {
        try {
            List<Scenario> scenarios = scenarioService.getScenarios();

            return ResponseEntity.ok(scenarios);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong...");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getScenarioByID(@PathVariable Long id) {
        try {
            Scenario scenario = scenarioService.getScenarioWithSteps(id);

            return ResponseEntity.ok(scenario);
        } catch (ScenarioNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong...");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createScenario(@RequestBody ScenarioEntity scenarioEntity) throws Exception {
        try {
            if (scenarioEntity.getTitle().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Scenario title can not be null");
            }

            this.scenarioService.createScenario(scenarioEntity);

            return ResponseEntity.ok("Scenario has been created successful!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong...");
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> updateScenario(@PathVariable Long id,
                                                 @RequestBody ScenarioEntity scenarioEntity) {
        try {
            Scenario scenario = scenarioService.updateScenario(id, scenarioEntity);

            return ResponseEntity.ok(scenario);
        } catch (ScenarioNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong... " + e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteScenario(@PathVariable Long id) {
        try {
            scenarioService.deleteScenario(id);

            return ResponseEntity.ok("Scenario has been deleted successful!");
        } catch (ScenarioNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong...");
        }
    }
}
