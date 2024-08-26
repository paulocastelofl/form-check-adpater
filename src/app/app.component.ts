import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  group_forms: any[] = [
    {
      name: 'Group 1',
      checkName: 'checkGroup01',
      group_children: ['Group 2'],
      inputs: [
        {
          name: 'input01',
          validator: [Validators.required]
        },
        {
          name: 'input02',
          validator: [Validators.required]
        }
      ]
    },
    {
      name: 'Group 2',
      checkName: 'checkGroup02',
      group_children: ['Group 3'],
      inputs: [
        {
          name: 'input03',
          validator: [Validators.required]
        },
        {
          name: 'input04',
          validator: [Validators.required]
        }
      ]
    },
    {
      name: 'Group 3',
      checkName: 'checkGroup03',
      group_children: [],
      inputs: [
        {
          name: 'input05',
          validator: [Validators.required]
        },
        {
          name: 'input06',
          validator: [Validators.required]
        }
      ]
    }
  ]

  public form: FormGroup = new FormGroup({});
  /**
   *
   */
  constructor(private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      checkGroup01: [{ value: false, disabled: false }],
      input01: [{ value: null, disabled: false }],
      input02: [{ value: null, disabled: false }],

      checkGroup02: [{ value: false, disabled: false }],
      input03: [{ value: null, disabled: false }],
      input04: [{ value: null, disabled: false }],

      checkGroup03: [{ value: false, disabled: false }],
      input05: [{ value: null, disabled: false }],
      input06: [{ value: null, disabled: false }],
    });

  }


  checkValue(groupName: string, event?: any) {
    let ischecked: boolean =  'boolean' === typeof event.currentTarget.checked ? event : event.currentTarget.checked;
    
    this.group_forms.filter((x) => x.name === groupName).forEach((group) => {

      this.form.controls[group.checkName].setValue(event.currentTarget.checked);

      if(group.group_children.length > 0) group.group_children.forEach((childGroupName: string) => this.checkValue(childGroupName, ischecked));
      
      group.inputs.forEach((input: any) => {
        if (event.currentTarget.checked) {
          this.form.controls[input.name].setValidators(input.validator);
          this.form.controls[input.name].updateValueAndValidity();

        } else {
          this.form.controls[input.name].setValue(null);
          this.form.controls[input.name].clearValidators();
          this.form.controls[input.name].updateValueAndValidity();
        }
      });
    })
  }

  onSubmit(){
   console.log(this.form)
    if(this.form.valid){
      alert("Form submitted successfully!");
    }else{
      alert("Form is not valid!");
    }
  }


}
