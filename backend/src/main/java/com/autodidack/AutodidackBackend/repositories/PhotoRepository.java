package com.autodidack.AutodidackBackend.repositories;

import com.autodidack.AutodidackBackend.models.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Integer> {

//    public Photo findPhotoByID(Integer photoID);
//
//    public ArrayList<Photo> findPhotoFolderByID(Integer folderID);
}
