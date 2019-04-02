import { Injectable ,EventEmitter  } from '@angular/core';
import { Subscription  } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeAddEmpFunction = new EventEmitter();    
  subsVar: Subscription;   

  constructor() { }

  onChangeEmpEdit(id) {    
    this.invokeAddEmpFunction.emit(id);    
  } 

}
