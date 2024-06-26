import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {MenuController, ModalController} from "@ionic/angular";
import {filter, Subscription} from "rxjs";
import { SettingsService } from 'src/app/core/services/settings.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
    @Input() companyName: string = '';
    showFooter = true;
    isModalOpen = false;
    private subscription: Subscription | undefined;
    @Output() photoSelected = new EventEmitter<string>();
    @Output() photoFromFooter = new EventEmitter<string>();

    constructor(
        private router: Router,
        private menu: MenuController,
        private userService: UserService,
        public modalController: ModalController,
        private settingsService: SettingsService
    ) {
        this.subscribeToRouterEvents();
    }

    ngOnInit() {
        this.subscribeToRouterEvents();
    }

    onPhotoSelected(photoData: string) {
        this.photoSelected.emit(photoData);
        this.photoFromFooter.emit(photoData);
    }

    private subscribeToRouterEvents(): void {
        this.subscription = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.showFooter = !event.urlAfterRedirects.startsWith('/auth');
            }
        });
    }

    onSelectionChange(selectedValue: string) {
        this.router.navigate([selectedValue]);
    }

    openEndMenu() {
        this.menu.open('end');
    }

    logout(){
      this.userService.purgeAuth();
      this.router.navigateByUrl('/auth');
      this.menu.close();
      this.settingsService.setCurrentCompanyName('');
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
