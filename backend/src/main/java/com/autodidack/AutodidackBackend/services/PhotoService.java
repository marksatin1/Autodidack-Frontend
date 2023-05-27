package com.autodidack.AutodidackBackend.services;

import com.backblaze.b2.client.B2StorageClient;
import com.backblaze.b2.client.B2StorageClientFactory;
import com.backblaze.b2.client.exceptions.B2Exception;
import com.backblaze.b2.client.structures.B2FileVersion;
import com.backblaze.b2.client.structures.B2ListFileVersionsRequest;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class PhotoService {
    Dotenv dotenv = Dotenv.load();
    private final String B2_APP_KEY_ID = dotenv.get("B2_APP_KEY_ID");
    private final String B2_APP_KEY = dotenv.get("B2_APP_KEY");
    private final String USER_AGENT = "AutodidackBackend/0.5+Java/17.0.7";
    private final String AUTODIDACK_BUCKET_ID = dotenv.get("AUTODIDACK_BUCKET_ID");

    // Instantiate backend client to make requests to B2 cloud storage
    B2StorageClient client  = B2StorageClientFactory.createDefaultFactory()
            .create(B2_APP_KEY_ID, B2_APP_KEY, USER_AGENT);

    public String getOnePhoto(String photoID) throws B2Exception {
        return client.getDownloadByIdUrl(photoID);
    }

    public List<String> getAllPhotosInFolder(String folderName) throws B2Exception {
        List<String> photoURLs = new ArrayList<>();

        B2ListFileVersionsRequest request = B2ListFileVersionsRequest
                .builder(AUTODIDACK_BUCKET_ID)
                .setWithinFolder(folderName + "/")
                .build();

        for (B2FileVersion file : client.fileVersions(request)) {
            String photoURL = getOnePhoto(file.getFileId());
            photoURLs.add(photoURL);
        }

        return photoURLs;
    }
}
