package tutmirleid.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tutmirleid.api.service.ScenarioService;
import tutmirleid.api.service.StepService;
import tutmirleid.api.utils.exception.ScenarioNotFoundException;

@RestController()
@RequestMapping(BaseController.API_URI + "/scenarios/steps")
public class StepController extends BaseController{
    private final StepService stepService;

    public StepController(StepService stepService) {
        this.stepService = stepService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteStep(@PathVariable Long id) {
        try {
            stepService.deleteStep(id);

            return ResponseEntity.ok("Step has been deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e);
        }
    }
}
