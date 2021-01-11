import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


type formTypeT =  'reset' | 'log-in' | 'sign-up';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {
  serverMessage= ''
  isLoading = false;
  
  signUpForm: FormGroup;
  resetForm: FormGroup;
  logInForm: FormGroup;

  formType: formTypeT = 'sign-up';


  constructor(
    private auth: AngularFireAuth,
    private formBuilder: FormBuilder
    ) { }
    
    ngOnInit(): void {
      this.signUpForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        passwordConfirmation: ['', [Validators.required,Validators.minLength(3)]],
      })

      this.logInForm = this.formBuilder.group({
        email:['', [Validators.email,Validators.required]],
        password: ['', [Validators.required]],
      })

      this.resetForm = this.formBuilder.group({
        email:['',[Validators.email,Validators.required]],
      })
    }
    
  async onFormSubmit(){
    this.isLoading= false 
  

    const logInEmail = this.logInEmail?.value
    const logInPassword = this.logInPassword?.value

  
    const signUpEmail = this.signUpEmail?.value
    const signUpPassword = this.signUpPassword?.value 
    const _signUpPasswordConfirmation = this.signUpPasswordConfirmation?.value 

    const resetEmail = this.resetEmail?.value

    
    this.isLoading = true;
 
    try {

      (this.isLogInFormType) && (await this.auth.signInWithEmailAndPassword( logInEmail, logInPassword));

      (this.isSignUpFormType) && (await this.auth.createUserWithEmailAndPassword(signUpEmail,signUpPassword));

      (this.isResetFormType) && ((await this.auth.sendPasswordResetEmail(resetEmail)),(this.serverMessage="Check Your Email To Reset Credentials"));
   
    } catch(error){this.serverMessage=error}
  
    this.isLoading = false
     
  }
  
  changeFormType(newFormType: formTypeT){
    this.formType = newFormType
  }

  get isLogInFormType(){
    return this.formType === 'log-in'
  }

  get isSignUpFormType(){
    return this.formType === 'sign-up'
  }

  get isResetFormType(){
    return this.formType === 'reset'
  }

  get signUpEmail(){
    return this.signUpForm.get('email')
  }

  get logInEmail(){
    return this.logInForm.get('email')
  }

  get resetEmail(){
    return this.resetForm.get('email')
  }

  get signUpPassword(){
    return this.signUpForm.get('password')
  }

  get signUpPasswordConfirmation(){
    return this.signUpForm.get('passwordConfirmation')
  }

  get logInPassword(){
    return this.logInForm.get('password')
  }


  /** Gurantees the pwd & confirmPwd matches */
  get passwordMatches(){
    if (this.formType === 'sign-up') {
      return true
    } else {
      return this.signUpPassword?.value === this.signUpPasswordConfirmation?.value
    }
  }



  
}
