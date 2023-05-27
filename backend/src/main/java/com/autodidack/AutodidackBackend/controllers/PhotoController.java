package com.autodidack.AutodidackBackend.controllers;

import com.autodidack.AutodidackBackend.services.PhotoService;
import com.backblaze.b2.client.exceptions.B2Exception;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/photos")
@CrossOrigin(origins="*")
public class PhotoController {

    @Autowired
    public PhotoService pService;

    @GetMapping("/{photoID}")
    public String getOnePhoto(@PathVariable("photoID") String photoID) throws B2Exception {
        return pService.getOnePhoto(photoID);
    }

    @GetMapping("/{folderName}/")
    public List<String> getAllPhotosInFolder(@PathVariable("folderName") String folderName) throws B2Exception {
        return pService.getAllPhotosInFolder(folderName);
    }

}
