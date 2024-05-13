import { Component } from '@angular/core';
import {SettingsService} from "./core/services/settings.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
    currentCompanyName: string = '';

    constructor(private settingsService: SettingsService) {
        this.loadCompanyName();
    }

    private loadCompanyName() {
        this.settingsService.getCurrentCompanyName().subscribe(companyName => {
            console.log("Received company name:", companyName);
            this.currentCompanyName = companyName;
        });
    }
}
