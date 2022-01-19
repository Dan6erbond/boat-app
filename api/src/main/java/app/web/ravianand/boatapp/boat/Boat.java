package app.web.ravianand.boatapp.boat;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "boats")
@Data
@NoArgsConstructor
public class Boat {

  @Id
  @GeneratedValue
  private Long id;

  @NotBlank(message = "Name is mandatory")
  private String name;

  @Column(columnDefinition = "TEXT")
  @NotBlank(message = "Description is mandatory")
  @Size(min = 10, message = "Description must be at least 10 characters long")
  private String description;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  private Date created;

  @UpdateTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  private Date updated;

  public Boat(String name, String description) {
    this.name = name;
    this.description = description;
  }

}
