import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './shared/validations/validations';
import { NoSPace } from './noSPaceVali';
import { AsyncEmailValidator } from './shared/validations/emailValidator';
import { Icountry } from './shared/countryInter';
import { COUNTRIES_META_DATA } from './shared/const/countryData';
import { EMpIDValidator } from './shared/validations/empId';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  userForm! : FormGroup;
  genders : Array<string> = ['Male','Female','Others'];
  countrInfoData! : Array<Icountry>;

  ngOnInit(): void {

    this.countrInfoData = COUNTRIES_META_DATA;
    this.createUserForm();
    this.currentAddressValidation();
    this.patchPerAdd();
    this.passwordCheck();
    this.enablePass()
  }
  title = 'reactiveformtest';

  createUserForm(){
    this.userForm = new FormGroup({
      userDetails : new FormGroup({
        userName : new FormControl(null,
          [Validators.required,Validators.pattern(CustomRegex.onlyText),
          Validators.minLength(4),Validators.maxLength(8),NoSPace.noSPaceValidator]),
  
          email : new FormControl(null,
            [Validators.required,Validators.pattern(CustomRegex.email)],
            [AsyncEmailValidator.isEMailValid])
      }),
      empId : new FormControl(null,[EMpIDValidator.isEmpValid]),
      gender : new FormControl(null),

      skills : new FormArray([new FormControl(null)]),
      currentAddress : new FormGroup({
        country : new FormControl(null,[Validators.required]),
        state : new FormControl(null, [Validators.required]),
        city : new FormControl(null, [Validators.required]),
        zipcode : new FormControl(null, [Validators.required])
      }),
      permanentAddress  : new FormGroup({
        country : new FormControl(null,[Validators.required]),
        state : new FormControl(null, [Validators.required]),
        city : new FormControl(null, [Validators.required]),
        zipcode : new FormControl(null, [Validators.required])
      }),
      isAddSame : new FormControl({value : null, disabled : true}),
      password : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.password)]),
      confirmpassword : new FormControl({value:null,disabled:true},
        [Validators.required,Validators.pattern(CustomRegex.password)])
    })
  }

  onFormSubmit(){
    console.log(this.userForm)
    console.log(this.userForm.value)
    alert('Data added!')
    this.userForm.reset()
  }

  //get username control
  get getuserName(){
    return this.userForm.controls['userName'] as FormControl
  }

  //user Controls

  get f(){
    return this.userForm.controls
  }

  //skillsArray

  get skillsFOrmArr(){
    return this.userForm.get('skills') as FormArray
  }

  //skills add and delete

  addSkills(){
    if(this.skillsFOrmArr.length<5){
      let skillControl = new FormControl(null);
      this.skillsFOrmArr.push(skillControl)
    }
  }
  onRemove(i:number){
    this.skillsFOrmArr.removeAt(i)
  }
  
  //address Validation

  currentAddressValidation(){
    this.f['currentAddress'].valueChanges
    .subscribe((res) => {
      console.log(res);

      if(this.f['currentAddress'].valid){
        this.f['isAddSame'].enable()
      }
      else{
        this.f['isAddSame'].disable()
        this.f['isAddSame'].patchValue(false)
      }
    })
  }

  patchPerAdd(){
    this.f['isAddSame'].valueChanges
    .subscribe((res) => {
      console.log(res);
      if(res){
        this.f['permanentAddress'].patchValue(this.f['currentAddress'].value)
        this.f['permanentAddress'].disable()
      }
      else{
        this.f['permanentAddress'].enable()
        this.f['permanentAddress'].reset()
      }
    })
  }

  enablePass(){
    this.f['password'].valueChanges
    .subscribe((res) => {
      // console.log(res);
      if(this.f['password'].valid){
        this.f['confirmpassword'].enable()
      }
      else{
        this.f['confirmpassword'].disable()
      }
    })
  }

  passwordCheck(){
    this.f['confirmpassword'].valueChanges
    .subscribe((res) => {
      // console.log(res);
      if(res !== this.f['password'].value){
        this.f['confirmpassword'].setErrors({'passwordCheckErr' : 'Password and Confirm Password Must Match!'})
      }
    })
  }
}
