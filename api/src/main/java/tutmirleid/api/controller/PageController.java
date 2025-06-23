package tutmirleid.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tutmirleid.api.entity.PageEntity;
import tutmirleid.api.service.PageService;

import java.util.List;

@RestController()
@RequestMapping(BaseController.API_URI + "/pages")
public class PageController extends BaseController {
    private final PageService pageService;

    public PageController(PageService pageService) {
        this.pageService = pageService;
    }

    @GetMapping()
    public ResponseEntity<Object> getPages() {
        try {
            List<PageEntity> pages = this.pageService.getPages();

            return ResponseEntity.ok(pages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e);
        }
    }
}