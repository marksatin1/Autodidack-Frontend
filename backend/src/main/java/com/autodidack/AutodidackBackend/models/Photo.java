package com.autodidack.AutodidackBackend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "photos")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer photoID;

    @Column(nullable = false)
    private String storageURL;

//    private String name;
//
//    @Column(nullable = false)
//    @Enumerated(EnumType.STRING)
//    private PhotoFormat format;
//
//    @Column(nullable = false)
//    private Integer pixelWidth;
//
//    @Column(nullable = false)
//    private Integer pixelHeight;
}
