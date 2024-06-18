import { Component, Inject, OnInit, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { HttpService } from '../http.service';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PersonalInfo } from '../personal-info';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  personalInfoList!: Observable<PersonalInfo[]>;
  personalInfoList2!: any;
  addMessage! :string;
  @Input({required : true}) newPersonalInfo2!:PersonalInfo;
  newPersonalInfo: PersonalInfo = {
    personId: 0,
    name: '',
    dob: '',
    techStack: '',
  };
  httpService = inject(HttpService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation =
      this.housingService.getHousingLocationById(housingLocationId);
  }
  // ngOnInit(): void {
  //   this.httpService.getAllPersonalInfo2().subscribe(
  //     (response) => {
  //       this.personalInfoList2 = response;
  //     },
  //     (error) => {
  //       console.error();
  //     }
  //   );
  // }

  getAllPersonalInfos(): void {
    this.personalInfoList = this.httpService.getAllPersonalInfo();
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
  addPersonalInfo(): void {
    this.httpService.addPersonalInfo(this.newPersonalInfo).subscribe(
      (data :string) => {
        this.getAllPersonalInfos();
        this.newPersonalInfo = {
          personId: 0,
          name: '',
          dob: '',
          techStack: '',
        };
       this.addMessage=data;
      },

      (error) => {
        console.error('Error adding personalInfos ', error);
      }
    );
  }

  isValid(info: PersonalInfo): boolean {
    return (
      info.personId !== 0 &&
      info.name.trim() !== '' &&
      info.dob.trim() !== '' &&
      info.techStack.trim() !== ''
    );
  }
}
